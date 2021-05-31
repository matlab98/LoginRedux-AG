import React, { useEffect, useState } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { useDispatch } from 'react-redux';
import { firebase } from '../components/firebase/firebase-config'
import { login } from '../components/actions/auth';
import { PublicRouter } from './PublicRouter';
import { PrivateRouter } from './PrivateRouter';

export const AppRouter = () => {

    const [checking, setChecking] = useState(true)
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const dispatch = useDispatch()
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user?.uid) {
                dispatch(login(user.uid, user.displayName))
                setIsLoggedIn(true)
            }
            else{
                console.log("Usuario no registrado");
                setIsLoggedIn(false)
            }
            setChecking(false)
        })
    }, [dispatch,setChecking])

    if(checking){
        return (
            <h1>Cargando info</h1>
        )
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRouter
                        path="/auth"
                        component={AuthRouter}
                        isAuthenticated={isLoggedIn}
                    />

                    <PrivateRouter
                        exact
                        path="/"
                        component={JournalScreen}
                        isAuthenticated={isLoggedIn}
                    />

                    <Redirect to="/auth/login" />

                </Switch>
            </div>
        </Router>
    )
}
