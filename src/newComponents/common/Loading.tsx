import './Loading.css';

export function Loading() {
  return (
    <div className="flex h-[50vh] w-full items-center justify-center">
      <div className="wobbling relative" />
    </div>
  );
}
