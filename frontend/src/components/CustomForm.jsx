import axios from "axios";
import { useFormik } from "formik";
import './CustomForm.css';
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const CustomForm = () => {
  const [showPassword,setShowPassword]=useState(false)
  const [message,setMessagae]=useState('')
  const toglePasswordIcon=()=>{
    setShowPassword(showPassword?false:true)
  }
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validate: (values) => {
      const errors = {};
      const token = localStorage.getItem("token");
if(!token){
  setMessagae("")

      if (!values.username) {
        errors.username = "username is required.";
      }
      if (!values.password) {
        errors.password = "password is required.";
      } else if (
        !/^[A-Za-z0-9]{5,}$/i.test(values.password)
      ) {
        errors.password =
          "password must be at least 5 charpcters long.";
      }
      return errors;
    }
    setMessagae("you're already loggedin.")
    },
    onSubmit: (values) => {
      async function send_data() {
        try {
          const response = await axios.post(
            "http://localhost:2000/api/auth/login",
            values
          );
          localStorage.setItem("token", response.data.token);
        } catch (error) {
          console.log(error.message);
        }
      }
      send_data();
    },
  });

  async function check_login() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:2000/api/auth/protected",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMessagae(JSON.stringify(response.data))
    } catch (error) {
      setMessagae(JSON.stringify(error.message))
    }
  }

  return (
    <div className="container">
      <h2 className="heading">Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form">
          <input
            type="text"
            name="username"
            placeholder="username**"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            className={formik.touched.username && formik.errors.username ?'err_input':'input'}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="error">{formik.errors.username}</div>
          ) : null}
          <div className="password-field">
          <input
            type={showPassword?"password":"text"}
            name="password"
            placeholder={"password**" }
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={formik.touched.password && formik.errors.password ?'err_input pass':'input pass'}
          />
          <i className="icon">{showPassword?<IoMdEyeOff onClick={toglePasswordIcon}/>:<IoMdEye onClick={toglePasswordIcon}/>}</i>
          </div>
          {formik.touched.password && formik.errors.password ? (
            <div className="error">{formik.errors.password}</div>
          ) : null}
          <input className="button" type="submit" value="Sign In" />
        </div>
      </form>
      <button className="check-if-login-btn" onClick={check_login}>
        Check Login Status
      </button>
      <div className="message-field">{message}</div>
    </div>
  );
};

export default CustomForm;
