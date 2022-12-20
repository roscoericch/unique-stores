import { useState, useContext } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utilities";
import { useDispatch } from "react-redux";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.Action";
import FormInput from "../form-input/form-input.component";
import { Usercontext } from "../../contexts/user.contexts";
import "./sign-in-form.styles.scss";
import Button, { Button_Type_Classes } from "../button/button.componenets";
const defaultFormFields = {
  email: "",
  password: "",
};
const SignIn = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const { setCurrentUser } = useContext(Usercontext);
  const dispatch = useDispatch();

  // console.log(formFields);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const SignInWithGoogle = async () => {
    dispatch(googleSignInStart());
    // const { user } = await signInWithGooglePopup();
    // await createUserDocumentFromAuth(user);
    // setCurrentUser(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      dispatch(emailSignInStart(email, password));
      // await signInAuthUserWithEmailAndPassword(email, password);
      // setCurrentUser(user);
      // console.log(user);
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email");
          break;
        case "auth/user-not-found":
          alert("No user associated with this email address");
          break;
        default:
          console.log(error);
          break;
      }
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2 className="">Already have an account?</h2>
      <span>sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
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
        <div className="buttons-container">
          <Button type="submit" buttonType={Button_Type_Classes.base}>
            sign In
          </Button>
          <Button
            type="button"
            buttonType={Button_Type_Classes.google}
            onClick={SignInWithGoogle}
          >
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignIn;
