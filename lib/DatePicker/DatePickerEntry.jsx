import React from 'react';
import classNames from 'classnames';
import styles from './DatePicker.module.scss';

export default function DatePickerEntry ({
  label,
  type = 'radio',
  value, 
  description,
  active,
  name,
  selected,
  disabled,
  ...props
}) {

  return <button className={classNames(styles.datePickerEntryContainer, { 
    [styles.active]: active,
    [styles.selected]: selected ,
    [styles.disabled]: disabled
  })} {...props}>
    <label className={styles.datePickerEntry}>
      <span className={styles.datePickerEntryTitle}>{label}</span>
      <span className={styles.datePickerEntryDescription}>{description}</span>
    </label>
  </button>;
}
