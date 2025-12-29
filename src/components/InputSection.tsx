import type { ReactNode } from "react";
import styles from "./InputSection.module.css";

interface InputSectionProps {
  labelText: ReactNode;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const InputSection = ({
  labelText,
  value,
  unit,
  onChange,
  inputProps,
}: InputSectionProps) => {
  return (
    <div>
      <label className={styles.label}>
        <span className={styles.labelText}>{labelText}</span>
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(+e.target.value)}
          className={styles.valueInput}
          {...inputProps}
        />
        <span className={styles.unitText}>{unit}</span>
      </label>
    </div>
  );
};

export default InputSection;
