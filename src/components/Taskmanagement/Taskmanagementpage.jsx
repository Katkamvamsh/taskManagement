
import React, { useContext, useState } from 'react';
import './Taskmanagementpage.css';
import { TaskContext } from '../Context/Context';
import { useNavigate } from 'react-router-dom';

const Taskmanagementpage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const { tasks, setTasks } = useContext(TaskContext);

  const inputHandler = (event) => {
    setInput(event.target.value);
  };

  const filteredData = tasks.filter((item) => {
    return JSON.stringify(item).toLowerCase().includes(input.toLowerCase());
  });

  const onDeletedTask = (index) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const toEditForm = (task, index) => {
    navigate('/inputForms', { state: { task, index } });
  };

  const addMoreTasks = () => {
    navigate('/inputForms');
  };

  return (
    <div className='task-container'>
      <h1>Tasks</h1>
      <input
        className='input'
        type='search'
        value={input}
        placeholder='Search here'
        onChange={inputHandler}
      />
      {tasks.length === 0 ? (
        <p style={{ color: "blue", fontSize: "32px" }}>No tasks added yet.</p>
      ) : (
        <>
          <div className='headers'>
            <h2>Name</h2>
            <h2>Description</h2>
            <h2>Status</h2>
            <h2>Action</h2>
          </div>
          {filteredData.map((task, index) => (
            <div key={index} className='task-item'>
              <div className='para'>
                <p>{task.name}</p>
                <p>{task.description}</p>
                <p>{task.status}</p>
                <div>
                  <button onClick={() => toEditForm(task, index)} className='buttonEdit'>Edit</button>
                  <button onClick={() => onDeletedTask(index)} className='buttonDelete'>Delete</button>
                </div>
              </div>
            </div>
          ))}
          <button className='add-more-button' onClick={addMoreTasks}>Add more</button>
        </>
      )}
    </div>
  );
};

export default Taskmanagementpage;
