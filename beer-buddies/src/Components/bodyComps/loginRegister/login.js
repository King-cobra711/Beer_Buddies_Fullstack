import React, {useState, useEffect} from 'react';
import {Formik, Field, Form, ErrorMessage} from "formik";


import Aux from '../../../hoc/aux';
import classes from './login.module.css';
import * as Mui from '@material-ui/core';

const Login = () => {

    const [loginStatus, setLoginStatus] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');

    return (
    <Aux>
        <h1>{welcomeMessage}</h1>
        <Formik
        initialValues={{
            Username:"",
            Password:"",
        }}
        onSubmit={(fields)=>{
            fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(fields)
        }).then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data)
            if(data.message){
            setLoginMessage(data.message);
            setLoginStatus(false);
            setWelcomeMessage('');
        }
        else{
            setLoginMessage('');
            setLoginStatus(true);
            setWelcomeMessage("Welcome " + data[0].User_Name);
            console.log(welcomeMessage);
        }
        })
        .catch(error => console.log(error))
        }}>
            <Form
            className={classes.Display}
            >
                <Field
                name="Username"
                type="text"
                placeholder="Username"
                className={classes.inputLogin}
                onKeyUp={()=>setLoginMessage('')}
                />
                <Field
                name="Password"
                type="password"
                placeholder="Password"
                className={classes.inputLogin}
                onKeyUp={()=>setLoginMessage('')}
                />
                <p
                className={classes.errorMessage}
                >{loginMessage}
                </p>
                <Mui.Button 
                    style={{fontFamily:'DotGothic16', fontSize:'1em'}}
                    variant = "contained" 
                    color = "default" 
                    size = "medium"
                    type="submit"
                    // href='/'
                >LOGIN</Mui.Button>
                <Mui.Button 
                    style={{fontFamily:'DotGothic16', fontSize:'1em'}}
                    variant = "contained" 
                    color = "default" 
                    size = "medium"
                    type="submit"
                    href='/register'
                >REGISTER</Mui.Button>
                <div style={{borderTop:'dotted white', width:'100%'}}></div>
                <Mui.Button 
                    style={{fontFamily:'DotGothic16', fontSize:'1em'}}
                    variant = "contained" 
                    color = "default" 
                    size = "medium"
                    href="/"
                >Main Menu</Mui.Button>
                
            </Form>
        </Formik>
    </Aux>
    )
}

export default Login;