import clsx from 'clsx';

type Props = {
  checked: boolean;
  handleChange: (bool: boolean) => void;
  text: string;
};

export function Toggle({ text, checked, handleChange }: Props) {
  return (
    <div className="h-8 py-1">
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          type="checkbox"
          value=""
          className="peer sr-only"
          checked={checked}
          onChange={(e) => handleChange(e.target.checked)}
        />
        <div
          className={clsx(
            'peer h-6 w-11 rounded-full bg-gray-200',
            'after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full',
            "after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']",
            'peer-checked:bg-custom-gold peer-checked:after:translate-x-full peer-checked:after:border-white'
          )}
        />
        <span className="ml-3 text-sm">{text}</span>
      </label>
    </div>
  );
}
