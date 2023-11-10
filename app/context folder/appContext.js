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
  changeINdex:0,
  changeZ:()=>{},
  switchToUser:()=>{},
  signout:()=>{},
  deleteUserAccount:()=>{},
})

function Cartprovider({children}) {

  const [indexState, setindexState]=useState({ zIndex:"2" })
  function changeZ(){
    // this function sets the index of the zindex of the searchbar and mobile menu
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
    // this function switch SIGN IN/SIGN UP to user image and name
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
    //this account reset the username and image text to SIGN IN/SIGN UP
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
    // this function deletes the user account from database and localstorage
    // localStorage.removeItem('loggedinUser')
    users.splice(index, 1)
    setuserloggedin({pendingDispute:[]})
    localStorage.setItem('account', JSON.stringify(users))
    setloginIcon(
      <div className="login-container">
        <img src='https://cdn-icons-png.flaticon.com/512/3177/3177440.png' alt='user robot image' width="30px"/>
        <Link href="/login">
        <p>SIGN IN/SIGN UP</p>
        </Link>
      </div>)
  }

  useEffect(() => {
    // useffect calls a keepuserloggedin() function to keep use signed in when the browser reloads
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
    }
    if (localStorage.getItem('account') !== null){
      while(users.length>0){
        users.pop()
      }
    let accountDataFromLocalStorage=localStorage.getItem('account')
    let thedata=JSON.parse(accountDataFromLocalStorage)
    thedata.forEach(element => {
      users.push(element)
    });
    }
  }

  const contextvalue={
    currentUser: userloggedin,
    loginIcon:loginIcon,
    changeINdex:indexState,
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