import React, { useMemo } from 'react';
import classNames from 'classnames';
import styles from './DatePicker.module.scss';

const DatePickerEntry = ({
  label,
  type = 'radio',
  value, 
  description,
  active,
  name,
  selected,
  disabled,
  ...props
}) => {
  const id = useMemo(() => `input-${name}-${Math.floor( Math.random() * 100000 )}`, [name] );

  return <div className={classNames(styles.datePickerEntryContainer, { 
    [styles.active]: active,
    [styles.selected]: selected ,
    [styles.disabled]: disabled
  })} {...props}>
    <label className={styles.datePickerEntry} htmlFor={id}>
      <span className={styles.datePickerEntryTitle}>{label}</span>
      <span className={styles.datePickerEntryDescription}>{description}</span>
    </label>
  </div>;
};
 
export default DatePickerEntry;