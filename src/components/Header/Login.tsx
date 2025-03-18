import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link, useNavigate } from "react-router-dom";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../../firebase";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';


const Login = () => {

  function notify() {
    toast("User is already created");
  };

  // Using useNavigate hook to navigate to another page using React Router Dom
  const navigate = useNavigate();


  // State for name of the user
  // const [name,setName] = useState("");
  
  // State for email of the user
  const [email,setEmail] = useState("");

  // State for the password of the user
  const [password,setPassword] = useState("");



  // Function to sign in the user
  const signInUser = (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password).then((userSignedIn)=>{
      if(userSignedIn){
        navigate("/");
      }
    })
    .catch((error)=>{
      console.log(error.message);
      toast.error("User is already signed in.");
    })
  };


  // Function to register the user if he / she has no account yet
  const registerUser = (e:React.MouseEvent<HTMLButtonElement>) =>{
    e.preventDefault();
    // This is from firebase that takes 3 arguments, auth and 2 more arguments
    createUserWithEmailAndPassword(auth,email,password).then((userExist)=>{
      if(userExist){
        navigate("/");
      }
    }).catch((error)=> {
      console.log(error,"User is already created.");
      toast.error("User is already created.");
    })
  };



  return (
    <div className="w-full flex flex-col justify-center items-center p-8 sm:p-0">
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
      <Link to="/">
        <img src="/logo.png" alt="amazon-logo" className="w-30 h-30" />
      </Link>
        <form action="" className="w-full sm:w-1/2 lg:w-1/3 space-y-10 shadow-lg border-[1px] p-8">
          <h3 className="text-3xl font-semibold">Sign in</h3>
          {/* <div>
            <label htmlFor="name" className="font-semibold">Name</label>
            <Input type="email" value={name} onChange={(e)=> setName(e.target.value)} />
          </div> */}
          <div>
            <label htmlFor="email" className="font-semibold">E-mail</label>
            <Input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} />
          </div>
          <div>
            <label htmlFor="password" className="font-semibold">Password</label>
            <Input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
          </div>
          <Button onClick={signInUser} className="bg-yellow-600 w-full cursor-pointer" type="submit">
            Sign in
          </Button>
          <p className="text-sm">By continuing, you agree to Amazon's Fake Clone Conditions of Use and Privacy Notice.</p>
          <Button onClick={registerUser} className="bg-gray-300 border-[1px] border-black font-normal w-full cursor-pointer">
            Create Your Amazon Account
          </Button>
        </form>
    </div>
  )
}

export default Login;