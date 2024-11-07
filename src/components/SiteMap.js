import { useEffect } from 'react';

const SiteMap = () => {
  useEffect(() => {
    window.location.href = '/sitemap.xml';
  }, []);
  
  return null;
};

export default SiteMap;
