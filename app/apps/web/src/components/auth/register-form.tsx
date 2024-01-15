export default function RegisterForm(): JSX.Element {
  return (
    <div className="flex size-full">
      <div className="w-1/2 flex justify-center py-[10vh] flex-col items-center">
        <h1 className="text-9xl ">Mimir</h1>
        <img className="4/4" src="loginImg.jpg" alt="loginImg" />
      </div>
      <div className="flex flex-col w-1/2 bg-gray-200 p-[12%] gap-10">
        <input
          type="text"
          className=" border-gray w-full p-3"
          placeholder="Username"
        />
        <input
          type="text"
          className=" border-gray w-full p-3"
          placeholder="email"
        />
        <input
          type="text"
          className=" border-gray w-full p-3"
          placeholder="Password"
        />
          <button className="grid columns-3 bg-blue-600 p-5 text-white text-6xl place-items-center rounded-xl font-semibold">
            SIGN UP  
          </button>
      </div>
    </div>
  );
}
