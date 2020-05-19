import React , {useEffect, useRef, useContext} from 'react';

import classes from './Cockpit.css'
import AuthContext from '../../context/auth-context';

const cockpit = (props) => {

    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    console.log('Cockpit.js:', authContext.authenticated);

    useEffect(() => {
        console.log("[Cockpit.js] useEffect");

        toggleBtnRef.current.click();
    //    const timer =  setTimeout(() => {
    //         console.log('[cockpit.js] saved alert');
    //     }, 1000);

        return () => {
            //clearTimeout(timer);
            console.log('[Cockpit.js]: useEffect cleanUp');
        }
    }, []);  // if want to call useEffect only in the beginning
    //}, [props.persons]);

    useEffect(() => {
        console.log("[Cockpit.js] 2nd useEffect");

        return () => {
            console.log('[Cockpit.js]: cleanUp work from 2nd useEffect');
        }
    });

    //can useEffect more than once to call useEffect on multiple state changes

    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }

    const assignedClasses = [];
    if (props.personsLength <= 2) {
      assignedClasses.push(classes.red); // classes = ['red']
    }
    if (props.personsLength <= 1) {
      assignedClasses.push(classes.bold); // classes = ['red', 'bold']
    }


    return (
        <div>
            <h1>Hi, {props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            <button 
            ref={toggleBtnRef}
            className={btnClass} onClick={props.clicked}>
                Toggle Persons
            </button>
            <button onClick={authContext.login}>Log In</button>

        </div >
    );

};


export default React.memo(cockpit);