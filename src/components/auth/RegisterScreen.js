import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm';
import { startRegisterWithEmailPassword } from '../actions/auth';
import { setError, removeError } from '../actions/uiError';
import Sweet from 'sweetalert2'

export const RegisterScreen = () => {

    const dispatch = useDispatch()
    const { msjError } = useSelector(state => state.ui)

    const [formValues, handleInputChange, reset] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = formValues

    const error = (error) => {
        return (
            Sweet.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            })
        )
    }

    const formValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Nombre requerido'))
            // error('Nombre requerido')
            return false
        }
        else if (!validator.isEmail(email)) {
            dispatch(setError('Email requerido'))
            // error('Email requerido')
            return false
        }
        else if (password !== password2 || password < 5) {
            dispatch(setError('La contraseña es incorecta'))
            // error('La contraseña es incorecta')
            return false
        }

        dispatch(removeError(''))
        return true
    }

    const handleRegister = (e) => {
        e.preventDefault()
        error(msjError)
        if (formValid()) {
            reset()
            dispatch(startRegisterWithEmailPassword(email, password, name))
        }
        
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>
            {/* {
                    msjError &&
                    (
                        Sweet.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: msjError,
            
                        })
                    )
                } */}
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange}
                />

                <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange}
                />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    
                >
                    Register
                </button>



                <Link
                    to="/auth/login"
                    className="link"
                >
                    Already registered?
                </Link>

            </form>
        </>
    )
}
