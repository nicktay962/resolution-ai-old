import React, { useState } from 'react';
import axios from 'axios';
import AddActivity from './AddActivity';

const EditProgram = ({ program, onUpdateProgram }) => {
  const [goal, setGoal] = useState(program.goal);
  const [price, setPrice] = useState(program.price);
  const [timeToComplete, setTimeToComplete] = useState(program.timeToComplete);
  const [activities, setActivities] = useState(program.activities);

  const handleAddActivity = (activity) => {
    setActivities([...activities, activity]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedProgram = {
      ...program,
      goal,
      price,
      timeToComplete,
      activities
    };

    axios.post(`http://localhost:5000/programs/update/${program._id}`, updatedProgram)
      .then(res => {
        onUpdateProgram(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <div>
      <h3>Edit Program</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Goal: </label>
          <input
            type="text"
            required
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label>Time to Complete: </label>
          <input
            type="text"
            required
            value={timeToComplete}
            onChange={(e) => setTimeToComplete(e.target.value)}
          />
          <select onChange={(e) => setTimeToComplete(e.target.value)}>
            <option value="seconds">Seconds</option>
            <option value="minutes">Minutes</option>
            <option value="hours">Hours</option>
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
        <div>
          <AddActivity onAddActivity={handleAddActivity} />
        </div>
        <div>
          <button type="submit">Update Program</button>
        </div>
      </form>
      <div>
        <h4>Activities</h4>
        <ul>
          {activities.map((activity, index) => (
            <li key={index}>
              {activity.name}: {activity.description} - {activity.duration} minutes
              {activity.isSequential && ` (Order: ${activity.order})`}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EditProgram;
