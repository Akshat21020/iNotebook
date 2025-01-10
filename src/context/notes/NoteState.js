import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //GET a note
  const getNotes = async () =>{
    //API call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        "Content-Type" : "application/json",
        "auth-token" : localStorage.getItem('token')
      }
    });
    const json = await response.json()
    setNotes(json)
  }
  //ADD a note
  const addNote = async (title,description) =>{
    //API call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description})
    });
    const note = await response.json();
    setNotes(notes.concat(note))
  }

  //DELETE a note
  const deleteNote = async (id) =>{
    //API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('token')
      }
    });
    const note = await response.json()
    console.log(note);
    const newNotes = notes.filter((note) =>{return note._id !== id})
    setNotes(newNotes);
  }

  //EDIT a note
  const editNote = async (id, title,description) =>{
    //API CALL 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
        "auth-token" : localStorage.getItem('token')
      }, 
      body: JSON.stringify({ title , description})
    });
    const json = await response.json();
    console.log(json)
    //LOGIC
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <noteContext.Provider value={{notes, addNote, deleteNote, editNote,getNotes}}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
