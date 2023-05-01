import './App.css';
import { UserList } from './Accounts/UserList';
import { Routes, Route } from 'react-router-dom';
import { CreateAccount } from './Accounts/CreateAccount';
import { Edit } from './Accounts/EditAccount.js'
import { Movies } from './Movies/Movies';
import Login from './Components/Login';
import Register from './Components/Register';
import DataTable from './Components/DataTable';

 

function App() {
  return (
    <div className="App">
      <Routes >
        <Route path='/' element={<Register/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/data-table' element={<DataTable/>} />
        <Route path='/create' element={<CreateAccount />} />
        <Route path='/user-list' element={<UserList />} />
        <Route path='/edit/:id' element={<Edit />} />
        <Route path='/movies'  element={<Movies/>} />
      </Routes>
    </div>
  );
}

export default App;
