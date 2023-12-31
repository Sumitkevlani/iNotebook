import React, { useContext,useState, useRef } from 'react';
import NoteContext from '../context/notes/NoteContext.js';

export default function Noteitem(props) {
    const { note, updateNote, showAlert } = props;
    const { deleteNote} = useContext(NoteContext);

    return (
        <div className="col-md-3">
            <div className="card border-2">
                <div className="card-body">
                    
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash" style={{ "cursor": "pointer" }} onClick={() => {deleteNote(note._id); showAlert("Note has been deleted successfully","success");}}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" style={{ "cursor": "pointer" }} onClick={() => updateNote(note)}></i>
                    
                </div>
            </div>
        </div>
    )
}
