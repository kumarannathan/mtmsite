import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Component that scrolls the window to the top when the route changes
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  // When the pathname changes, scroll to top
  useEffect(() => {
    // Use smooth scrolling for better UX
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  // This component doesn't render anything
  return null;
} 