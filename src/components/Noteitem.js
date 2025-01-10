import React, { useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import noteContext from '../context/notes/noteContext';

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const { note ,updateNote} = props;

    return (
        <div className="col-md-3"> 
            <div className="card my-3"> 
                <div className="card-body">
                    <div className='d-flex align-items-center'>
                <h5 className="card-title">{note.title}</h5> 
                <FontAwesomeIcon className='mx-3' icon={faPenToSquare} style={{ cursor: 'pointer' }} onClick={() => updateNote(note)}/>
                <FontAwesomeIcon icon={faTrashCan} style={{ cursor: 'pointer' }} onClick={() => deleteNote(note._id)}/>
                </div>
                <p className="card-text">{note.description}</p> 
                </div>
            </div>
        </div>
    )
}
export default Noteitem