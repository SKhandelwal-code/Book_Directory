import { Route, Routes } from 'react-router-dom';
import './App.css';
import WithNav from './Components/WithNav';
import WithOutNav from './Components/WithOutNav';
import Auth from './Screens/Auth';
import Create from './Screens/Create';
import Home from './Screens/Home';

function App() {
  return (
    <>
      <Routes>
        <Route element={<WithOutNav/>}>
          <Route path='/auth' element={<Auth/>}/>
        </Route>
        <Route element={<WithNav/>}>
          <Route path='/' element={<Home/>}/>
          <Route path='/create' element={<Create/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
