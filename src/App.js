import './App.css';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.js';
import Home from './components/Home.js';
import About from './components/About.js';
import NoteState from './context/notes/NoteState.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Alert from './components/Alert.js';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
    const newAlert = {msg: message, type: type};
    setAlert(newAlert);
    setTimeout(()=>{setAlert(null)},2000);
  }

  return (
    <NoteState>
      <Router basename='/'>
        <Navbar />
        <Alert alert={alert}/>
        <Routes>
          <Route key="1" exact path='/' element={<Home showAlert={showAlert}/>} />
          <Route key="2" exact path='/about' element={<About />} />
          <Route key="3" exact path='/login' element={<Login showAlert={showAlert} />} />
          <Route key="4" exact path='/signup' element={<Signup showAlert={showAlert} />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
