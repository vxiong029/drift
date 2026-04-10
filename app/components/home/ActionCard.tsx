export function ActionCard({ 
  isOpen, 
  options, 
  description, 
  onClick 
}: { 
  isOpen: boolean; 
  options: {label: string; value: string}[]; 
  description: string; 
  onClick: (value: string) => void 
}) {
  return (
    <div
      className={`
      grid transition-all duration-300 ease-in-out 
      ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
    `}
    >
      <div className="overflow-hidden">
        <div className="px-4 pb-4 pt-1">
          <p className="text-xs text-neutral-500 mb-2">
            {description}
          </p>

          <div className="grid grid-cols-3 gap-2">
            {options.map((option) => (
              <button
                key={option.value}
                className={`
                  py-2 rounded-xl bg-neutral-800 text-sm active:scale-95 transition`}
                onClick={() => onClick(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}