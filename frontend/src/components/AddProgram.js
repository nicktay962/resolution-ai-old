import React, { useState } from 'react';
import AddActivity from './AddActivity';

const AddProgram = ({ addProgram }) => {
  const [program, setProgram] = useState({
    goal: '',
    price: '',
    timeToComplete: '',
    timeUnit: 'minutes',
    activities: []
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setProgram(prevProgram => ({
      ...prevProgram,
      [name]: value
    }));
  };

  const handleAddActivity = activity => {
    setProgram(prevProgram => ({
      ...prevProgram,
      activities: [...prevProgram.activities, activity]
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    addProgram(program);
    setProgram({
      goal: '',
      price: '',
      timeToComplete: '',
      timeUnit: 'minutes',
      activities: []
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Goal:</label>
          <input
            type="text"
            name="goal"
            value={program.goal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            name="price"
            value={program.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Time to Complete:</label>
          <input
            type="number"
            name="timeToComplete"
            value={program.timeToComplete}
            onChange={handleChange}
            required
          />
          <select
            name="timeUnit"
            value={program.timeUnit}
            onChange={handleChange}
          >
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
        <button type="submit">Create Program</button>
      </form>
      <AddActivity activities={program.activities} setActivities={handleAddActivity} />
    </div>
  );
};

export default AddProgram;
