import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import '../stylesheets/RegistrationPage2.css'
import peopleWorking from "../assets/peopleWorking.png"
const loginLink = "/Login";

//Sign up function allows the user to set up their name(first and last),
//their number, email, and password for their new account
function RegistrationPage() {
  const [showForm, setShowForm] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("First Name is required"),
    lname: Yup.string().required("Last name is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  // Sends data to db if sign up credentials are proper
  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:4000/register", data); //sends data to db
      console.log("User Registered Successfully");
      setShowForm(false); //hides form and shows validation for registering
    } catch (error) {
      if (error.response.status == 400) {
        setShowMessage(true); //tells user email is already being used
      }
      console.log(error.response);
      console.log("Error registering user:", error);
    }
  };

  return (
    <>
    <div className="regContainer">

    <div className="leftContainer">
        <div className="centered-element">
            <img src={peopleWorking} width="500" height="500"></img>
            <h3>Scheduling Assisstant - </h3>
            <h3>Simplify Your Life</h3>
            <h8>All your tasks and preferences in one place</h8>
        </div>
    </div>

    <div className="rightContainer">
        <div className="centered-element">
            <div className="row justify-content-center align-items-center">
                <form
                className="border rounded"
                onSubmit={handleSubmit(onSubmit)}
                id="signupform"
                >
                <h2>Sign Up</h2>
                <br />
                <div className="mb-3">
                    <label for="fname" className="form-label">
                    First Name
                    </label>
                    <input
                    type="text"
                    name="fname"
                    autocomplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("fname")}
                    className={`form-control ${errors.fname ? "is-invalid" : ""}`}
                    id="fname"
                    />
                    <div className="invalid-feedback">{errors.fname?.message}</div>
                </div>

                <div className="mb-3">
                    <label for="lname" className="form-label">
                    Last Name
                    </label>
                    <input
                    type="text"
                    name="lname"
                    autocomplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("lname")}
                    className={`form-control ${errors.lname ? "is-invalid" : ""}`}
                    id="lname"
                    />
                    <div className="invalid-feedback">{errors.lname?.message}</div>
                </div>

                <div className="mb-3">
                    <label for="email" className="form-label">
                    Email address
                    </label>
                    <input
                    type="email"
                    name="email"
                    autocomplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("email")}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    id="email"
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                    {/* <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                    </div> */}
                </div>

                <div className="mb-3">
                    <label for="password" className="form-label">
                    Password
                    </label>
                    <input
                    type="password"
                    name="password"
                    autocomplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("password")}
                    className={`form-control ${
                        errors.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    />
                    <div className="invalid-feedback">
                    {errors.password?.message}
                    </div>
                </div>

                <div className="mb-3">
                    <label for="password2" className="form-label">
                    Confirm Password
                    </label>
                    <input
                    type="password"
                    name="password2"
                    autocomplete="off"
                    style={{ textAlign: 'center' }}
                    {...register("password2")}
                    className={`form-control ${
                        errors.password2 ? "is-invalid" : ""
                    }`}
                    id="password2"
                    />
                    <div className="invalid-feedback">
                    {errors.password2?.message}
                    </div>
                </div>

                <button type="submit" className="btn btn-primary mr-1">
                    Sign Up
                </button>
                <button
                    type="button"
                    onClick={() => reset()}
                    className="btn btn-secondary"
                >
                    Reset
                </button>
                <div>
                    Have an account already?
                    <Link to="/" style={{ textDecoration: 'none' }}><p style={{ textDecorationLine: "none" }}>Login</p></Link>
                </div>
                </form>
            </div>
        </div>
      </div>
      </div>
    </>
  );
}

export default RegistrationPage;