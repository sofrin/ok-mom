import React from "react";
import { Link, NavLink } from "react-router-dom";

export const Landing = () => {
  return <>
    <header>
      <div className="container">
        <nav className="flex items-center justify-between px-10">
          <Link to="/" className="flex flex-row items-center p-2 gap-6 pr-12" ><img src='/Vector 4.svg' alt="logo" /> <span className="font-medium text-xl max-w-[100px]">Vigrebuha
            Technology </span></Link>
          <ul className="flex gap-12 mr-auto ">
            <li><NavLink className=" font-medium text-xl   text-[#18A0FB]  " to="/">Features</NavLink></li>
            <li><NavLink className=" font-medium text-xl   text-[#18A0FB] " to="/">Pricing</NavLink></li>
            <li><NavLink className=" font-medium text-xl   text-[#18A0FB] " to="/">Community</NavLink></li>
            <li><NavLink className=" font-medium text-xl   text-[#18A0FB] " to="/">Support</NavLink></li>
          </ul>
          <div className="flex gap-3 ">
            <Link to='/SignIn'> <button className="w-32 h-10 rounded-md border-[1px] border-[#18A0FB] text-[#18A0FB] text-center text-sm"> Log In</button></Link>
            <Link to='/SignUp'> <button className="w-32 h-10 rounded-md text-white bg-[#18A0FB] text-center text-sm">Register</button></Link>
          </div>
        </nav>
      </div>
    </header>
    <main className="container">
      <div className="container relative">
        <img className="w-[1680px] h-[960px]" src="/hero.png" alt="heropng" />
        <p className=" font-medium text-5xl  max-w-[600px] absolute top-[542px] left-[190px]" > The largest community of lazy parents</p>
        <button className="w-32 h-10 rounded-md text-white bg-[#18A0FB] text-center text-sm absolute top-[680px] left-[190px]">Join Today</button></div>
      <div className="contaiter flex p-20 justify-center items-center gap-20 ">
        <img src="/about.png" alt="about" className="w-[750px] h-[440px] " />
        <p className="font-normal text-5xl leading-[72px] "> Learn about all the features of the <span className="text-[#18A0FB]">ok mom</span> app </p>
      </div>
      <div className="container p-20">
        <h2 className="w-[600px] text-5xl leading-[72px] tracking-tighter pb-32">Train your child like never before</h2>
        <div className="flex flex-row flex-wrap justify-between">
          <div className="flex flex-col max-w-2xl">
            <h3 className="text-2xl font-bold pb-6">Sed ut perspiciatis</h3>
            <p className="text-xl tracking-tighter pb-10"> Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est.</p>
          </div>
          <div className="flex flex-col max-w-2xl">
            <h3 className="text-2xl font-bold pb-6" >Lorem ipsum dolor</h3>
            <p className="text-xl  tracking-tighter pb-10">Amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi.</p>
          </div>
          <div className="flex flex-col max-w-2xl">
            <h3 className="text-2xl font-bold pb-6">Nemo enim ipsam</h3>
            <p className="text-xl tracking-tighter pb-10" >Consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.</p>
          </div>
          <div className="flex flex-col max-w-2xl">
            <h3 className="text-2xl font-bold pb-6">Tempor incididunt</h3>
            <p className="text-xl tracking-tighter pb-10">Eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora.</p>
          </div>
        </div>
      </div>
      <div className="contaiter flex p-20  items-center justify-center gap-12">
        <div className="w-[1000px]">
          <p className="font-normal text-4xl leading-[50px] tracking-[-0.54px] pb-8"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
          <div className="flex flex-row gap-6 items-center">
            <img className="h-[44px] w-[44px] rounded-[44px]" src="/avatar.png" alt="avatar" />
            <p className="text-lg">Happy lazy parent</p>
          </div>
        </div>
        <img src="/feature.jpg" alt="about" className="w-[500px] h-[470px] object-cover" />

      </div>
      <div className="contaiter flex p-20  items-center justify-between  pr-56">
        <p className="font-normal text-4xl leading-[50px] tracking-[-0.54px] pb-8 w-[900px]"> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore </p>
        <button className="w-48 h-12 rounded-md text-white bg-[#18A0FB] text-center text-base">Join Today</button>
      </div>
    </main>
    <footer className="container">
      <nav className="flex items-center  justify-between px-10 ">
        <Link to="/" className="flex flex-row items-center p-2 gap-6 pl-14" ><img src='/Vector 4.svg' alt="logo" /> <span className="font-medium text-xl max-w-[100px]">Vigrebuha
          Technology </span></Link>
        <ul className="flex gap-28  justify-center items-center flex-1">
          <li><NavLink className=" font-medium text-xl   text-black  " to="/">Mobile app</NavLink></li>
          <li><NavLink className=" font-medium text-xl   text-black " to="/">Community</NavLink></li>
          <li><NavLink className=" font-medium text-xl   text-black " to="/">Company</NavLink></li>
        </ul>
        <p className="opacity-80 w-[240px] "> © VigrebuhaTechnology, Inc. 2023. We love our users!</p>
      </nav>
    </footer>
  </>;
};
