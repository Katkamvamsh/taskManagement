import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Registration from './components/Register/Register';
import Login from './components/Login/Login';
import Context from './components/Context/Context';  // Make sure the path is correct

import Taskmanagement from './components/Taskmanagement/Taskmanagementpage';
import InputForm from './components/Inputforms/Inputforms';

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route path='/' element={<Registration />} />
          <Route path='/login' element={<Login />} />
          <Route path='/inputForms' element={<InputForm/>} />
          <Route path='/tasks' element={<Taskmanagement />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
