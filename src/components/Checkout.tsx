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
            cartItems.map((item)=>(
              <div key={item.id}>
                  <div className="flex justify-between gap-4 border-b-2">
                    <img src={item.image} alt={item.title} className="w-32 md:w-40 max-h-[300px]"/>
                    <div className="flex flex-col space-y-4">
                      <p className="text-sm">{item.category}</p>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm">{item.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex gap-4 border-2 border-yellow-500 p-2 rounded-full">
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
                      <h3 className="font-bold text-xl">${item.price}</h3>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <h3 className="font-semibold text-xl">Subtotal ({item.quantity} item): <span className="font-bold">${item.price}</span></h3>
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