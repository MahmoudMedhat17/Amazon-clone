import {BeatLoader} from "react-spinners";



const Loadingspinner = () => {
  return (
    <div className="w-full flex justify-center items-center py-10">
      <BeatLoader 
          visible={false}
          width="200"
          color="#efb100"
          ariaLabel="infinity-spin-loading"
      />
    </div>
  )
}

export default Loadingspinner;