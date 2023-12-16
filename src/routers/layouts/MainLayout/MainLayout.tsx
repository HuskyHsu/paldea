import { Suspense, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import ReactGA from 'react-ga4';

import { Icon } from '@/newComponents';
import { Loading } from '@/newComponents/common';
import { useBackToTopContext } from '@/newComponents/contexts';
import { Item } from './Item';
import { getJsonCache } from '@/store';

const localStorageKey = 'pokeDexPage';

function MainLayout() {
  const { ref, toggleVisibility } = useBackToTopContext();
  const location = useLocation();
  const navigate = useNavigate();

  let cacheObj = getJsonCache(localStorageKey);
  const navLink = Object.entries(cacheObj)
    .map(([key, val]) => `${key}=${val}`)
    .join('&');

  const hash = location.pathname.split('/')[1];

  const updateNav = (to: string) => {
    navigate(to);
  };

  useEffect(() => {
    if (!ref.current) return;

    const current = ref.current;

    current.addEventListener('scroll', toggleVisibility);

    return () => {
      current.removeEventListener('scroll', toggleVisibility);
    };
  }, [ref, toggleVisibility]);

  useEffect(() => {
    ReactGA.initialize('G-CCR1VSQL3X');
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
    if (location.search) {
      ReactGA.event({
        category: location.pathname,
        action: location.search,
      });
    }
  }, [location, navigate]);

  return (
    <div className="flex h-screen max-h-screen flex-col md:max-h-full md:flex-row">
      <aside className="flex w-screen flex-col space-y-2 md:h-screen md:w-64 md:p-4">
        <div
          className={clsx(
            'flex justify-around md:flex-col md:space-y-2 md:p-4',
            'md:rounded-xl',
            'bg-primary text-sm text-white'
          )}
        >
          <Item
            text={'圖鑑清單'}
            color="bg-custom-red"
            selected={['pokedex', ''].includes(hash)}
            onClick={() => updateNav(`/?${navLink}`)}
          >
            <Icon.Books className="h-5 w-5 fill-current" />
          </Item>
          <Item
            text={'招式清單'}
            color="bg-custom-blue"
            selected={hash === 'movedex'}
            onClick={() => updateNav('movedex')}
          >
            <Icon.Book className="h-5 w-5 fill-current" />
          </Item>
        </div>
      </aside>
      <div
        className="h-full max-h-screen w-full overflow-y-auto md:p-4"
        ref={ref}
        style={{
          scrollbarGutter: 'stable',
        }}
      >
        <div className="mx-auto min-h-full max-w-6xl rounded-xl bg-custom-lightgrey p-4 md:drop-shadow-xl">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
