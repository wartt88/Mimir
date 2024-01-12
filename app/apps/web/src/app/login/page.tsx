
export default function Page() : JSX.Element {
    return(<div className="flex size-full">
        <div className="w-1/2 flex justify-center py-[10vh] flex-col items-center">
            <h1 className="text-9xl ">Mimir</h1>
            <img className="w-3/4" src="loginImg.jpg" alt="loginImg"/>
        </div>
        <div className="flex flex-col w-1/2 bg-gray-200 p-[12%] gap-10">
         <input type="text" className="bg-gray-100 border-gray-600 rounded-xl border-2 w-full p-2" placeholder="Username or email"/>
         <input type="text" className="bg-gray-100 border-gray-600 rounded-xl border-2 w-full p-2" placeholder="Password"/>
         <div className="grid grid-cols-2 grid-rows-2 gap-y-2 gap-x-10">
            <div className="justify-center items-center flex gap-2 text-gray-500"> <input className="columns-1" type="checkbox" /> Remember me </div>
            <button className="columns-2 bg-blue-600 p-2 text-white rounded-xl font-semibold">LOGIN</button>
            <button className="columns-1 text-blue-600 font-semibold">Register now</button>
            <button className="columns-2 italic text-gray-500">Forgot password?</button>
         </div>
         <hr className="border-gray-600"/>
         <button className="p-5 text-xl rounded-xl text-white font-bold w-full bg-orange-300">LOGIN WITH ARCHE</button>
         <button className="p-5 text-xl rounded-xl text-white font-bold w-full bg-rose-400">LOGIN WITH GOOGLE</button>
         <button className="p-5 text-xl rounded-xl text-white font-bold w-full bg-gray-600">LOGIN WITH DISCORD</button>
        </div>
    </div>
    )
}