import React, {useState, useEffect} from 'react';
import {Formik, Field, Form, ErrorMessage} from "formik";


import Aux from '../../../hoc/aux';
import classes from './login.module.css';
import * as Mui from '@material-ui/core';
import { Redirect } from 'react-router';
import { useHistory } from "react-router-dom";

const Login = () => {
let history = useHistory();

    const [loginStatus, setLoginStatus] = useState(false);
    const [loginMessage, setLoginMessage] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/login', {
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify()
    }).catch(error => console.log(error)).then((res)=>{
        console.log(res);
        if(res.status === 200){
            res.json().then((data)=>{
                // console.log(data.User[0])
            })
        }
        else if(res.status === 401){
            res.json().then((data)=>{
                // console.log(data)
            })
        }else{
            res.json().then((data)=>{
                // console.log(data)
            })
        }
        }).catch(error => console.log(error))
    }, [])

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
        credentials: 'include',
        body: JSON.stringify(fields),
        })
        .then((res) => {
            if(res.status === 200){
                res.json().then((data)=>{
                    console.log(data)
                    console.log("on submit");
                    history.push('/');
                })
            }
            else if(res.status === 406 || res.status === 404){
                return res.json().then((data)=>{
                    setLoginMessage(data.message);
                    setLoginStatus(false);
                    setWelcomeMessage('');
                })
            }else{
                return null;
            }
            
        }).catch(error => console.log(error))
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
                    // href='/login'
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