import clsx from 'clsx';

export function Hr() {
  return (
    <div className="relative w-full">
      <hr className="border-b-1 h-px w-full border-custom-gold" />
      <div
        className={clsx(
          'absolute right-0 top-1/2 -translate-y-1/2',
          'h-0 w-0',
          'border-t-[5px] border-r-[10px]',
          'border-b-[5px] border-t-transparent',
          'border-r-custom-gold border-b-transparent'
        )}
      />
      <div
        className={clsx(
          'absolute left-0 top-1/2 -translate-y-1/2',
          'h-0 w-0',
          'border-t-[5px] border-l-[10px]',
          'border-b-[5px] border-t-transparent',
          'border-l-custom-gold border-b-transparent'
        )}
      />
    </div>
  );
}
