// import { fetchData } from "@/lib/fetchData";
import { Button } from "../ui/button";
// import {useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { purchaseItem } from "@/store/features/GlobalState";
import { toast } from "react-toastify";
import {useGetElectronicsQuery} from "@/store/features/Apislice";
import Loadingspinner from "@/lib/Loadingspinner";

interface Productsprops{
    id:number;
    title:string;
    price:number;
    description:string;
    category:string;
    image:string;
};


const Electronicsproducts = () => {

    const {data:electronicsProducts, error, isLoading} = useGetElectronicsQuery(undefined);

    // const [products,setProducts] = useState<any[]>([]);
    const cartItems = useSelector((state:RootState)=>state.global.cart);
    const dispatch = useDispatch();

    


    // useEffect(()=>{
    //     const responseData = async()=>{
    //     try {
    //             const electronticsData = await fetchData("https://fakestoreapi.com/products/category/electronics");
    //             setProducts(electronticsData);
    //     } catch (error) {
    //         console.log(error);
    //         throw new Error("Something went wrong!");
    //     }
    // };
    //     responseData();
    // },[]);

// Function to be able to add products to the cart.
    const addProducts = (product:Productsprops) =>{
        dispatch(purchaseItem(product));
        toast.success("Product is added to the cart!");
        console.log(cartItems.length);
        console.log(cartItems);
    };


    if(isLoading) return <Loadingspinner/>

    if(error){
        return(
            <div className="flex flex-col justify-center items-center space-y-10 p-10">
                <h3 className="text-yellow-500 font-semibold text-xl sm:text-2xl">Unfortunately, something went wrong</h3>
                <img src="/sadface.png" alt="errorPic" className="w-32 sm:w-52"/>
            </div>
        )
    };

  return (
    <div>
        {
            isLoading ? 
            // <Oval
            //     visible={true}
            //     height="80"
            //     width="80"
            //     color="#4fa94d"
            //     ariaLabel="oval-loading"
            //     wrapperStyle={{}}
            //     wrapperClass=""
            // />  
            ""
            :
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 px-10 py-20">
        {
            electronicsProducts.map((product: Productsprops)=>(
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
        }
    </div>
  )
}

export default Electronicsproducts;