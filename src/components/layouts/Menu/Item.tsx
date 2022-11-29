import clsx from "clsx";

interface Props {
  text: string;
  color: string;
  children: JSX.Element;
  selected?: boolean;
}

export function Item({ text, color, children, selected = false }: Props) {
  return (
    <button
      type="button"
      className={clsx(
        "flex flex-col md:flex-row gap-2 items-center",
        "h-full p-2 w-30 md:w-full md:rounded-xl",
        selected && "bg-secondary text-black"
      )}>
      <div className={clsx("p-2 rounded-xl", color)}>{children}</div>
      <span className="hidden md:block">{text}</span>
    </button>
  );
}
