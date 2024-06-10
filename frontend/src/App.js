import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProgram from './components/AddProgram';
import ProgramList from './components/ProgramList';

function App() {
  const [programs, setPrograms] = useState([]);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('http://localhost:5000/programs/');
      setPrograms(response.data);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const addProgram = async (program) => {
    try {
      await axios.post('http://localhost:5000/programs/add', program);
      fetchPrograms();
    } catch (error) {
      console.error('Error adding program:', error);
    }
  };

  return (
    <div className="App">
      <AddProgram addProgram={addProgram} />
      <ProgramList programs={programs} />
    </div>
  );
}

export default App;
