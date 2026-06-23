 import Template from "../Components/core/Auth/Template";
import loginImg from "../assets/Images/login.webp"
export default function Login() {
  return (
      <Template title={"Welcome Back"} description1={"Build skills for today, tommarrow, and beyond"} description2={"Educate to future-proof your career"}
        image = {loginImg} formtype = {"login"}>

      </Template>
  )
}


