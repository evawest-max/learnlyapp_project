"use client"
import React, { createContext, useEffect } from 'react'
import { useState } from 'react'
import users from '../signup/usersData'
import Link from 'next/link'
import "./login.css"



let changes=false
export const Cartcontext= createContext({
  currentUser: 0,
  loginIcon:0,
  // casechange:changes,
  changeINdex:0,
  // totalItemInCart:0,
  // items:cartproducts,
  changeZ:()=>{},
  switchToUser:()=>{},
  signout:()=>{},
  deleteUserAccount:()=>{},
})

function Cartprovider({children}) {

  const [indexState, setindexState]=useState({ zIndex:"2" })
  function changeZ(){
    changes=!changes
    changes? setindexState({ zIndex:"0" }):setindexState({zIndex:"1"})
  } 
  
  const [loginIcon, setloginIcon]= useState(
    <div className="login-container">
      <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png' alt='user robot image' width="30px"/>
      <Link href="/login">
      <p> SIGN IN/SIGN UP</p>
      </Link>
    </div>)

  let [userloggedin, setuserloggedin]=useState({pendingDispute:[]})
  let userloggedindisplay={}

  function switchToUser(index){
    setuserloggedin({...users[index], password:"*******"})
    userloggedindisplay={...users[index], password:"*******"}
    
    const stringofuser=JSON.stringify(userloggedindisplay)
    localStorage.setItem("loggedinUser", stringofuser);
    let existing = localStorage.getItem('loggedinUser')
    existing=existing && JSON.parse(existing)
    

    console.log(existing)

    setloginIcon(
      <div className="login-container">
        <img src={`https://robohash.org/nmn ${existing.id}`} alt='user robot image' width="30px"/>
        <Link href="/login/userProfile">
        <p>{existing.name}</p>
        </Link>
      </div>)
  }

  function signout(){
    setloginIcon(
      <div className="login-container">
        <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png' alt='user robot image' width="30px"/>
        <Link href="/login">
        <p>SIGN IN/SIGN UP</p>
        </Link>
      </div>)
    setuserloggedin({pendingDispute:[]})
  }

  function deleteUserAccount(index){
    users.splice(index, 1)
    setuserloggedin({pendingDispute:[]})
    setloginIcon(
      <div className="login-container">
        <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png' alt='user robot image' width="30px"/>
        <Link href="/login">
        <p>SIGN IN/SIGN UP</p>
        </Link>
      </div>)
  }
  useEffect(() => {
    keepuserloggedin()
 }, []);

 function keepuserloggedin(){
  if (localStorage.getItem('loggedinUser') !== null){
    let userDataFromLocalStorage=JSON.parse(localStorage.getItem('loggedinUser'))
    userloggedindisplay=userDataFromLocalStorage
    setuserloggedin(userDataFromLocalStorage)
    console.log(userDataFromLocalStorage)
    setloginIcon(
      <div className="login-container">
        <img src={`https://robohash.org/nmn ${userDataFromLocalStorage.id}`} alt='user robot image' width="30px"/>
        <Link href="/login/userProfile">
        <p>{userDataFromLocalStorage.name}</p>
        </Link>
      </div>)
    console.log("windows is working")
  }
 }

  const contextvalue={
    currentUser: userloggedin,
    loginIcon:loginIcon,
    // casechange:changes,
    changeINdex:indexState,
    // increaseIndex:true,
    changeZ,
    switchToUser,
    signout,
    deleteUserAccount,
  }

  return (
    <Cartcontext.Provider value={contextvalue}>
      {children}
    </Cartcontext.Provider>
  )
}

export default Cartprovider