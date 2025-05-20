
import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface StatusToggleProps {
  initialChecked?: boolean;
  onChange?: (isChecked: boolean) => void;
}

const StatusToggle: React.FC<StatusToggleProps> = ({ initialChecked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    if (onChange) {
      onChange(newCheckedState);
    }
  };

  return (
    <div className="relative inline-block">
      <label className="flex items-center cursor-pointer">
        <input type="checkbox" className="hidden peer" checked={isChecked} onChange={handleChange} />
        <div
          className={cn(
            "w-10 h-5 bg-neutral-200 rounded-full transition-colors",
            "peer-checked:bg-primary-500"
          )}
        ></div>
        <div
          className={cn(
            "absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition transform",
            "peer-checked:translate-x-5"
          )}
        ></div>
      </label>
    </div>
  );
};

export default StatusToggle;
