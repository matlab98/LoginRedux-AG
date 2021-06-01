import { db } from '../components/firebase/firebase-config'

export const loadNotes = async (uid) => {

    const noteStore = await db.collection(`${uid}/jurnal/note`).get()
    const notes = [];

    noteStore.forEach(noteDb=>{
       notes.push({
        id:noteDb.id,
        ...noteDb.data()
       })
    })
   
    console.log(notes)
    return notes
}