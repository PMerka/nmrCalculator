import styles from "./InputSection.module.css";

interface InputSectionProps {
  labelText: string;
  value: number;
  unit?: string;
  onChange: (value: number) => void;
}

const InputSection = ({
  labelText,
  value,
  unit,
  onChange,
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
        />
        <span className={styles.unitText}>{unit}</span>
      </label>
    </div>
  );
};

export default InputSection;
