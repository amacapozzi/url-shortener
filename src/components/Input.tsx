import React from "react";

interface Props {
  value: string;
  isEnabled: boolean;
  onChange: (value: string) => void;
}

export const Input: React.FC<Props> = ({ value, onChange, isEnabled }) => {
  return (
    <input
      disabled={isEnabled}
      className="rounded-md text-neutral-300 text-sm px-3 py-1.5 w-[300px] bg-transparent border border-neutral-600/50"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
    />
  );
};
