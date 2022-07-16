import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { postLogin } from '../../app/slice/authSlice';
import { LoginValidation } from '../../utils/ValidationChecker';
import "./Auth.css";

export const Login = () => {


    const [visibility, setVisibility] = useState(true);
    const [error, setError] = useState({ isError: true })
    const [loginDetail, setLoginDetail] = useState({
        email: "",
        password: ""
    });
    const { status, user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!error.isError) {
            dispatch(postLogin(loginDetail))
        }
    }, [error]);

    let path = "/login";

    if (location.state !== null) {
        path = location.state.from.pathname
    };

    useEffect(() => {
        if (user) {
            navigate(path)
        }
    }, [user, status]);

    const inputHandler = (e) => {
        const { name, value } = e;
        setLoginDetail({ ...loginDetail, [name]: value })
    };

    const loginHandler = () => {
        const error = LoginValidation(loginDetail);
        setError(error)
    };

    return (
        <main className='signin-container grid gap-16'>
            <section>
                <img className='signin-img' src="./assets/Sign-in.svg" alt="Sign in" />
            </section>
            <form onSubmit={e => e.preventDefault()} className='flex-center'>
                <div className='signin-card grid gap-16 p-16'>
                    <h3 className='m-auto'>Login</h3>
                    <label className='input-label flex-column'>
                        Enter Email Address
                        <input
                            onChange={e => inputHandler(e.target)}
                            className={`input-text ${error.email && "wrong-information"}`}
                            value={loginDetail.email}
                            type="text"
                            name="email"
                            required
                            placeholder='abc@gmail.com'
                        />
                    </label>
                    <label className='input-label flex-column relative' >
                        Enter Password
                        <input
                            onChange={e => inputHandler(e.target)}
                            className={`input-password ${error.password && "wrong-information" }`}
                            value={loginDetail.password}
                            type={visibility ? "password" : "text"}
                            name="password"
                            required
                            placeholder='********'
                        />
                        {
                            visibility
                                ? <span onClick={_ => setVisibility(visibility ? false : true)}
                                    className="material-icons visibility-off c-pointer absolute">
                                    visibility_off
                                </span>
                                : <span onClick={_ => setVisibility(visibility ? false : true)}
                                    className="material-icons visibility-off c-pointer absolute">
                                    visibility
                                </span>
                        }
                    </label>
                    <section className='flex justify-between'>
                        <label className='checkbox-label'>
                            <input className='checkbox-input' type="checkbox" />
                            Remember me
                        </label>
                        <Link to="/login" className='forget-password'>forget password?</Link>
                    </section>
                    <section className='grid gap-8'>
                        <button
                            onClick={loginHandler}
                            className='login-btn'>
                            Login
                        </button>

                        <button
                            onClick={() => {
                                setError({ isError: false });
                                setLoginDetail({
                                    email: "manojkumar@gmail.com",
                                    password: "manoj@12"
                                })
                            }}
                            className='login-btn'>
                            Login as a guest
                        </button>

                        <Link to="/signup" className='fs text-align m-auto'>Go for SignUp</Link>
                    </section>
                </div>
            </form>
        </main>
    )
}
