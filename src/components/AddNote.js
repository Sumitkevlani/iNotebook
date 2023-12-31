import React, { useContext, useState } from 'react';
import NoteContext from '../context/notes/NoteContext.js';

export default function AddNote(props) {
    const {showAlert} = props;
    const {addNote} = useContext(NoteContext);
    const [note, setNote] = useState({ title: "", description: "", tag: "default" });

    function handleTitleChange(e) {
        setNote({ ...note, title: e.target.value });
    }

    function handleDescriptionChange(e) {
        setNote({...note, description: e.target.value});
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(note.title,"  ", note.description);
        addNote(note.title, note.description);
        setNote({ title: "", description: "", tag: "default" });
        showAlert("Note has been added successfully","success");
        
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="exampleInputTitle" className="form-label">Title</label>
                <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={handleTitleChange} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleDescriptionChange} />
            </div>
            <button type="submit" disabled={note.title.length<5||note.description.length<5} className="btn btn-dark">Add Note</button>
        </form>
    );
}
