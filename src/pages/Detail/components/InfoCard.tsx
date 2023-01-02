import clsx from 'clsx';

interface Prop {
  children: JSX.Element;
}

export function InfoCard({ children }: Prop) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <div
        className={clsx(
          'w-full max-w-2xl md:w-5/6 md:px-0',
          'ring-4 ring-custom-gold/60 ring-offset-2',
          'border-2 border-white',
          'rounded-lg shadow-md'
        )}
      >
        {children}
      </div>
    </div>
  );
}
