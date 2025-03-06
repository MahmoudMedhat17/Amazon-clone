import {Routes, Route} from "react-router-dom";
import Header from "./components/Header/Header";
import Login from "./components/Header/Login";


const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Header/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="*" element={<h1 className="">Page is not found</h1>}/>
      </Routes>
    </div>
  )
}

export default App;