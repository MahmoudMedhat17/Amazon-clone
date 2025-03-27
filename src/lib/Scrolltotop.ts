
export const Scrolltotop = (scroll:unknown) =>{
  if(scroll){
    window.scrollTo({top:0,behavior:"smooth"});
  }
};