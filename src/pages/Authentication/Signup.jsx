import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { postSignup } from '../../app/slice/authSlice';
import { SignupValidation } from '../../utils/ValidationChecker';
import "./Auth.css";

export const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({ isError: true });
    const [userDetail, setUserDetail] = useState({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmpassword: ""
    });
    const signupDispatch = useDispatch();

    useEffect(() => {
        if (!error.isError) {
            signupDispatch(postSignup(userDetail))
        };
    }, [error]);

    const inputHandler = (e) => {
        const { name, value } = e;
        setUserDetail({ ...userDetail, [name]: value });
    };

    const signupHandler = () => {
        const error = SignupValidation(userDetail);
        setError(error);
    };

    return (
        <main className='signin-container grid gap-16'>
            <section>
                <img className='signin-img' src="./assets/Sign-in.svg" alt="Sign in" />
            </section>
            <form onSubmit={(e) => e.preventDefault()} className='flex-center'>
                <div className='signin-card grid gap-16 p-16'>
                    <h3 className='m-auto'>SignUp</h3>
                    <label className='input-label flex-column'>
                        Enter First Name
                        <input
                            onChange={e => inputHandler(e.target)}
                            name="firstname"
                            value={userDetail.firstname}
                            className='input-text'
                            type="text"
                            required
                            placeholder='Manoj'
                        />
                    </label>
                    <label className='input-label flex-column'>
                        Enter Last Name
                        <input
                            onChange={e => inputHandler(e.target)}
                            name="lastname"
                            value={userDetail.lastname}
                            className='input-text'
                            type="text"
                            required
                            placeholder='Kumar'
                        />
                    </label>
                    <label className='input-label flex-column'>
                        Enter Email Address
                        <input
                            onChange={e => inputHandler(e.target)}
                            name="email"
                            value={userDetail.email}
                            className={`input-text ${error.email && "wrong-information"}`}
                            type="text"
                            required
                            placeholder='abc@gmail.com'
                        />
                    </label>
                    <label className='input-label flex-column'>
                        Enter Password
                        <input
                            onChange={e => inputHandler(e.target)}
                            name="password"
                            value={userDetail.password}
                            className={`input-text ${error.password && "wrong-information"}`}
                            type="password"
                            required
                            placeholder='********'
                        />
                    </label>
                    <label className='input-label flex-column'>
                        Enter Confirm Password
                        <input
                            onChange={e => inputHandler(e.target)}
                            name="confirmpassword"
                            value={userDetail.confirmpassword}
                            className={`input-text ${error.confirmpassword && "wrong-information"}`}
                            type="password"
                            required
                            placeholder='********'
                        />
                    </label>
                    <label className='checkbox-label'>
                        <input className='checkbox-input' type="checkbox" />
                        I accept all terms & conditions
                    </label>
                    <section className='grid gap-8'>
                        <button
                            onClick={signupHandler}
                            className='signin'>
                            Create New Account
                        </button>
                        <span className='m-auto'>
                            Already a member?
                            <Link to="/login" className='fs text-align m-auto'> Signin</Link>
                        </span>
                    </section>
                </div>
            </form>
        </main>
    )
}
