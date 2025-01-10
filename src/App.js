import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Signup from './components/Signup';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import AddNote from './components/AddNote';
import Notes from './components/Notes';
import Alert from './components/Alert'
import { useState } from 'react';

function App() {
  const[alert , setAlert] = useState(null);
  const showAlert = (message,type) => {
    setAlert({
      msg : message,
      Type : type
    })
    setTimeout(() =>{
      setAlert(null)
    },2000);
  }
  return(
    <>
    <NoteState>
    <Router>
    <>
    <Navbar></Navbar>
    <Alert alert={alert}></Alert>
    <Routes>
     <Route exact path="/" element={<Home />} />
     <Route exact path="/about" element={<About />} />
     <Route exact path="/addnote" element={<AddNote showAlert ={showAlert}/>} />
     <Route exact path="/yournotes" element={<Notes showAlert ={showAlert}/>} />
     <Route exact path="/login" element={<Login showAlert ={showAlert}/>} />
     <Route exact path="/signup" element={<Signup showAlert ={showAlert}/>} />
        </Routes>
    </>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
