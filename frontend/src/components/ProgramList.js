import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgramList = () => {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/programs/')
      .then(response => {
        setPrograms(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the programs!", error);
      });
  }, []);

  return (
    <div>
      <h2>Programs</h2>
      <ul>
        {programs.map((program, index) => (
          <li key={index}>
            {program.goal} - ${program.price} - {program.timeToComplete} {program.timeUnit}
            <ul>
              {program.activities.map((activity, i) => (
                <li key={i}>
                  {activity.name} - {activity.description} - {activity.duration} minutes - 
                  {activity.isRepetitive ? ` Repeats every ${activity.frequencyValue} ${activity.frequencyUnit}` : ' Not repetitive'} - 
                  {activity.specificDays.length > 0 ? ` Specific days: ${activity.specificDays.join(', ')}` : ''} - 
                  {activity.isSequential ? ` Order: ${activity.order}` : ' Not sequential'}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProgramList;
