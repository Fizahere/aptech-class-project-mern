import axios from "axios";
import { useFormik } from "formik";
import './CustomForm.css'

const CustomForm = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      async function send_data() {
        try {
          const response = await axios.post(
            "http://localhost:5000/api/auth/login",
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
        "http://localhost:5000/api/auth/protected",
        {
          headers: {
            Authorization: token,
          },
        }
      );
      alert(JSON.stringify(response.data));
    } catch (error) {
      alert(JSON.stringify(error.message));
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
          placeholder="email**"
          onChange={formik.handleChange}
          value={formik.values.username}
          className="input"
        />
        <input
          type="password"
          name="password"
          placeholder="password**"
          onChange={formik.handleChange}
          value={formik.values.password}
          className="input"
        />
        <input className="button" type="submit" value={"Sign In"} />
        </div>
      </form>

      <button className="check-if-login-btn" onClick={check_login}>Check Login Status</button>
    </div>
  );
};


export default CustomForm;