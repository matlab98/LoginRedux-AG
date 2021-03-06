import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { setError, removeError } from '../actions/uiError'
import { startRegisterWithEmailPasswordName } from '../actions/auth'

export const RegisterScreen = () => {

    const dispatch = useDispatch();

    const { msjError } = useSelector(state => state.ui);

    const [values, handleInputChange] = useForm({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = values

    const formValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('nombre requerido'))
            console.log('nombre requerido')
            return false
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email requerido'))
            console.log('Email requerido')
            return false
        } else if (password !== password2) {
            console.log('La contraseña es incorrecta')
            dispatch(setError('La contraseña es incorrecta'))
            return false
        }

        dispatch(removeError())
        return true

    }

    const HandleRegister = (e) => {
        e.preventDefault();
        if (formValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name))
        }
    }

    return (
        <>
            <h3 className="auth__title">Register</h3>

            <form onSubmit={HandleRegister}>

                {
                    msjError &&
                    (
                        <div className="auth__alert-error">
                            { msjError}
                        </div>
                    )
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={name}
                    onChange={handleInputChange} />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange={handleInputChange} />

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange={handleInputChange} />

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange={handleInputChange} />

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5" >
                    Register
                </button>

                <Link
                    to="/auth/login"
                    className="link" >
                    Already registered?
                </Link>

            </form>
        </>
    )
}