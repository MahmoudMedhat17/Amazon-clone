import { Button } from "./ui/button";
import { footerLinks } from "@/lib";
import {Link} from "react-router-dom";
import { Scrolltotop } from "@/lib/Scrolltotop";

const Footer = () => {

  const date = new Date();
  const yearlyDate = date.getFullYear();

  return (
    <div>
      <Button onClick={Scrolltotop} className="bg-[#37475A] hover:bg-[#42556d] rounded-none w-full cursor-pointer !p-6">
        Back to Top
      </Button>
      <div className="bg-[#232F3E]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 p-4 sm:p-6 md:px-10 lg:px-20 xl:px-42">
        {
          footerLinks.map((section)=>(
            <div key={section.title}>
              <h3 className="text-white font-bold mb-4">{section.title}</h3>
              {
                section.links.map((link)=>(
                  <p className="text-white/70 hover:underline duration-200 cursor-pointer">{link}</p>
                ))
              }
            </div>
          ))
        }
        </div>
        <div className="w-full flex justify-center items-center gap-8">
          <Link to="/">
            <img src="/Amazon-Logo.png" alt="AmazonLogo" className="w-20 cursor-pointer" />
          </Link>
          <p className="text-white font-medium">Copyright@Mahmoud Medhat {yearlyDate}</p>
        </div>
      </div>
    </div>
  )
}

export default Footer;