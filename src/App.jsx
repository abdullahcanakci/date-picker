import { addMonths, subMonths, parseISO } from 'date-fns';
import React, { useState } from 'react';
import DatePicker from '../lib/DatePicker';

function App() {

  const [dates, setDates] = useState([]);
  const [minDate, setMinDate] = useState('');
  const [maxDate, setMaxDate] = useState('');
  const [samples, setSamples] = useState(1);

  return (
    <div className="App">
      <div className="limit-container">

        <div className="limit-input">
          <label>Min Date
            <input type="date" onChange={e => setMinDate(parseISO(e.target.value))} />
          </label>
        </div>
        <div className="limit-input">
          <label>Max Date</label>
          <input type="date" onChange={e => setMaxDate(parseISO(e.target.value))} />
        </div>
        <div className="limit-input">
          <label>Number of samples</label>
          <input type="number" value={samples} onChange={e => setSamples(e.target.value)} />
        </div>
      </div>

      <DatePicker 
        defaultValue={dates}
        onChange={setDates}
        maxDate={maxDate}
        minDate={minDate}
        maxSelections={samples}
      />

      <div style={{ height: '100px', width: '100%', textAlign: 'center', overflowY: 'auto' }}>
        {
          dates.map((d, i) => <p key={i}>{JSON.stringify(d)}</p>)
        }
      </div>
    </div>
  );
}

export default App;
