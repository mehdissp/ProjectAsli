// utils.js
export const createProfileLink = (name) => {
  if (!name) return '/profile';
  
  const cleanName = name
    .replace(/\s+/g, '-')
    .replace(/[^آ-یa-zA-Z0-9-]/g, '')
    .substring(0, 50);
  
  return `/profile/${cleanName || 'profile'}`;
};