import React, { useContext, useEffect, useRef, useState } from 'react';
import NoteContext from '../context/notes/NoteContext.js';
import Noteitem from './Noteitem.js';
import { useNavigate } from 'react-router-dom';

export default function Notes(props) {
    const {showAlert} = props;
    const { notes, getNotes, editNote } = useContext(NoteContext);
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: "default" });
    const ref = useRef(null);
    const refClose = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes();
        }
        else{
            navigate("/login");
        }
    }, []);

    const handleClick = (e) => {
        refClose.current.click();
        console.log("Form submitted : ", note);
        editNote(note.id,note.etitle,note.edescription,note.etag);
        showAlert("Note has been updated successfully", "success");
    }

    const updateNote = (note) => {
        ref.current.click();
        setNote({id: note._id,etitle: note.title, edescription: note.description, etag: note.tag});
    }

    const handleEditTitleChange = (e) => {
        setNote({id: note.id,etitle: e.target.value, edescription: note.edescription, etag: note.etag});
    }

    const handleEditDescriptionChange = (e) => {
        setNote({ id: note.id, etitle: note.etitle, edescription: e.target.value, etag: note.etag});
    }
    return (
        <>
            <button type="button" className="btn btn-primary d-none" ref={ref} data-toggle="modal" data-target="#exampleModal">
                Launch Edit Note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputTitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={handleEditTitleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={handleEditDescriptionChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-danger" data-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-success">Edit Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row my-3">
                {
                    notes.map((note) => {
                        return <Noteitem key={note._id} note={note} showAlert={showAlert} updateNote={updateNote} />
                    })
                }
            </div>
        </>
    )
}
