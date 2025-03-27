import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Trash, CirclePlus } from "lucide-react";

const Checkout = () => {

  const cartItems = useSelector((state:RootState)=> state.global.cart);


  return (
    <div className="p-4">
      <div className="bg-[#f3f4f4] p-4">
        <div className="border-b-2">
          <h1 className="text-2xl font-medium">Shopping Cart</h1>
          <div className="flex justify-end items-end w-full">
          <p className="text-gray-500 font-semibold">Price</p>
          </div>
        </div>
      </div>
      <div className="bg-[#f3f4f4] border-b-2">
        <div className="p-4">
          {
            cartItems.length === 0 ? 
            <div className="flex flex-col justify-center items-center space-y-4">
              <img src="/empty-cart.svg" alt="EmptyCart" className="w-32 sm:w-52 md:w-72 mx-auto"/>
              <h2 className="text-xl font-semibold">Cart is Empty...</h2>
            </div>
            :
            cartItems.map((item)=>(
              <div key={item.id} className="mb-20">
                  <div className="flex justify-between gap-4 border-b-2">
                    <img src={item.image} alt={item.title} className="w-20 h-20 sm:w-32 sm:h-32 md:w-40 md:h-40 max-h-[300px]"/>
                    <div className="flex flex-col space-y-4 mb-8">
                      <p className="text-sm">{item.category}</p>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm max-w-[500px]">{item.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-4 border-2 border-yellow-500 md:p-1 rounded-full">
                          <Button variant="ghost" className="cursor-pointer hover:bg-transparent">
                            <Trash/>
                          </Button>
                          <span className="text-xl">{item.quantity}</span>
                          <Button variant="ghost" className="cursor-pointer hover:bg-transparent text-2xl">
                            <CirclePlus/>
                          </Button>
                        </div>
                        <span>
                          |
                        </span>
                        <p className="text-sm text-blue-600 cursor-pointer hover:text-blue-400 duration-200">Delete</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-sm md:text-base lg:text-xl">${item.price}</h3>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <h3 className="font-semibold md:text-xl">Subtotal ({item.quantity} item): <span className="font-bold">${item.price}</span></h3>
                  </div>
              </div>
            ))
          }
        </div>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Checkout;