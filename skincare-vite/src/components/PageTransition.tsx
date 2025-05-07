import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === 'fadeOut') {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('fadeIn');
      }, 300); // This should match the duration of your animation
      
      return () => clearTimeout(timer);
    }
  }, [transitionStage, location]);

  return (
    <div
      className={`page-transition ${transitionStage}`}
      style={{
        opacity: transitionStage === 'fadeIn' ? 1 : 0,
        transform: transitionStage === 'fadeIn' ? 'translateY(0)' : 'translateY(-5px)',
        transition: 'opacity 300ms, transform 300ms',
      }}
    >
      {children}
    </div>
  );
} 