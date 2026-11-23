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

<<<<<<< HEAD
<div>
<h2>Create your account</h2>
<p className="auth-subtitle">Join with your student details to start booking.</p>
</div>

{error && <div className="form-error">{typeof error === "string" ? error : "Registration failed"}</div>}

<form className="auth-form" onSubmit={handleSubmit}>

<div className="field-row">
<div className="field">
<label htmlFor="reg-first">First name</label>
<input id="reg-first" name="firstName" placeholder="Juan" required onChange={handleChange}/>
</div>
<div className="field">
<label htmlFor="reg-last">Last name</label>
<input id="reg-last" name="lastName" placeholder="Dela Cruz" required onChange={handleChange}/>
</div>
</div>

<div className="field">
<label htmlFor="reg-sid">Student ID</label>
<input id="reg-sid" name="studentId" placeholder="2026-00123" required onChange={handleChange}/>
</div>

<div className="field">
<label htmlFor="reg-email">School email</label>
<input id="reg-email" type="email" name="email" placeholder="you@school.edu" required onChange={handleChange}/>
</div>

<div className="field-row">
<div className="field">
<label htmlFor="reg-pass">Password</label>
<input id="reg-pass" type="password" name="password" placeholder="••••••••" required onChange={handleChange}/>
</div>
<div className="field">
<label htmlFor="reg-confirm">Confirm password</label>
<input id="reg-confirm" type="password" name="confirmPassword" placeholder="••••••••" required onChange={handleChange}/>
</div>
</div>

<button className="primary-btn" type="submit">Create account</button>

</form>

<div className="auth-alt">
Already have an account?
<Link to="/">Sign in</Link>
=======
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
>>>>>>> origin/main
</div>

</div>

</AuthLayout>

);

};

export default RegisterPage;