import { Route, Routes } from 'react-router';
import Login from "./components/Header/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "./store/features/GlobalState";
import {auth} from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import Layout from './Layout';
import Home from "./components/Home/Home";
import Checkout from "./components/Checkout";
import Error from './components/Error';

const App = () => {


  // Dispatch to fire the actions stored in redux store
  const dispatch = useDispatch();
  
  // UseEffect to handle the users signed in inside the site
  useEffect(()=>{
    // onAuthStateChanged checks if the user is signed in or not and if he / she is signed in then dispatch the user email so i can display it inside the site
    const checkEmailExists = onAuthStateChanged(auth,(user)=>{
      if(user){
        dispatch(setUser({
          email:user.email
        }));
      }
      // If the user is not signed in then don't return the user email
      else{
        dispatch(setUser(null));
      }
      return ()=> checkEmailExists();
    })
  },[dispatch]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="*" element={<Error/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;