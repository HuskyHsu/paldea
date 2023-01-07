import clsx from 'clsx';

type Props = {
  title: string;
  icon: JSX.Element;
  iconColor: string;
  children?: JSX.Element;
};

export function PageHeader({ title, icon, iconColor, children }: Props) {
  return (
    <div
      className={clsx(
        'flex w-full flex-col items-center justify-between md:flex-row',
        'gap-4 px-4'
      )}
    >
      <div className="flex w-full items-start gap-2 md:items-center">
        <div className={clsx('rounded-xl p-2', iconColor, 'hidden md:block')}>{icon}</div>
        <h2 className="text-2xl">{title}</h2>
      </div>
      {children && <div className="w-full md:w-96">{children}</div>}
    </div>
  );
}
