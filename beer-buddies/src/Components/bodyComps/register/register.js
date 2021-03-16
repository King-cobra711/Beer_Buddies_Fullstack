import React, {useState, useEffect} from 'react';

import {Formik, Field, Form, ErrorMessage} from "formik";

import { userSchema } from '../../../Validations/Registration/validateRegistration';

import Aux from '../../../hoc/aux';
import classes from './register.module.css';
import * as Mui from '@material-ui/core';

const Register = () => {
const [userExists, setUserExists] = useState('');
const [emailExists, setEmailExists] = useState('');
const [loggedIn, setLoggedIn] = useState(false);


return (
    <Aux>
        <Formik
        initialValues={{
            Email:"",
            Username:"",
            Password:"",
            confirmPassword:"",
        }}
        validationSchema={userSchema}
        onSubmit={(fields)=>{
            fetch('http://localhost:3001/checkRegisterDetails', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(fields)
    }).then((res) => {
        return res.json();
    }).then((data) => {
            console.log(data);
            if(data.emailExists && data.userExists){
            setEmailExists(data.emailExists);
            setUserExists(data.userExists);
            }
            else if(data.emailExists){
            setEmailExists(data.emailExists);
            setUserExists('');
            }
            else if(data.userExists){
            setUserExists(data.userExists);
            setEmailExists('');
        }else if(data.RegConfirmed){
            console.log(data.RegConfirmed);
            fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(fields)
            }).then((res) => {
                return res.json();
            }).then((data)=>{
                setLoggedIn(data.loggedIn);
            })
            setUserExists('');
            setEmailExists('');
        }
            }).catch(error => console.log(error))
    .catch(error => console.log(error))
        }}>
            <Form
            className={classes.Display}
            >
                <Field
                name="Email"
                type="text"
                placeholder="Email"
                className={classes.inputRegister}
                onKeyUp={()=>setEmailExists('')}
                />
                <p
                className={classes.errorMessage}
                >{emailExists}</p>
                <ErrorMessage
                name="Email"
                component="p"
                className={classes.errorMessage}
                />
                <Field
                name="Username"
                type="text"
                placeholder="Username"
                className={classes.inputRegister}
                onKeyUp={()=>setUserExists('')}
                />
                <p
                className={classes.errorMessage}
                >{userExists}</p>
                <ErrorMessage
                name="Username"
                component="p"
                className={classes.errorMessage}
                />
                <Field
                name="Password"
                type="password"
                placeholder="Password"
                className={classes.inputRegister}
                />
                <ErrorMessage
                name="Password"
                component="p"
                className={classes.errorMessage}
                />
                <Field
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className={classes.inputRegister}
                />
                <ErrorMessage
                name="confirmPassword"
                component="p"
                className={classes.errorMessage}
                />
                <Mui.Button 
                    style={{fontFamily:'DotGothic16', fontSize:'1em'}}
                    variant = "contained" 
                    color = "default" 
                    size = "medium"
                    type="submit"
                    // href='/'
                >Register</Mui.Button>
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

export default Register;