
import React, { useContext, useEffect } from 'react';
import { TaskContext } from '../Context/Context';
import './Inputforms.css';
import { useNavigate, useLocation } from 'react-router-dom';

const InputForm = () => {
  const navigate = useNavigate();

  const { inputValue, setInputValue, inputHandler, addTask } = useContext(TaskContext);
  
  const location = useLocation();
  const editIndex = location.state?.index;
  useEffect(() => {
    if (editIndex !== undefined) {
      const taskToEdit = location.state?.task;
      setInputValue({
        name: taskToEdit.name,
        description: taskToEdit.description,
        status: taskToEdit.status
      });
    }
  }, [editIndex, location.state, setInputValue]);

  const handleSubmit = () => {
    // If editIndex is provided, update the task, otherwise add a new task
    addTask(editIndex);
  };

  const goToTask = () => {
    navigate('/tasks');
  };

  return (
    <div className='main-container'>
      <h2>{editIndex !== undefined ? 'Edit Task' : 'Add Task'}</h2>

      <div>
        <label className='label' htmlFor='name'>Name:</label>
        <input
          className='input'
          id='name'
          name='name'
          type='text'
          placeholder='Enter Name'
          value={inputValue.name}
          onChange={inputHandler}
        />
      </div>

      <div>
        <label className='label' htmlFor='description'>Description:</label>
        <input
          className='input'
          id='description'
          name='description'
          type='text'
          placeholder='Enter Description'
          value={inputValue.description}
          onChange={inputHandler}
        />
      </div>

      <div>
        <label className='label' htmlFor='status'>Status:</label>
        <select
          id='status'
          className='input'
          name='status'
          value={inputValue.status}
          onChange={inputHandler}
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Success">Success</option>
          <option value="Reject">Reject</option>
        </select>
      </div>

      <div className='btn-container'>
        <button className='button' onClick={handleSubmit} style={{ marginTop: "10px" }}>
          {editIndex !== undefined ? 'Update Task' : 'Add Task'}
        </button>
        <button className='button' onClick={goToTask} style={{ marginTop: "10px" }}>
          Go To Task
        </button>
      </div>
    </div>
  );
};

export default InputForm;
