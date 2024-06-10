import React, { useState } from 'react';

const AddActivity = ({ activities, setActivities }) => {
  const [activity, setActivity] = useState({
    name: '',
    description: '',
    duration: '',
    isRepetitive: false,
    frequencyUnit: '',
    frequencyValue: '',
    specificDays: [],
    isSequential: false,
    order: ''
  });

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setActivity(prevActivity => ({
      ...prevActivity,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    setActivities(activity);
    setActivity({
      name: '',
      description: '',
      duration: '',
      isRepetitive: false,
      frequencyUnit: '',
      frequencyValue: '',
      specificDays: [],
      isSequential: false,
      order: ''
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={activity.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={activity.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Duration (minutes):</label>
          <input
            type="number"
            name="duration"
            value={activity.duration}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="isRepetitive"
              checked={activity.isRepetitive}
              onChange={handleChange}
            />
            Repetitive
          </label>
          {activity.isRepetitive && (
            <div>
              <label>Frequency:</label>
              <input
                type="number"
                name="frequencyValue"
                value={activity.frequencyValue}
                onChange={handleChange}
              />
              <select
                name="frequencyUnit"
                value={activity.frequencyUnit}
                onChange={handleChange}
              >
                <option value="">Select unit</option>
                <option value="seconds">Seconds</option>
                <option value="minutes">Minutes</option>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
                <option value="months">Months</option>
              </select>
              <div>
                <label>Specific Days:</label>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map(day => (
                  <label key={day}>
                    <input
                      type="checkbox"
                      name="specificDays"
                      value={day}
                      checked={activity.specificDays.includes(day)}
                      onChange={e => {
                        const { value, checked } = e.target;
                        setActivity(prevActivity => {
                          const specificDays = checked
                            ? [...prevActivity.specificDays, value]
                            : prevActivity.specificDays.filter(d => d !== value);
                          return { ...prevActivity, specificDays };
                        });
                      }}
                    />
                    {day}
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="isSequential"
              checked={activity.isSequential}
              onChange={handleChange}
            />
            Sequential
          </label>
          {activity.isSequential && (
            <div>
              <label>Order:</label>
              <input
                type="number"
                name="order"
                value={activity.order}
                onChange={handleChange}
              />
            </div>
          )}
        </div>
        <button type="submit">Add Activity</button>
      </form>
      <div>
        <h3>Activities:</h3>
        <ul>
          {activities && activities.map((act, index) => (
            <li key={index}>
              {act.name} - {act.description} - {act.duration} minutes - 
              {act.isRepetitive ? ` Repeats every ${act.frequencyValue} ${act.frequencyUnit}` : ' Not repetitive'} - 
              {act.specificDays.length > 0 ? ` Specific days: ${act.specificDays.join(', ')}` : ''} - 
              {act.isSequential ? ` Order: ${act.order}` : ' Not sequential'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddActivity;
