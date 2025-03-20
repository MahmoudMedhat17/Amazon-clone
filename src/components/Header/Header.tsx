import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react';
import { Link } from "react-router-dom";
import { Menu } from 'lucide-react';
import {Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import { ShoppingCart } from 'lucide-react';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {signOut} from "firebase/auth";
import {auth} from "../../../firebase";
import { toast } from 'react-toastify';



const Header = () => {
  const user = useSelector((state:RootState)=> state.global.user);
  const cartItems = useSelector((state: RootState)=> state.global.cart);
  const totalQuantity = cartItems.reduce((total,item)=> total + item.quantity,0);

  function notify() {
    toast("User is already created");
  };


  const checkSignOut = () =>{
    if(user){
    signOut(auth).then(()=>{
      toast("User sign out successfully.");
    })
    }
  };

  return (
    <header className="h-20 flex items-center bg-gray-950 px-4 sm:px-10">
      <nav className="flex items-center gap-2 w-full">
        <Link to="/">
          <img src="/logo.png" alt="amazon-logo" className="w-20 sm:w-24 md:w-32 cursor-pointer"/>
        </Link>
        <div className="flex flex-1">
          <Input className="bg-white rounded-none"/>
          <Button className="bg-yellow-500 rounded-none cursor-pointer">
            <Search/>
          </Button>
        </div>
        <div className="hidden sm:flex gap-4 items-center">
          <Link to={user ? "/" : "/login"}>
            <div onClick={checkSignOut} className="flex flex-col max-w-[200px]">
              <span className="text-white">Hello, {user ? `${user.email}` : "Guest"}</span>
              <span className="font-bold text-white">{user ? "Sign out" : "Sign in"}</span>
            </div>
          </Link>
          <Link to="/orders">
            <div className="flex flex-col">
              <span className="text-white">Returns</span>
              <span className="text-white font-bold">& Orders</span>
            </div>
          </Link>
          <Link to="/checkout">
            <div className="text-white flex gap-2">
              <span className="text-white"><ShoppingCart size={30}/></span>
              <span className="font-bold text-white">{totalQuantity}</span>
            </div>
          </Link>
        </div>
        <div className="flex sm:hidden">
          <Sheet>
            <SheetTrigger><Menu className="text-white cursor-pointer"/></SheetTrigger>
            <SheetContent className="bg-gray-950">
              <SheetHeader>
                <SheetTitle className="hidden">Are you absolutely sure?</SheetTitle>
                <div className="flex flex-col gap-4 items-center">
                  <Link to="/login">
                  <div className="flex flex-col">
                    <span className="text-white">Hello, Guest</span>
                    <span className="font-bold text-white">Sign in</span>
                  </div>
                  </Link>
                  <Link to="/orders">
                  <div className="flex flex-col">
                    <span className="text-white">Returns</span>
                    <span className="text-white font-bold">& Orders</span>
                  </div>
                  </Link>
                  <Link to="/cart">
                  <div className="text-white flex gap-2">
                    <span className="text-white"><ShoppingCart size={30}/></span>
                    <span className="font-bold text-white">{totalQuantity}</span>
                  </div>
                  </Link>
                </div>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  )
}

export default Header;