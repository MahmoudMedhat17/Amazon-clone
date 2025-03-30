import { fetchData } from "@/lib/fetchData";
import { Button } from "../ui/button";
import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { purchaseItem } from "@/store/features/GlobalState";
import { toast } from "react-toastify";


interface Productsprops{
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
};


const Electronicsproducts = () => {

    const [products,setProducts] = useState<any[]>([]);
    const cartItems = useSelector((state:RootState)=>state.global.cart);
    const dispatch = useDispatch();

    


    useEffect(()=>{
        try {
            const responseData = async()=>{
                const electronticsData = await fetchData("https://fakestoreapi.com/products/category/electronics");
                setProducts(electronticsData);
            }
            responseData();
        } catch (error) {
            console.log(error);
            throw new Error("Something went wrong!");
        }
    },[products]);


    const addProducts = (product:Productsprops) =>{
        dispatch(purchaseItem(product));
        toast.success("Product is added to the cart!");
        console.log(cartItems.length);
        console.log(cartItems);
    };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 px-10 py-20">
        {
            products.map((product: Productsprops)=>(
                <div className="bg-white h-full rounded-md p-6 shadow-2xl hover:scale-105 duration-300" key={product.title}>
                    <div className="h-full flex flex-col justify-between space-y-4">
                        <small className="text-right text-gray-400">{product.category}</small>
                        <img src={product.image} alt={product.title} className="w-32 md:w-40 max-h-[300px] mx-auto"/>
                        <h3 className="font-bold">{product.title.slice(0,30)}</h3>
                        <p>{product.description.slice(0,60)}</p>
                        <p>$
                            <span className="font-bold">{product.price}</span>
                        </p>
                        <Button onClick={()=>addProducts(product)} className="cursor-pointer bg-yellow-500 hover:bg-yellow-400 duration-300 text-black">Add to cart</Button>
                    </div>
                </div>
            ))
        }
    </div>
  )
}

export default Electronicsproducts;