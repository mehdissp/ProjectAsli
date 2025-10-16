import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/auth';
import useApi from './useApi';

export const useMenu = () => {
  const [menus, setMenus] = useState([]);
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState(new Set());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // دریافت منوها از سرور
  const fetchMenus = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const menuData = await authService.getMenus();
      
      // تبدیل ساختار منو به فرمت قابل استفاده
      const formattedMenus = formatMenus(menuData);
      setMenus(formattedMenus);
      
      // ست کردن منوی فعال اولیه
      if (formattedMenus.length > 0 && !activeMenu) {
        setActiveMenu(formattedMenus[0].id);
      }
      
      return formattedMenus;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Failed to load menus';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [activeMenu]);

  // فرمت کردن منوها
  const formatMenus = (menuData) => {
    if (!menuData || !Array.isArray(menuData)) return [];

    return menuData.map(menu => ({
      id: menu.id || Math.random().toString(36).substr(2, 9),
      title: menu.title || 'Untitled',
      path: menu.path || '#',
      icon: menu.icon || '📄',
      permissions: menu.permissions || [],
      children: menu.children ? formatMenus(menu.children) : [],
      isActive: menu.isActive !== false,
      order: menu.order || 0
    })).sort((a, b) => a.order - b.order);
  };

  // تغییر منوی فعال
  const setActive = useCallback((menuId) => {
    setActiveMenu(menuId);
    
    // اضافه کردن منوهای والد به expandedMenus
    const findParentMenus = (menus, targetId, parents = new Set()) => {
      for (const menu of menus) {
        if (menu.id === targetId) {
          return parents;
        }
        if (menu.children && menu.children.length > 0) {
          const newParents = new Set([...parents, menu.id]);
          const result = findParentMenus(menu.children, targetId, newParents);
          if (result) return result;
        }
      }
      return null;
    };

    const parentMenus = findParentMenus(menus, menuId);
    if (parentMenus) {
      setExpandedMenus(prev => new Set([...prev, ...parentMenus]));
    }
  }, [menus]);

  // toggle کردن منوهای expandable
  const toggleMenu = useCallback((menuId) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  }, []);

  // بررسی اینکه آیا منویی expand شده است
  const isMenuExpanded = useCallback((menuId) => {
    return expandedMenus.has(menuId);
  }, [expandedMenus]);

  // پیدا کردن منو بر اساس مسیر
  const findMenuByPath = useCallback((path) => {
    const findInMenus = (menus, targetPath) => {
      for (const menu of menus) {
        if (menu.path === targetPath) {
          return menu;
        }
        if (menu.children && menu.children.length > 0) {
          const found = findInMenus(menu.children, targetPath);
          if (found) return found;
        }
      }
      return null;
    };

    return findInMenus(menus, path);
  }, [menus]);

  // فیلتر منوها بر اساس پرمیشن
  const filterMenusByPermission = useCallback((userPermissions = []) => {
    const hasPermission = (menuPermissions) => {
      if (!menuPermissions || menuPermissions.length === 0) return true;
      return menuPermissions.some(permission => 
        userPermissions.includes(permission)
      );
    };

    const filterMenus = (menuList) => {
      return menuList
        .filter(menu => menu.isActive && hasPermission(menu.permissions))
        .map(menu => ({
          ...menu,
          children: menu.children ? filterMenus(menu.children) : []
        }))
        .filter(menu => menu.children.length > 0 || menu.path !== '#');
    };

    return filterMenus(menus);
  }, [menus]);

  // باز کردن تمام منوهای والد یک منو
  const expandParentMenus = useCallback((menuId) => {
    const findAndExpandParents = (menus, targetId, parents = []) => {
      for (const menu of menus) {
        if (menu.id === targetId) {
          setExpandedMenus(prev => new Set([...prev, ...parents]));
          return true;
        }
        if (menu.children && menu.children.length > 0) {
          const found = findAndExpandParents(menu.children, targetId, [...parents, menu.id]);
          if (found) return true;
        }
      }
      return false;
    };

    findAndExpandParents(menus, menuId);
  }, [menus]);

  // استفاده از هوک API برای مدیریت درخواست
  const { callApi: refetchMenus, loading: apiLoading } = useApi(fetchMenus, false);

  useEffect(() => {
    fetchMenus();
  }, []);

  return {
    menus,
    activeMenu,
    expandedMenus,
    loading: loading || apiLoading,
    error,
    
    // actions
    setActive,
    toggleMenu,
    isMenuExpanded,
    findMenuByPath,
    filterMenusByPermission,
    expandParentMenus,
    refetchMenus,
    fetchMenus
  };
};

export default useMenu;