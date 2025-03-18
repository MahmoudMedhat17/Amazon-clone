import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel";
import {carouselImgs} from "../../lib/index"; 
import Clothesproducts from "./Clothesproducts";  
import Electronicsproducts from "./Electronicsproducts";


const Home = () => {

  return (
    <div>
        <Carousel 
        opts={{
            align: "start",
            loop: true,
        }}>
            <CarouselContent>
              {
                carouselImgs.map((image)=>(
                    <CarouselItem>
                        <img src={image.img} alt={image.title} className="max-h-[600px] w-full object-center"/>
                    </CarouselItem>
                ))
              }
            </CarouselContent>
        </Carousel>
        <Clothesproducts/>
        <img src="/amazon-prime.jpg" alt="Amazon-prime" className="w-full" />
        <Electronicsproducts/>
    </div>
  )
}

export default Home;