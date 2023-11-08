"use client"
import React, { useRef, useState } from 'react'
import "./login.css"
import { useContext } from 'react'
import { Cartcontext } from '../context folder/appContext'

import users from '../signup/usersData'
import Link from 'next/link'



function LoginPage() {
  const cart= useContext(Cartcontext)

  const emailRef= useRef()
  const passwardRef=useRef()


  const [loginAlert, setloginAlert]=useState()
  const [alertcolor, setalertcolor]=useState({})
  const [emailbordercolor, setemailbordercolor]=useState({border: "1px solid darkorange"})
  const [passwordbordercolor, setpasswordbordercolor]=useState({border: "1px solid darkorange"})

  function validateEmail(){
    let valid=false
    users.forEach(item=>{
      const checkone=emailRef.current.value.includes("@"&&"com")
      const checktwo=item.email===emailRef.current.value.toLocaleLowerCase()
      if (checkone && checktwo){
        valid=true
        setemailbordercolor({border: "1px solid green"})
        setloginAlert("")
      }else if (!emailRef.current.value.includes("@")){
        valid=true
        setemailbordercolor({border: "1px solid red"})
        setalertcolor({color:"red"})
        setloginAlert("Email must include '@'")
      }
    })
    
    if (valid===false){
      setemailbordercolor({border: "1px solid red"})
        setalertcolor({color:"red"})
        setloginAlert("user does not exist")
    }
  }


  function submitlogin(){
    for (let i=0; i<users.length; i++){
      if (users[i].email===emailRef.current.value){
        if(users[i].password===passwardRef.current.value){
          setalertcolor({color:"green"})
          setemailbordercolor({border: "1px solid green"})
          setpasswordbordercolor({border: "1px solid green"})
          console.log("login successfull")
          setloginAlert("Sign in successfull!")
          cart.switchToUser(i)
        }else{
          setalertcolor({color:"red"})
          setemailbordercolor({border: "1px solid green"})
          setpasswordbordercolor({border: "1px solid red"})
          setloginAlert("Wrong password!")
        }
      } 
    }
    
  }

  return (
    <div>
        <div className='login'>
          <div id='login-Form-container'>
            <h3 className='login-title'>SIGN IN</h3>
            <p style={alertcolor} className='signinalert'>{loginAlert}</p>
            <form className='login-form'>
              <label>E-mail</label>
              <input onBlur={validateEmail} style={emailbordercolor} ref={emailRef} type='email' placeholder='example@yahoo.com'/><br/>
              <label>Password</label>
              <input style={passwordbordercolor} ref={passwardRef} type='password' placeholder='********'/>
            </form>
            <p className='login-forgot-password'>Forgot password?</p>
            <button className='login-button' onClick={submitlogin}><strong>SIGN IN</strong></button>
            <p className='login-options'>Or sign in using</p>
            <div className='login-option-picture'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' alt='google image' width="30px"/></div>
            
            <h5 className='sign-up-button'>
              <p>I dont Have an account?</p>
              <div><Link href="/signup">SIGN UP</Link></div>
            </h5>
          </div>
        </div>
        
    </div>
    
  )
}

export default LoginPage
