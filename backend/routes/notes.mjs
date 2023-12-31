import express from "express";
import fetchUser from "../middleware/fetchUser.mjs";
import Note from '../models/NoteSchema.mjs';
import {check, validationResult } from "express-validator";

const notesRouter = express.Router();

notesRouter.post('/createNote',fetchUser,[check('title','Title must be of at least 3 characters').isLength(3),check('description','Description should be of at least 10 characters').isLength(10)],async (req,res)=>{
    
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            res.status(401).json(errors);
        }
        else{
            try {
                const body = req.body;
                const note = new Note({userId: req.id,...body});
                const savedNote = await note.save();
                res.status(200).json(savedNote);
            } catch (error) {
                console.log(error);
                res.status(500).json({message: "Internal Server Error"});
            }
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

notesRouter.get('/fetchNotes',fetchUser,async (req,res)=>{
    try {
        const notes = await Note.find({userId: req.id});
        res.status(200).json(notes);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
});

notesRouter.put('/updateNote/:id',fetchUser,async (req,res)=>{
    const userId = req.id;
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    try {
        if(!note){
            res.status(404).json({message : "Note not found"});
        }
        else if(userId !== note.userId){
            res.status(401).json({message: "Access Denied"});
        }
        else{
            const {title, description, tag} = req.body;
            const newNote = note;
    
            if(title){newNote.title = title;}
            if(description){newNote.description = description;}
            if(tag){newNote.tag = tag};
    
            const updatedNote = await Note.findByIdAndUpdate(noteId, newNote, {new: true});
            res.status(200).json({message: "Note Updated Successfully", updatedNote: updatedNote});
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

notesRouter.delete('/deleteNote/:id',fetchUser,async (req,res)=>{
    const userId = req.id;
    const noteId = req.params.id;
    const note = await Note.findById(noteId);

    try {
        if(!note){
            res.status(404).json({message : "Note not found"});
        }
        else if(userId !== note.userId){
            res.status(401).json({message: "Access Denied"});
        }
        else{
    
            const deletedNote = await Note.findByIdAndDelete(noteId);
            res.status(200).json({message: "Note Deleted Successfully"});
        }
    } catch (error) {
        res.status(500).json({message: "Internal Server Error"});
    }
});

export default notesRouter;