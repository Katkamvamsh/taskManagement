import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Create context
export const TaskContext = createContext();

const Context = ({ children }) => {
  const navigate=useNavigate()
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

  const addTask = () => {
    if (inputValue.name.trim() === "" || inputValue.description.trim() === "" || inputValue.status.trim() === "") {
      alert("all fields are mandatory to fill")
          return;
    }
    else{
      navigate('/tasks')
    }
    setTasks((prevTasks) => [...prevTasks, inputValue]);
    setInputValue({ name: "", description: "", status: "" });
  };

  return (
    <TaskContext.Provider value={{ inputValue, inputHandler,setTasks, addTask, tasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export default Context;
