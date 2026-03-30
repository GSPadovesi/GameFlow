import { ToggleSwitchProps } from './ToggleSwitch.types'
import clsx from 'clsx'
import styles from './ToggleSwitch.module.scss'


export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  checked,
  onChange,
  label,
  disabled,
  className
}) => {
  return (
    <div className={styles.toggleSwitch}>
      <div className={clsx(
        styles.switch,
        checked && styles.switchActive,
        disabled && styles.disabled,
        className && className
      )}
        onClick={() => onChange(!checked)}
      >
        <span className={clsx(
          styles.switchSpan,
          checked && styles.switchSpanActive
        )} />
      </div>
      {label ? <label id={`${id}-label`} className={styles.label}>{label}</label> : null}
    </div>
  )
}
