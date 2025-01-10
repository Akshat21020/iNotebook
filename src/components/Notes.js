import React, { useContext, useEffect, useRef, useState, } from "react";
import { useNavigate } from 'react-router'
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";

const Notes = (props) => {
    const context = useContext(noteContext);
  const { notes,getNotes,editNote} = context;
  let navigate = useNavigate;

  const [note , setNotes] = useState({id:"", etitle : "", edescription : ""});
  useEffect(() =>{
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  },[])

  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) =>{
    ref.current.click();
    setNotes({id : currentNote._id ,etitle : currentNote.title, edescription : currentNote.description})
  }

  const handleOnClick = (e) =>{
    refClose.current.click();
    editNote(note.id ,note.etitle, note.edescription)
    props.showAlert("Updated successfully", "Success");
  }

  const handleonChange = (e) =>{
    setNotes({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <>
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModalCenter">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Edit Note</h5>
      </div>
      <div className="modal-body">
        <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="title" onChange={handleonChange}/>
  </div>
  <div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <textarea className="form-control" id="edescription" name="edescription"  value={note.edescription} rows="5" onChange={handleonChange}/>
</div>
      </div>
      <div className="modal-footer">
      <button  type="button" ref = {refClose} className="btn btn-secondary" onClick={handleOnClick} data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" onClick={handleOnClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="container my-5">
      <h2>Your Notes</h2>
      <div className="row">
      {notes.map((note) =>{
        return <Noteitem key={note._id} note = {note} updateNote= {updateNote}/>
      })}
      </div>
    </div>
    </>
  );
};

export default Notes;
