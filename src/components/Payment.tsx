import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import {RootState} from "@/store/store";
import { decreaseQuantity, deleteItem, increaseQuantity } from "@/store/features/GlobalState";
import { CirclePlus, Trash } from "lucide-react";

const Payment = () => {

    const cartItems = useSelector((state:RootState)=>state.global.cart);
    const user = useSelector((state:RootState)=> state.global.user);
    const dispatch = useDispatch();
    // I used reduce function here to loop around the array "cartItems" and calculate the total price of the products in the cart without the need to map over the whole array to get the total price of the products.
    const orderTotal = cartItems.reduce((total, item)=> total + item.totalPrice,0);

  return (
    <div>
        <h3 className="bg-[#f3f4f4] p-2 text-xl sm:text-3xl flex justify-center items-center gap-2">Checkout <span><Link to="/checkout">({cartItems.length} items)</Link></span></h3>
        <div className="bg-white">
            <div className="p-4 sm:p-8">
                {/* Delivery address */}
                <div className="border-b-2">
                    <div className="flex flex-col sm:flex-row sm:gap-30 my-4 sm:my-10">
                        <h3 className="font-bold text-base">Delivery Address</h3>
                        <div className="">
                            <p>{user? user.email : "Guest"}</p>
                            <p>Giza, EG</p>
                        </div>
                    </div>
                </div>
                {/* Review items and delivery */}
                <div className="border-b-2">
                    <div className="flex flex-col sm:flex-row sm:gap-30 my-4 sm:my-10">
                        <h3 className="font-bold text-base my-4">Review items</h3>
                        {
                        cartItems.map((item)=>(
                            <div key={item.id}>
                                <div className="flex justify-between gap-4">
                                  <img src={item.image} alt={item.title} className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 max-h-[300px]"/>
                                  <div className="flex flex-col space-y-4 mb-8">
                                    <p className="text-sm">{item.category}</p>
                                    <h3 className="font-semibold">{item.title}</h3>
                                    <p className="text-sm max-w-[500px]">{item.description}</p>
                                    <div className="flex items-center gap-4">
                                      <div className="flex gap-4 border-2 border-yellow-500 md:p-1 rounded-full">
                                        <Button onClick={()=> {
                                          dispatch(decreaseQuantity(item.id));
                                          console.log(item.id, "Item is removed!");
                                        }} variant="ghost" className="cursor-pointer hover:bg-transparent">
                                          <Trash/>
                                        </Button>
                                        <span className="text-xl">{item.quantity}</span>
                                        <Button onClick={()=>{
                                          dispatch(increaseQuantity(item.id));
                                          console.log(item.id, "Item is increased!!");
                                        }} variant="ghost" className="cursor-pointer hover:bg-transparent text-2xl">
                                          <CirclePlus/>
                                        </Button>
                                      </div>
                                      <span>
                                        |
                                      </span>
                                      <Button onClick={()=> dispatch(deleteItem(item.id))} variant="ghost" className="text-base text-blue-600 cursor-pointer hover:text-blue-400 duration-200">Delete</Button>
                                    </div>
                                  </div>
                                  <div>
                                    <h3 className="font-bold text-sm md:text-base lg:text-xl">${Math.ceil(item.price)}</h3>
                                  </div>
                                </div>
                            </div>
                          ))
                        }
                    </div>
                </div>
                {/* Payment method */}
                <div className="border-b-2">
                    <div className="flex flex-col sm:flex-row sm:gap-30 my-4 sm:my-10">
                        <h3 className="font-bold text-base my-4">Payment Method</h3>
                        <div className="space-y-4">
                            <p>Credit Card No:</p>
                            <p className="font-bold">Order Total: ${Math.floor(orderTotal)}</p>
                            <Button variant="ghost" className="w-full bg-yellow-600 hover:bg-yellow-500 duration-200 !text-white  rounded-sm cursor-pointer">
                                Buy Now
                            </Button>
                            <Link to="/checkout">
                                <Button variant="ghost" className="w-full bg-red-600 hover:bg-red-500 duration-200 !text-white  rounded-sm cursor-pointer">
                                    Go to cart
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment;