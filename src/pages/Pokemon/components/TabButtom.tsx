import clsx from 'clsx';

export function TabButtom({
  title,
  selectTab,
  setTab,
}: {
  title: string;
  selectTab: string;
  setTab: (title: string) => void;
}) {
  return (
    <li className="mr-2">
      <button
        className={clsx(
          'inline-block rounded-t-lg border-b-2 p-2',
          selectTab === title
            ? 'border-custom-gold text-custom-gold'
            : 'border-transparent hover:border-gray-300 hover:text-gray-600'
        )}
        onClick={() => setTab(title)}
      >
        {title}
      </button>
    </li>
  );
}
