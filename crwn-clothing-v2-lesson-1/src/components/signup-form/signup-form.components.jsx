import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utilities";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.componenets";
import { signUpStart } from "../../store/user/user.Action";
// import { useContext } from "react";
// import { Usercontext } from "../../contexts/user.contexts";
const defaultFormFields = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUP = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { username, email, password, confirmPassword } = formFields;
  // const { setCurrentUser } = useContext(Usercontext);
  const dispatch = useDispatch();
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password does not match");
      return;
    }
    try {
      dispatch(signUpStart(email, password, username));
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create account,user email already in use");
      } else {
        console.log("error encountered on creation of account", error);
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2 className="">Don't have an account?</h2>
      <span>sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="username"
          type="text"
          required
          onChange={handleChange}
          name="username"
          value={username}
        />
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <FormInput
          label="Confirm Password"
          type="password"
          required
          name="confirmPassword"
          onChange={handleChange}
          value={confirmPassword}
        />
        <Button type="submit">sign up</Button>
      </form>
    </div>
  );
};
export default SignUP;
