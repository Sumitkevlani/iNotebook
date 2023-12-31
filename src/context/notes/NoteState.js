import React, { useState } from 'react'
import NoteContext from './NoteContext.js';

export default function NoteState(props) {
    const host = "http://127.0.0.1:5000";
    const initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    const getNotes = async () => {
        const url = `${host}/api/notes/fetchNotes`;
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "method": "cors",
                "Content-type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    const addNote = async (title, description, tag) => {
        const url = `${host}/api/notes/createNote/`;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "mode": "cors",
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag }), 
        });

        const note = await response.json();
        setNotes(notes.concat(note));
    };

    const deleteNote = async (id) => {
        const url = `${host}/api/notes/deleteNote/${id}`;

        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });

        const json = await response.json();
        console.log(json);
        setNotes(notes.filter((note) => note._id!==id));
    };

    const editNote = async (id, title, description, tag) => {

        
        const url = `${host}/api/notes/updateNote/${id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token":localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag}), // body data type must match "Content-Type" header
        });

        const json = await response.json();
        console.log(json);

        const updatedNotes = notes.map((currNote) =>
            currNote._id === id ? { ...currNote, title, description, tag } : currNote
        );

        // Update the state with the new array
        setNotes(updatedNotes);
        
    };

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}
