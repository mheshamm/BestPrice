import React, { Fragment, useState, useEffect } from 'react'

import MetaData from './layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors } from '../actions/auth'

const Register = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    

    const alert = useAlert();
    const dispatch = useDispatch();

    const { isAuth, error, loading } = useSelector(state => state.auth);

    useEffect(() => {

        if (isAuth) {
            history.push('/')
        }

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

    }, [dispatch, alert, isAuth, error, history])

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(register(name , email, password))
        console.log(name , email , password)
    }

    

    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                <div className="logHeader reghead">

<h1 className="mb-3">Register</h1>
</div>
                    <form className="shadow-lg" onSubmit={submitHandler} >
                        

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        
                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block sans"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Register