import React, { useEffect, useRef } from 'react'
import { NotesAppBar } from './NotesAppBar'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { activeNote } from '../actions/notesAction'

export const NoteScreen = () => {

    const { active: notes } = useSelector(state => state.notes);
    const dispatch = useDispatch();

    const [values, handleInputChange, reset] = useForm(notes);
    const { body, title, id } = values;

    const activeId = useRef(notes.id)

    useEffect(() => {
        if (notes.id !== activeId.current) {
            reset(notes)
        }
        activeId.current = notes.id
    }, [notes, reset])

    useEffect(() => {
        dispatch(activeNote(values.id, { ...values }))
    }, [values, dispatch])

    return (
        <div className="notes__main-content">

            <NotesAppBar />

            <div className="notes__content">

                <input
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    name="title"
                    value={title}
                    onChange={handleInputChange}
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                    name="body"
                    value={body}
                    onChange={handleInputChange}
                ></textarea>

                {
                    (notes.url)
                    &&
                    (
                        <div className="notes__image">
                            <img
                                src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
                                alt="imagen"
                            />
                        </div>
                    )
                }
            </div>

        </div>
    )
}