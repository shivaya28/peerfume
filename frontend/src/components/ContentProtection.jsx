import { useEffect } from 'react';

const ContentProtection = () => {
  useEffect(() => {
    // Only run in production
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return; // Don't run in development
    }

    // Disable right click
    const handleContextMenu = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable text selection
    const handleSelectStart = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable copy
    const handleCopy = (e) => {
      e.preventDefault();
      return false;
    };

    // Disable keyboard shortcuts
    const handleKeyDown = (e) => {
      // F12
      if (e.keyCode === 123) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+I
      if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+C
      if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+Shift+J
      if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+U
      if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+S
      if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
      }
      
      // Ctrl+C
      if (e.ctrlKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
      }
    };

    // Add event listeners
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
};

export default ContentProtection;
