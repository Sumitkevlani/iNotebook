import React from 'react';
import '../App.css';
import Notes from './Notes.js';
import AddNote from './AddNote.js';


function Home(props) {
  const {showAlert} = props;
  return (
    <div className='container my-3'>
        
        <h1>Add A Note</h1>

        <AddNote showAlert={showAlert}/>

        <h1>Your Notes</h1>

        <Notes showAlert={showAlert}/>
        
        
    </div>
  )
}

export default Home;
