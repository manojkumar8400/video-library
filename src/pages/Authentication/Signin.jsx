import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Auth.css";

export const Signin = () => {

    const [visibility, setVisibility] = useState(true);

    return (
        <form className='signin-container grid gap-16'>
            <section>
                <img className='signin-img' src="./assets/Sign-in.svg" alt="Sign in" />
            </section>
            <section className='flex-center'>
                <div className='signin-card grid gap-16 p-16'>
                    <h3 className='m-auto'>SignIn</h3>
                    <label className='input-label flex-column'>
                        Enter Email Address
                        <input className='input-text' type="text" placeholder='abc@gmail.com' />
                    </label>
                    <label className='input-label flex-column relative' >
                        Enter Password
                        <input className='input-password' type={visibility ? "password" : "text"} placeholder='********' />
                        {
                            visibility
                                ? <span onClick={_ => setVisibility(visibility ? false : true)} class="material-icons visibility-off c-pointer absolute">visibility_off</span>
                                : <span onClick={_ => setVisibility(visibility ? false : true)} class="material-icons visibility-off c-pointer absolute">visibility</span>
                        }
                    </label>
                    <section className='flex justify-between'>
                        <label className='checkbox-label'>
                            <input className='checkbox-input' type="checkbox" />
                            Remember me
                        </label>
                        <Link to="/signin" className='forget-password'>forget password?</Link>
                    </section>
                    <section className='grid gap-8'>
                        <button className='signin'>Signin</button>
                        <button className='signin'>Signin as a guest</button>
                        <Link to="/signup" className='fs text-align m-auto'>Go for SignUp</Link>
                    </section>
                </div>
            </section>
        </form>
    )
}
