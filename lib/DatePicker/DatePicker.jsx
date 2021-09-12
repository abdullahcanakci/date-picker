import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './DatePicker.module.scss';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  endOfWeek,
  startOfWeek,
  intlFormat,
  format,
  subMonths,
  addMonths,
  isToday,
  isSameDay,
  isBefore,
  isAfter
} from 'date-fns';
import DatePickerEntry from './DatePickerEntry';

export default function DatePicker ({ defaultValue = [], onChange, minDate, maxDate, maxSelections = 2 }) {
  const [activeMonth, setActiveMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState(defaultValue);

  const onSelect = (date) => {
    if (isDayDisabled(date)) return;
    if (
      selectedDates.filter(e => isSameDay(e, date)).length == 0 && 
      selectedDates.length < maxSelections
    ) {
      setSelectedDates(prevSelected => [...prevSelected, date]);
    } else {
      setSelectedDates(prevSelected => prevSelected.filter(e => !isSameDay(e, date)));
    }
  };
  useEffect(() => {
    if (onChange && typeof onChange == 'function') {
      onChange(selectedDates);
    }
  }, [selectedDates]);

  const isDayDisabled = (day) => {
    return !isSameMonth(activeMonth, day) ||
            minDate && isBefore(day, minDate) ||
            maxDate && isAfter(day, maxDate);
  };

  return <div className={styles.datePickerEntryContainer}>
    <h2 className={styles.monthName}>{intlFormat(activeMonth, { month: 'long' })}</h2>
    <div className={styles.datePicker}>
      {
        eachDayOfInterval({
          start: startOfWeek(startOfMonth(activeMonth)),
          end: endOfWeek(endOfMonth(activeMonth))
        })
          .map(day => 
            <DatePickerEntry
              key={day.toUTCString()}
              active={isToday(day)}
              label={format(day, 'd')}
              description={intlFormat(day, { weekday: 'long' })}
              selected={selectedDates.filter(e => isSameDay(e, day)).length != 0}
              disabled={isDayDisabled(day)}
              onClick={() => onSelect(day)}
            />
          )
      }
    </div>
    <div className={styles.buttonGroup}>
      <button 
        type="button" 
        className={styles.button}
        onClick={() => setActiveMonth(d => subMonths(d, 1))}
        disabled={minDate && isBefore(startOfMonth(activeMonth), minDate)}
      >
        Prev
      </button>
      <button 
        type="button" 
        className={styles.button}
        onClick={() => setActiveMonth(d => addMonths(d, 1))}
        disabled={maxDate && isAfter(endOfMonth(activeMonth), maxDate)}
      >
        Next
      </button>
    </div>
  </div>;
}

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.arrayOf(Date),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  maxSelections: PropTypes.number
};