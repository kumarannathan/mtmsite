import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that scrolls the window to the top when the route changes
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  // When the pathname changes, scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render anything
  return null;
} 