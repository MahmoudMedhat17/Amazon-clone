
const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-10 p-10">
      <h3 className="text-yellow-500 font-semibold text-xl sm:text-2xl">Unfortunately, Page isn't found</h3>
      <img src="/sadface.png" alt="errorPic" className="w-32 sm:w-52"/>
    </div>
  )
}

export default Error