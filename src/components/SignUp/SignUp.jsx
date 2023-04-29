import React from 'react';
import './SignUp.css'
import Lottie from "lottie-react";
import google from "../../assets/google.json";
import { useState } from 'react';
import { useContext } from 'react';
import { authContext } from '../Provider/AuthProvider';
import { Link } from 'react-router-dom';
const SignUp = () => {

    const [error, setError] = useState("");
    const [success, setSuccess] = useState('')
    const {createUser} = useContext(authContext)

    const signUpHandle = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(name, email, password, confirm)
        setError('')
        setSuccess('')
        
        if (password !== confirm) {
            setError('Your password did not match')
            return
        }
        else if (password.length < 6) {
            setError('Your password should be at least 6')
            return
        }
        createUser(email, password)
            .then(result => {
                const loggedUser = result.user
                setSuccess('User has been create successfully')
            }).catch(error => {
                setError(error.message)
            })
    }


    return (
      <div>
        <div>
          <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col">
              <div className="text-center">
                <h1 className="text-3xl font-bold">Sign up</h1>
              </div>
              <div className="card flex-shrink-0 shadow-2xl bg-base-100 w-[500px]">
                <form onSubmit={signUpHandle} className="card-body ">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Name</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Type Your Name"
                      className="input input-bordered"
                      name="name"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      type="email"
                      placeholder="email"
                      className="input input-bordered"
                      name="email"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="password"
                      className="input input-bordered"
                      name="password"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Confirm Password</span>
                    </label>
                    <input
                      type="password"
                      placeholder="Confirm password"
                      className="input input-bordered"
                      name="confirm"
                      required
                    />
                  </div>
                  <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign up</button>
                  </div>
                </form>
                <div>
                  <p className="mt-1 text-center">
                    Have an Account
                    <Link
                      to="/login"
                      className="btn btn-link capitalize text-warning"
                    >
                      Login
                    </Link>
                  </p>
                  <p className="text-red-600 text-center">{error}</p>
                  <p className="text-green-600 text-center">{success}</p>
                </div>
                <div className="text-center flex flex-col justify-center items-center">
                  <span className="my-1">Or</span>
                  <button className="w-[90px] shadow">
                    <Lottie animationData={google} loop={true} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default SignUp;