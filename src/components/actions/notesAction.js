import { db } from '../firebase/firebase-config'
import { loadNotes } from '../../helpers/loadNotes';
import { types } from "../types/types";
import Swal from 'sweetalert2'

export const notesAction = (notes) => {
    return async (dispatch, getSate) => {

        const uid = getSate().auth.uid
        
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }

        const docRef = await db.collection(`${uid}/jurnal/note`).add(newNote);
        dispatch(activeNote(uid, newNote))
    }
}

export const activeNote = (id, notes) => {
    return {
        type: types.notesActive,
        payload: {
            id,
            ...notes
        }
    }
}

export const startLoadingNote = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid)
        dispatch(setNote(notes))
    }
}

export const setNote = (notes) => {
    return {
        type: types.notesLoad,
        payload: notes
    }
}

export const startSaveNote = (notes) => {

    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if (!notes.url) {
            delete notes.url;
        }

        const noteToFirestore = { ...notes }
        delete noteToFirestore.id

        await db.doc(`${uid}/jurnal/note/${notes.id}`).update(noteToFirestore)

        dispatch(refreshNote(notes.id,noteToFirestore));
        Swal.fire('Saved', notes.title, 'success');
    }
}

export const refreshNote = (id, notes) => ({
    type: types.notesUpdate,
    payload: {
        id,
        notes: {
            id,
            ...notes
        }
    }
});

export const startUploading = ( file ) => {
    return async( dispatch, getState ) => {
        const { active:activeNote } = getState().notes;
        console.log(activeNote);
        console.log(file);
    }
}