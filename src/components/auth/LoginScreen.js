import React from 'react';
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'
import { useDispatch, useSelector } from 'react-redux'
import { startLoginEmailPassword, startGoogleLoginPassword } from '../actions/auth'
// import { setError, removeError } from '../actions/uiError';
// import Sweet from 'sweetalert2'
// import validator from 'validator';

export const LoginScreen = () => {

    const dispatch = useDispatch()
    const loading = useSelector(state => state.uid);
    // const { msjError } = useSelector(state => state.ui)


    const [formValues, handleInputChange] = useForm({
        email: '',
        password: ''
    })

    const { email, password } = formValues;

    // const error = (error) => {
    //     return (
    //         Sweet.fire({
    //             icon: 'error',
    //             title: 'Oops...',
    //             text: error,
    //         })
    //     )
    // }

    // const formValid = () => {
    //     if (!validator.isEmail(email)) {
    //         dispatch(setError('Email requerido'))
    //         return false
    //     }
    //     else if (password < 5) {
    //         dispatch(setError('La contraseña es incorecta'))
    //         return false
    //     }

    //     dispatch(removeError(''))
    //     return true
    // }

    const handleLogin = (e) => {
        e.preventDefault();
        // error(msjError)
        // if (formValid()) {
        //     reset()
            dispatch(startLoginEmailPassword(email, password))
        // }
    }

    const handleGoogle = () => {
        dispatch(startGoogleLoginPassword())
    }

    return (
        <>
            <h3 className="auth__title">Login</h3>

            <form onSubmit={handleLogin}>

                <input
                    type="text"
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
                    password={password}
                    onChange={handleInputChange}
                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={loading}
                >
                    Login
                </button>

                <div className="auth__social-networks">
                    <p>Login with social networks</p>

                    <div
                        className="google-btn"
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text"
                            onClick={handleGoogle}>
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>

            </form>
        </>
    )
}
