import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { firebase } from '../components/firebase/firebase-config'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { login } from '../components/actions/auth'
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { PrivateRoute } from './PrivateRouter'
import { PublicRoute } from './PublicRouter'
import { startLoadingNote } from '../components/actions/notesAction';

export const AppRouter = () => {

    const [checking, setChecking] = useState(true)
    const [isLoogedIn, setsIsLoogedIn] = useState(false)
    const dispatch = useDispatch();

    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            console.log(user)
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setsIsLoogedIn(true)
                dispatch(startLoadingNote(user.uid))
            } else {
                setsIsLoogedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch, setChecking])

    if (checking) {
        return (
            <h1>Cargando ...</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoogedIn}
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLoogedIn}
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}