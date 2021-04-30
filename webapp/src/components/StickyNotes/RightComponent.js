import React, { useState, useReducer, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Cookies from 'js-cookie';
import ConvService from '../../services/saveconvo.service';
import StickyService from '../../services/sticky.service'
import { connect } from 'react-redux';
import {
    getAllNotes
    , addNewNote
    , deleteNote
} from '../../actions/stickyNoteActions'



const RightComponent = (props) => {
    //  const [notesState, dispatch] = useReducer(notesReducer, initialNotesState);
    const [noteInput, setNoteInput] = useState('');
    const [userDetails, setUserDetails] = useState({})
    const tokenId = Cookies.get('tokenId');
    const { notesState } = { ...props };
    console.log("notesState", notesState);

    // const getUserDetail = async () => {
    //     const response = await ConvService.getUser(tokenId);
    //     // console.log("getUserDetail---->", response);
    //     setUserDetails({ ...response }, getStickyNotes())
    // }
    // const getStickyNotes = async () => {
    //     console.log("userDetails getStickyNotes--->", userDetails);
    //     const response = await StickyService.getStickies(tokenId, userDetails.email)
    //     console.log("getStickyNotes--->", response)
    //     props.getAllNotes({ ...response })
    // }


    const getInitialDetail = () => {
        ConvService.getUser(tokenId)
            .then(userDetail => {
                setUserDetails({ ...userDetail })
                if (userDetail !== null) {
                    StickyService.getStickies(tokenId, userDetail.email)
                        .then(stickiesNotes => {
                            console.log("StickyService.getStickies", stickiesNotes)
                            props.getAllNotes({ ...stickiesNotes })
                        });
                }
            })
    }


    useEffect(() => {
        getInitialDetail()
    }, [])

    const addNote = event => {
        // console.log("props.notesState", props.notesState)
        let stickies = props.notesState.notes;

        event.preventDefault();
        if (!noteInput) {
            return;
        }

        const newNote = {
            id: uuid(),
            text: noteInput,
            rotate: Math.floor(Math.random() * 20),
            createdDate: new Date()
        }
        props.addNewNote({ ...newNote });
        stickies.push(newNote);
        if (stickies.length === 1) {
            StickyService.addStickies(tokenId, {
                userEmail
                    : userDetails.email
                , stickies: stickies
            }).then(response => console.log("stickunote added ", response))
        } else {
            StickyService.updateSticky(tokenId, userDetails.email, stickies)
                .then(response => console.log("sticky updated", response));
        }
        setNoteInput('');
    };

    const deleteNote = (note) => {
        props.deleteNote(note)
        let stickies = props.notesState.notes.filter(nt => note.id !== nt.id);
        console.log("after delete--?", stickies, userDetails.email)
        StickyService.updateSticky(tokenId, userDetails.email
            , stickies)

    }


    const dragOver = event => {
        event.stopPropagation();
        event.preventDefault();
    }

    const dropNote = event => {
        event.target.style.left = `${event.pageX - 50}px`;
        event.target.style.top = `${event.pageY - 50}px`;
    };

    return (
        <div>

            {/* <img src="Images/logo.PNG" alt="logo" class="logo"/> */}

            <div className="app" onDragOver={dragOver}>

                <br />
                <br />

                <h2>Notes ({notesState.totalNotes})
                <span>{notesState.notes.length ? `Last note created: ${notesState.lastNoteCreated}` : ' '}</span>
                </h2>

                <form className="note-form" onSubmit={addNote}>
                    <textarea placeholder="Create a new note..."
                        value={noteInput}
                        onChange={event => setNoteInput(event.target.value)}>
                    </textarea>
                    <button>Add</button>
                </form>
                <div className="headingUser">
                    {/* <br/>
            <br/>
            <h3>Hello, Rohit&nbsp;</h3> 
            <h5>Your Org is Northeastern University, Boston</h5> */}

                </div>
                <div className="heading">Dashboard</div>



                {/* <button class="button"><span>Chat</span></button>
            
            <button class="button"><span>Calender</span></button>

            <button class="button"><span>Organizational</span></button> */}






                {/* <button class="button"><span>Calender</span></button> */}

                {notesState
                    .notes
                    .map(note => (
                        <div className="note"
                            style={{ transform: `rotate(${note.rotate}deg)` }}
                            onDragEnd={dropNote}
                            draggable="true"
                            key={note.id}>

                            <div onClick={() => deleteNote(note)}
                                className="close">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>

                            </div>


                            <pre className="text">{note.text}</pre>
                        </div>
                    ))
                }
            </div>

        </div>
    );
}



const mapStateToProps = (state) => ({
    notesState: state.notesReducer
});

const mapDispatchToProps = (dispatch) => ({
    getAllNotes: (stickyNotes) => getAllNotes(dispatch, stickyNotes),
    addNewNote: (stickyNote) => addNewNote(dispatch, stickyNote),
    deleteNote: (id) => deleteNote(dispatch, id)
})

export default connect(mapStateToProps, mapDispatchToProps)(RightComponent);