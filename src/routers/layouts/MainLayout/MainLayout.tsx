import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { Icon, useBackToTopContext } from '@/components';
import { Item } from './Item';
import { useEffect } from 'react';

function MainLayout() {
  const { ref, toggleVisibility } = useBackToTopContext();

  useEffect(() => {
    if (!ref.current) return;

    const current = ref.current;

    current.addEventListener('scroll', toggleVisibility);

    return () => {
      current.removeEventListener('scroll', toggleVisibility);
    };
  }, [ref, toggleVisibility]);

  return (
    <div className="flex h-screen max-h-screen flex-col md:max-h-full md:flex-row">
      <aside
        className={clsx(
          'flex w-screen flex-col space-y-2 md:h-screen md:w-64 md:p-4',
          'border-gray-200'
        )}
      >
        <div
          className={clsx(
            'flex justify-around md:flex-col md:space-y-2 md:p-4',
            'md:rounded-xl',
            'bg-primary text-sm text-white'
          )}
        >
          <Item text={'圖鑑清單'} color="bg-custom-red" selected={true}>
            <Icon.Books className="fill-current h-5 w-5" />
          </Item>
          <Item text={'地圖'} color="bg-custom-blue">
            <Icon.Compass className="fill-current h-5 w-5" />
          </Item>
          <Item text={'招式清單'} color="bg-custom-green">
            <Icon.Book className="fill-current h-5 w-5" />
          </Item>
          <Item text={'道具清單'} color="bg-custom-orange">
            <Icon.Bag className="fill-current h-5 w-5" />
          </Item>
        </div>
      </aside>
      <div className="h-full max-h-screen w-full overflow-y-auto md:p-4" ref={ref}>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayout;
