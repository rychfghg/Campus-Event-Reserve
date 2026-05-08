import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../../components/AuthLayout";
import { registerUser } from "../services/registerService";

const RegisterPage = () => {

const navigate = useNavigate();

const [form,setForm] = useState({
firstName:"",
lastName:"",
studentId:"",
email:"",
password:"",
confirmPassword:""
});

const [error,setError] = useState("");

const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const handleSubmit = async (e:React.FormEvent)=>{

e.preventDefault();

if(form.password !== form.confirmPassword){
setError("Passwords do not match");
return;
}

try{

await registerUser({
  firstName: form.firstName,
  lastName: form.lastName,
  studentId: form.studentId,
  email: form.email,
  password: form.password
});

navigate("/");

}catch(err:any){

if(err.response){
setError(err.response.data);
}else{
setError("Registration failed");
}

}

};

return(

<AuthLayout>

<div className="auth-card">

<h2>Create account</h2>

{error && <div className="error">{error}</div>}

<form onSubmit={handleSubmit}>

<input name="firstName" placeholder="First Name" required onChange={handleChange}/>
<input name="lastName" placeholder="Last Name" required onChange={handleChange}/>
<input name="studentId" placeholder="Student ID" required onChange={handleChange}/>
<input type="email" name="email" placeholder="Email" required onChange={handleChange}/>
<input type="password" name="password" placeholder="Password" required onChange={handleChange}/>
<input type="password" name="confirmPassword" placeholder="Confirm Password" required onChange={handleChange}/>

<button>Create Account</button>

</form>

<div className="link">
<Link to="/">Back to Login</Link>
</div>

</div>

</AuthLayout>

);

};

export default RegisterPage;