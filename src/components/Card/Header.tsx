import clsx from 'clsx';

type HeaderProps = {
  paldeaId: string;
  name: string;
  link: string;
};

export function Header({ paldeaId, name, link }: HeaderProps) {
  return (
    <header
      className={clsx(
        'flex flex-col-reverse items-center justify-center',
        'md:flex-row md:items-end md:justify-between',
        'min-h-[83px] md:min-h-[148px]',
        '-mb-8 px-3 md:px-4',
        'pointer-events-none'
      )}
    >
      <span className="hidden whitespace-nowrap leading-none md:block">{`#${paldeaId}`}</span>
      <img
        className="pointer-events-none h-auto w-auto"
        src={`${process.env.PUBLIC_URL}/image/icon/${link}.png`}
        alt={name}
        loading="lazy"
      />
    </header>
  );
}
