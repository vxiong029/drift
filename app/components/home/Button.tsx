export default function Button({
  label,
  onClickHandle,
  isOpen,
  isActive,
  disabled,
}: {
  label: string;
  onClickHandle: () => void;
  isOpen: boolean;
  isActive?: boolean;
  disabled?: boolean;
}) {

  return (
    <button
      onClick={onClickHandle}
      disabled={disabled}
      className={`
        w-full flex items-center justify-between
    px-4 py-4
    text-left
    active:scale-[0.98] transition

        ${isActive ? "bg-green-600 text-white animate-pulse" : "bg-neutral-800 text-white"}
        ${disabled ? "opacity-40" : "hover:bg-neutral-700"}
      `}
    >
      <span className="text-base font-medium">
        {label}
      </span>

      {label !== '😴 Sleep' && (
        <span className="text-neutral-500 text-sm">
          {isOpen ? "−" : "+"}
        </span>
      )}
    </button>
  );
}