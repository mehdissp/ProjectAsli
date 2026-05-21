// src/hooks/useStories.js
import { useState, useEffect, useCallback } from 'react';

// دیتای نمونه (برای زمانی که API نداریم)
const mockStories = [
  {
    id: 1,
    name: 'آژانس املاک البرز',
    avatar: 'https://localhost:7178//uploads/properties/1/0b0fff66-d17e-4958-bb1c-ae38a9eb7272/390568_299-20260426-161906-1.webp',
    isViewed: false,
    isLive: false,
    stories: [
      {
        id: 101,
        type: 'image',
        url: 'https://localhost:7178//uploads/properties/1/0b0fff66-d17e-4958-bb1c-ae38a9eb7272/390568_299-20260426-161906-1.webp',
        caption: 'ملک جدید در منطقه سعادت آباد | ۲۰٪ تخفیف ویژه',
        timestamp: new Date().getTime(),
        link: '/properties/123',
        linkText: 'مشاهده جزئیات'
      },
      {
        id: 102,
        type: 'image',
        url: 'https://picsum.photos/id/106/400/700',
        caption: 'آپارتمان لوکس با امکانات کامل',
        timestamp: new Date().getTime() - 3600000,
      },
      {
        id: 103,
        type: 'video',
        url: 'https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4',
        caption: 'تور مجازی ملک',
        timestamp: new Date().getTime() - 7200000,
      }
    ]
  },
  {
    id: 2,
    name: 'مشاور املاک تهران نو',
    avatar: 'https://via.placeholder.com/80x80?text=A2',
    isViewed: false,
    isLive: true,
    stories: [
      {
        id: 201,
        type: 'image',
        url: 'https://picsum.photos/id/15/400/700',
        caption: 'پخش زنده: بازدید از ملک ۵۰۰ متری',
        timestamp: new Date().getTime(),
      }
    ]
  },
  {
    id: 3,
    name: 'خانه رویایی',
    avatar: 'https://via.placeholder.com/80x80?text=A3',
    isViewed: true,
    isLive: false,
    stories: [
      {
        id: 301,
        type: 'image',
        url: 'https://picsum.photos/id/20/400/700',
        caption: 'ویلای ساحلی با قیمت مناسب',
        timestamp: new Date().getTime() - 86400000,
      }
    ]
  },
  {
    id: 4,
    name: 'املاک غرب',
    avatar: 'https://via.placeholder.com/80x80?text=A4',
    isViewed: false,
    isLive: false,
    stories: [
      {
        id: 401,
        type: 'image',
        url: 'https://picsum.photos/id/22/400/700',
        caption: 'آپارتمان نوساز در پونک',
        timestamp: new Date().getTime() - 43200000,
      },
      {
        id: 402,
        type: 'image',
        url: 'https://picsum.photos/id/26/400/700',
        caption: 'بازار مسکن رونق گرفت',
        timestamp: new Date().getTime() - 43200000,
      }
    ]
  },
  {
    id: 5,
    name: 'املاک شرق',
    avatar: 'https://via.placeholder.com/80x80?text=A5',
    isViewed: false,
    isLive: false,
    stories: [
      {
        id: 501,
        type: 'image',
        url: 'https://picsum.photos/id/29/400/700',
        caption: 'خرید و فروش ملک در تهرانپارس',
        timestamp: new Date().getTime() - 21600000,
      }
    ]
  },
  {
    id: 6,
    name: 'آژانس VIP',
    avatar: 'https://via.placeholder.com/80x80?text=A6',
    isViewed: false,
    isLive: false,
    stories: [
      {
        id: 601,
        type: 'image',
        url: 'https://picsum.photos/id/32/400/700',
        caption: 'ملک‌های لاکچری شمال تهران',
        timestamp: new Date().getTime() - 10800000,
      }
    ]
  }
];

const useStories = (apiUrl = null) => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      if (apiUrl) {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setStories(data);
      } else {
        // استفاده از دیتای نمونه
        await new Promise(resolve => setTimeout(resolve, 500));
        setStories(mockStories);
      }
      setError(null);
    } catch (err) {
      console.error('خطا در دریافت استوری‌ها:', err);
      setError(err.message);
      setStories(mockStories);
    } finally {
      setLoading(false);
    }
  }, [apiUrl]);

  // مارک کردن استوری به عنوان دیده شده
  const markAsViewed = useCallback((storyId) => {
    setStories(prev => prev.map(story => 
      story.id === storyId ? { ...story, isViewed: true } : story
    ));
  }, []);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  return {
    stories,
    loading,
    error,
    markAsViewed,
    refetch: fetchStories
  };
};

export default useStories;