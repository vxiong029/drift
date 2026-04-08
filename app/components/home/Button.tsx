"use client";

export default function Button({
  label,
  onClickHandle,
  isActive,
  disabled,
}: {
  label: string;
  onClickHandle: () => void;
  isActive?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClickHandle}
      disabled={disabled}
      className={`
        p-4 rounded-2xl transition
        active:scale-95

        ${isActive ? "bg-green-600 text-white animate-pulse" : "bg-neutral-800 text-white"}
        ${disabled ? "opacity-40" : "hover:bg-neutral-700"}
      `}
    >
      {label}
    </button>
  );
}