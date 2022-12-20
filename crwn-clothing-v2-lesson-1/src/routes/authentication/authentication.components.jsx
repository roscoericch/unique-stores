import SignUP from "../../components/signup-form/signup-form.components";
import SignIn from "../../components/signin-form/signin-form.components";
import "./authentication.styles.scss";
const Authentication = () => {
  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>Sign in with Google</button> */}
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with GoogleRedirect{" "}
      </button> */}
      <SignIn />
      <SignUP />
    </div>
  );
};
export default Authentication;
