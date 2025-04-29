
import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
export const TaskContext = createContext();

const Context = ({ children }) => {
  const navigate = useNavigate();

  const [inputValue, setInputValue] = useState({
    name: "",
    description: "",
    status: ""
  });

  const [tasks, setTasks] = useState([]);

  const inputHandler = (event) => {
    const { value, name } = event.target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  // Add task or edit existing task
  const addTask = (editIndex = null) => {
    if (inputValue.name.trim() === "" || inputValue.description.trim() === "" || inputValue.status.trim() === "") {
      alert("All fields are mandatory to fill");
      return;
    }

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = inputValue; 
      setTasks(updatedTasks);
    } else {
     
      setTasks((prevTasks) => [...prevTasks, inputValue]);
    }

   
    setInputValue({ name: "", description: "", status: "" });
    
    navigate('/tasks');
  };

  return (
    <TaskContext.Provider value={{ inputValue, setInputValue, inputHandler, tasks, addTask, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default Context;
