"use client"
import "./nav.css";
import { useState } from "react";
import { useContext } from "react";
import { Cartcontext } from "../context folder/appContext";
import Link from "next/link";
import users from "../signup/usersData";


let signup="sign in"
let signstate=true
function Navbar() {
  const cart=useContext(Cartcontext)
  const [menustate, newMenuState]=useState(<div className="menubutton-mobile" onClick={openMenu}><img src="https://static.thenounproject.com/png/5238032-200.png" alt="open menu" width="25px"/></div>)
  function openMenu(){
    cart.increaseIndex=true
    cart.changeZ()
    console.log(cart.changeINdex)
    newMenuState(
      <div>
        <div onClick={menuclose} className="nav-transparent-background"></div>
      <nav>
        <div className="menubutton-mobile-close" style={{}} onClick={menuclose}><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOgRlTB2JB2JuLXGP2PiBdJW-eKEnOezFn8w&usqp=CAU" 
        alt="close image" width="25px" height="25px"/></div>
          <ul>
          <div>
            <Link onClick={menuclose} href="/"><img src="https://cdn-icons-png.flaticon.com/512/6989/6989969.png" width="25px" height="25px" alt="home_pic"/>Homepage</Link>
            <Link onClick={menuclose} href="/"><img src="https://icon-library.com/images/about-us-icon-png/about-us-icon-png-20.jpg" width="25px" height="25px" alt="about_pic"/> About us</Link>
            <Link onClick={menuclose} href="/"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Comedy_film_icon.svg/1024px-Comedy_film_icon.svg.png" width="25px" height="25px" alt="popular_video_pic"/> Popular movies</Link>
          </div>
          </ul>
      </nav>
      </div>
    )
  }
  function menuclose(){
    cart.changeZ()
    console.log(cart.changeINdex)
    newMenuState(<div className="menubutton-mobile" onClick={openMenu}><img src="https://static.thenounproject.com/png/5238032-200.png" alt="open menu" width="25px"/></div>)
  }
  

  
  return (
    
    <div className="everything">
        <Link href="/"><img className="logo" src="https://res.cloudinary.com/bladencove/image/upload/v1660734268/products/Technify/learnly_logo_1_f1orrz.png" alt="logo" /></Link>
      <div className="navcontainer">
        <nav>
          <ul>
            <Link href="/">Home page</Link>
            <Link href="/special">About us</Link>
            <Link href="/track">Popular movies</Link>
          </ul>
        </nav> 
      </div>
      
      {cart.loginIcon}
      

      <div className="navcontainer-mobile">
        <div className="Sign-menu">
          
          {menustate}
        </div>
      </div>
    </div>  
      
    
  );
}

export { Navbar };
