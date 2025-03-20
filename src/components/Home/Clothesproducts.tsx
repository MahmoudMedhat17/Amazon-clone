import { fetchData } from "@/lib/fetchData";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addItem } from "@/store/features/GlobalState";
import { toast, ToastContainer } from 'react-toastify';



interface Productsprops{
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
};


const Clothesproducts = () => {

    const [products,setProducts] = useState<any[]>([]);
    const menClothesUrl = "https://fakestoreapi.com/products/category/men's clothing";
    const womanClothesUrl = "https://fakestoreapi.com/products/category/women's clothing";
    const cartItems = useSelector((state: RootState)=> state.global.cart);
    const dispatch = useDispatch();

    function notify() {
        toast("User is already created");
      };



    useEffect(()=>{
        const responseData = async()=>{
            try {
                const menClothesData = await fetchData(menClothesUrl);
                const womenClothesData = await fetchData(womanClothesUrl);
                setProducts([...menClothesData, ...womenClothesData]);   
            } catch (error) {
                console.log(error);
                throw new Error("Something went wrong!");
            }
        };
        responseData();
    },[products]);


    const addProduct=(product:Productsprops)=>{
        dispatch(addItem(product));
        toast.success("Product is added to the cart!");
        console.log(cartItems.length);
        console.log(cartItems);
    };


  return (
    <div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 px-10 pb-20">
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
                            <Button onClick={()=>addProduct(product)} className="cursor-pointer bg-yellow-500 hover:bg-yellow-400 duration-300 text-black">Add to cart</Button>
                        </div>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Clothesproducts;