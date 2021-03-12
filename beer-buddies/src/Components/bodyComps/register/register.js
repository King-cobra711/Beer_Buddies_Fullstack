import React, {useState, useEffect} from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { userSchema } from '../../../Validations/Registration/validateRegistration';

import Aux from '../../../hoc/aux';
import classes from './register.module.css';
import * as Mui from '@material-ui/core';

const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const SubmitRegisteredUser = () => {
        fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            email: email, userName: userName, password: password
        })
    }).then(res => {
        return res.json().then
    })
    .then(data => console.log(data))
    .catch(error => console.log('ERROR'))
}


    
    const {register, handleSubmit, errors} = useForm({
            resolver: yupResolver(userSchema),
        });
        const submitForm = (data) => {};
    return (
    <Aux>
        <div className={classes.Display}>
        <form onSubmit={handleSubmit(submitForm)}>
            <input 
            className={classes.inputRegister} 
            name="email"
            type="text"
            placeholder="EMAIL"
            ref={register}
            onChange={((e) => {
                setEmail(e.target.value);
            })}
            >
            </input>
            <p className={classes.errorMessage}>{errors.email?.message}</p>
            <input 
            className={classes.inputRegister} 
            name="userName"
            type="text"
            placeholder="USERNAME"
            ref={register}
            onChange={((e) => {
                setUserName(e.target.value)
                console.log(userName);
            })}
            >
            </input>
            <p className={classes.errorMessage}>{errors.userName?.message}</p>

            <input 
            className={classes.inputRegister}
            name="password"
            type="password"
            placeholder="PASSWORD"
            ref={register}
            onChange={((e) => {
                setPassword(e.target.value);
            })}
            >
            </input>
            <p className={classes.errorMessage}>{errors.password?.message}</p>
            <input 
            className={classes.inputRegister}
            name="confirmPassword"
            type="password"
            placeholder="CONFIRM PASSWORD"
            ref={register}
            >

            </input>
            <p className={classes.errorMessage}>{errors.confirmPassword && "Passwords don't match"}</p>

            <Mui.Button 
            variant = "contained" 
            color = "default" 
            size = "medium" 
            type="submit"
            onClick={SubmitRegisteredUser}
            >Register</Mui.Button>
        </form>
        <div style={{borderTop:"white dotted", width:"100%"}}>

            <Mui.Button 
            href="/"
            variant = "contained" 
            color = "default" 
            size = "medium" >Main Menu</Mui.Button>
        </div>
        </div>
    </Aux>
    )
}

export default Register;