'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { logoutAction } from '@/app/actions';

export default function SecurityEnforcer() {
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialMount = useRef(true);

  useEffect(() => {
    const performLogout = async () => {
      await logoutAction();
    };

    // 1. Enforce Logout on Refresh (Only on hard-reload of a protected page)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      
      if (pathname !== '/' && typeof window !== 'undefined' && window.performance) {
        const navigationEntries = window.performance.getEntriesByType('navigation');
        if (navigationEntries.length > 0) {
          const navEntry = navigationEntries[0] as PerformanceNavigationTiming;
          if (navEntry.type === 'reload') {
            performLogout();
            return;
          }
        } else if (window.performance.navigation && window.performance.navigation.type === 1) {
          performLogout();
          return;
        }
      }
    }

    // If we are on the login page, don't run the idle timer
    if (pathname === '/') return;

    // 2. Enforce 1-minute Idle Timeout
    const resetTimer = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        performLogout();
      }, 60000); // 1 minute
    };

    // Initialize timer
    resetTimer();

    // Listen for activity to reset the timer
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, resetTimer, true);
    });

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      events.forEach(event => {
        window.removeEventListener(event, resetTimer, true);
      });
    };
  }, [pathname]);

  return null;
}
