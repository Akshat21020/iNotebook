import React, { useContext,useState } from 'react'
import noteContext from '../context/notes/noteContext'

export default function AddNote(props) {
  const context = useContext(noteContext);
  const {addNote} = context;

    const [note , setNotes] = useState({title : "", description : "" });

  const handleOnClick = (e) =>{
    e.preventDefault();
    addNote(note.title,note.description);
    setNotes({title : "", description : ""})
    props.showAlert('Added successfully', 'Success')

  }

  const handleonChange = (e) =>{
    setNotes({ ...note, [e.target.name]: e.target.value })
  }
  return (
    <div>
     <div className="container my-3">
      <h2>Add Note</h2>
      <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="title" value={note.title} onChange={handleonChange} required minLength={3}/>
  </div>
  <div className="mb-3">
  <label htmlFor="description" className="form-label">Description</label>
  <textarea className="form-control" id="description" name="description" rows="10" onChange={handleonChange} value={note.description} required minLength={5}/>
</div>
  <button type="submit" className="btn btn-primary" onClick={handleOnClick} disabled={note.title.length < 3 || note.description.length < 5}>Add Note</button>
</form>
    </div>
    </div>
  )
}
