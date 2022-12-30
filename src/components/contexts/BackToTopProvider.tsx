import { createContext, useContext, useState, useRef, PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Icon } from '..';

interface BackToTopContextType {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
  toggleVisibility: () => void;
}

const BackToTopContext = createContext<BackToTopContextType>({
  isVisible: false,
  setIsVisible: () => {},
  ref: { current: null },
  toggleVisibility: () => {},
});

export const BackToTopProvider = ({ children }: PropsWithChildren) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (!ref.current) return;
    ref.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  function toggleVisibility() {
    if (!ref.current) return;
    if (ref.current.scrollTop > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }

  const isMobile = window.screen.width < 768;

  return (
    <BackToTopContext.Provider value={{ isVisible, setIsVisible, ref, toggleVisibility }}>
      {children}
      <button
        type="button"
        className={clsx('fixed bottom-8 right-8', !isVisible && 'pointer-events-none opacity-0')}
        onClick={scrollToTop}
      >
        <Icon.BackToTop className={clsx(isMobile ? 'h-12 w-12' : 'h-16 w-16')} />
      </button>
    </BackToTopContext.Provider>
  );
};
export const useBackToTopContext = () => useContext(BackToTopContext);
