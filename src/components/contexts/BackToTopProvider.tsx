import { createContext, useContext, useState, useRef } from 'react';
import clsx from 'clsx';
import { Icon } from '..';

interface BackToTopContextType {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  ref: React.RefObject<HTMLDivElement>;
  toggleVisibility: () => void;
}

export const BackToTopContext = createContext<BackToTopContextType>(null!);
export const useBackToTopContext = () => useContext(BackToTopContext);

type Props = {
  children: React.ReactNode;
};

export const BackToTopProvider = ({ children }: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const scrollToTop = () => {
    if (!ref.current) return;
    ref.current.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const toggleVisibility = () => {
    if (ref.current === null) return;
    if (ref.current.scrollTop > 200) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  return (
    <BackToTopContext.Provider value={{ isVisible, setIsVisible, ref, toggleVisibility }}>
      {children}
      <button
        type="button"
        className={clsx('fixed bottom-8 right-8', !isVisible && 'pointer-events-none opacity-0')}
        onClick={scrollToTop}
      >
        <Icon.BackToTop />
      </button>
    </BackToTopContext.Provider>
  );
};
