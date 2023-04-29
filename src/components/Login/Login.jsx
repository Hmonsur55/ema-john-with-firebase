import React, { useContext } from 'react';
import Lottie from "lottie-react";
import google from '../../assets/google.json'
import { useState } from 'react';
import { authContext } from '../Provider/AuthProvider';
import app from '../../firebase/firebase.config';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
    const {signIn} = useContext(authContext)
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [show, setShow] = useState(false)
    // for redirect location check 29
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || '/'

    const loginHandle = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password)

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                form.reset()
                navigate(from, {replace:true})
                setSuccess('Login Successfully')
            }).catch(error => {
            setError(error.message)
        })
    }
    return (
      <div>
        <div className="hero min-h-screen bg-base-200">
          <div className="hero-content flex-col">
            <div className="text-center">
              <h1 className="text-3xl font-bold">Login now!</h1>
            </div>
            <div className="card flex-shrink-0 shadow-2xl bg-base-100">
              <form onSubmit={loginHandle} className="card-body ">
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
                    type={show ? "text" : "password"}
                    placeholder="password"
                    className="input input-bordered"
                    name="password"
                    required
                  />
                  <p className="cursor-pointer" onClick={() => setShow(!show)}>
                    <small>{show ? "Hide Password" : "Show Password"}</small>
                  </p>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </form>
              <div>
                  <p className="mt-1">
                    New in Ema-John
                    <Link
                      to="/signup"
                      className="btn btn-link capitalize text-warning"
                    >
                      Create New Account
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
    );
};

export default Login;