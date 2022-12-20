import {
  BaseButton,
  GoggleSignInButton,
  InvertedButton,
} from "./button.styles.jsx";
import { ReactHTMLElement } from "react";
export const Button_Type_Classes = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted",
};

const getButton = (buttonType = Button_Type_Classes.base) =>
  ({
    [Button_Type_Classes.base]: BaseButton,
    [Button_Type_Classes.google]: GoggleSignInButton,
    [Button_Type_Classes.inverted]: InvertedButton,
  }[buttonType]);
type ButtonProps = {
  children: string;
  buttonType: string;
  otherProps: string;
};
const Button = ({ children, buttonType, ...otherprops }: ButtonProps) => {
  const CustomButton = getButton(buttonType);
  return <CustomButton {...otherprops}>{children}</CustomButton>;
};
export default Button;
