const options = {
  feed: ['left', 'right', 'both'],
  diaper: ['pee', 'poop', 'both'],
};

export function ActionCard({ 
  isOpen, 
  type, 
  description, 
  onClick 
}: { 
  isOpen: boolean; 
  type: string; 
  description: string; 
  onClick: (detail: string) => void 
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
            {options[type as keyof typeof options].map((option) => (
              <button
                key={option}
                className={`
                  py-2 rounded-xl bg-neutral-800 text-sm active:scale-95 transition`}
                onClick={() => onClick(option)}
              >
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}