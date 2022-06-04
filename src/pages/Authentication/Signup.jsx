import React from 'react';
import { Link } from 'react-router-dom';
import "./Auth.css";

export const Signup = () => {

    return (
        <form className='signin-container grid gap-16'>
            <section>
                <img className='signin-img' src="./assets/Sign-in.svg" alt="Sign in" />
            </section>
            <section className='flex-center'>
                <div className='signin-card grid gap-16 p-16'>
                    <h3 className='m-auto'>SignUp</h3>
                    <label className='input-label flex-column'>
                        Enter First Name
                        <input className='input-text' type="text" placeholder='Manoj' />
                    </label>
                    <label className='input-label flex-column'>
                        Enter Last Name
                        <input className='input-text' type="text" placeholder='Kumar' />
                    </label>
                    <label className='input-label flex-column'>
                        Enter Email Address
                        <input className='input-text' type="text" placeholder='abc@gmail.com' />
                    </label>
                    <label className='input-label flex-column'>
                        Enter Password
                        <input className='input-text' type="password" placeholder='********' />
                    </label>
                    <label className='input-label flex-column'>
                        Enter Confirm Password
                        <input className='input-text' type="password" placeholder='********' />
                    </label>
                    <label className='checkbox-label'>
                        <input className='checkbox-input' type="checkbox" />
                        I accept all terms & conditions
                    </label>
                    <section className='grid gap-8'>
                        <button className='signin'>SignUp</button>
                        <span className='m-auto'>
                            Already a member?
                            <Link to="/signin" className='fs text-align m-auto'> Signin</Link>
                        </span>
                    </section>
                </div>
            </section>
        </form>
    )
}
