import clsx from 'clsx';
import { Outlet } from 'react-router-dom';
import { Menu } from '.';
import { Icon } from '../../components';

function Main() {
  return (
    <div className="flex flex-col md:flex-row">
      <aside
        className={clsx(
          'flex flex-col w-screen md:w-72 md:h-screen md:p-4 space-y-2',
          'border-gray-200'
        )}
      >
        <div
          className={clsx(
            'flex md:flex-col md:p-4 md:space-y-4 justify-around',
            'md:rounded-xl',
            'bg-primary text-white'
          )}
        >
          <Menu.Item text={'圖鑑清單'} color="bg-custom-red" selected={true}>
            <Icon.Books />
          </Menu.Item>
          <Menu.Item text={'地圖'} color="bg-custom-blue">
            <Icon.Compass />
          </Menu.Item>
          <Menu.Item text={'招式清單'} color="bg-custom-green">
            <Icon.Book />
          </Menu.Item>
          <Menu.Item text={'道具清單'} color="bg-custom-orange">
            <Icon.Bag />
          </Menu.Item>
        </div>
      </aside>
      <div className="w-full md:p-4 max-h-screen overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
}

export default Main;
