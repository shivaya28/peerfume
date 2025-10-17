import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import LocomotiveScroll from 'locomotive-scroll';

const LocomotiveScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);
  const locomotiveScrollRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!scrollRef.current) return;

    // Initialize Locomotive Scroll
    locomotiveScrollRef.current = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.08,
      class: 'is-inview',
      smartphone: {
        smooth: true,
        multiplier: 1.5
      },
      tablet: {
        smooth: true,
        multiplier: 1.2
      },
      reloadOnContextChange: true,
      touchMultiplier: 2
    });

    // Update on window resize
    const handleResize = () => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.update();
      }
    };

    window.addEventListener('resize', handleResize);

    // Force update after a short delay to ensure content is rendered
    const updateTimeout = setTimeout(() => {
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.update();
      }
    }, 100);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(updateTimeout);
      if (locomotiveScrollRef.current) {
        locomotiveScrollRef.current.destroy();
      }
    };
  }, []);

  // Scroll to top and update on route change
  useEffect(() => {
    if (locomotiveScrollRef.current) {
      // Scroll to top instantly
      locomotiveScrollRef.current.scrollTo('top', {
        duration: 0,
        disableLerp: true
      });

      // Update scroll after route change to recalculate content height
      setTimeout(() => {
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.update();
        }
      }, 100);

      // Additional update after images/content load
      setTimeout(() => {
        if (locomotiveScrollRef.current) {
          locomotiveScrollRef.current.update();
        }
      }, 500);
    }
  }, [location.pathname]);

  // Update when children change (content loads)
  useEffect(() => {
    if (locomotiveScrollRef.current) {
      setTimeout(() => {
        locomotiveScrollRef.current.update();
      }, 100);
    }
  }, [children]);

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  );
};

export default LocomotiveScrollWrapper;
