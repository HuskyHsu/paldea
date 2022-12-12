import { Icon } from '..';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const scrollToTop = () => {
    console.log(window.pageYOffset)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
 
  useEffect(() => {
    const toggleVisibility = () => {
      window.pageYOffset > 300 ? setIsVisible(true) : setIsVisible(false);
    }

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  return (
    <button
      type="button"
      className={clsx('fixed bottom-8 right-8', isVisible && 'pointer-events-none opacity-0')}
      onClick={scrollToTop}
    >
      <Icon.BackToTop />
    </button>
  )
};