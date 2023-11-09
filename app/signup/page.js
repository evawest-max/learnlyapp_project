"use client"
import React, { useRef, useState } from 'react'
import "./signup.css"
import users from './usersData'
import Link from 'next/link'

function Signup() {

    let nameref=useRef()
    let phoneref=useRef()
    let emailref=useRef()
    let createpasswordref=useRef()
    let confirmpasswordref=useRef()
    

    const [alerttext, setalerttext]=useState()
    const [alerttextcolor, setalerttextcolor]=useState()
    const [namebordercolor, setnamebordercolor]=useState()
    const [phonenumberbordercolor, setphonenumberbordercolor]=useState()
    const [emailbordercolor, setemailbordercolor]=useState()
    const [createpasswordbordercolor, setcreatepasswordbordercolor]=useState()
    const [confirmpasswordbordercolor, setconfirmpasswordbordercolor]=useState()

    let userexist=false
    const registerUser= ()=>{
      for (let i=0; i<users.length; i++){
        if (users[i].email === emailref.current.value){
          userexist=true
        }
      } 

        if (nameref.current.value.length>3){
          if (phoneref.current.value.length===11){
            if (!userexist){
              if (emailref.current.value.includes("@") && !userexist){
                if (createpasswordref.current.value===confirmpasswordref.current.value && confirmpasswordref.current.value.length>=6){
                  if (confirmpasswordref.current.value.includes(",")||confirmpasswordref.current.value.includes("@") ||confirmpasswordref.current.value.includes("#") ||confirmpasswordref.current.value.includes("$")||confirmpasswordref.current.value.includes("%")){
                    let newaccount={
                      id:users[users.length-1].id+1,
                      name:nameref.current.value,
                      email:emailref.current.value,
                      password:createpasswordref.current.value,
                      phonenumber:"07020000000",
                    }
                    let stringobj=JSON.stringify(newaccount)
                    localStorage.setItem("account",stringobj )
                    console.log(stringobj)
                    
                    setnamebordercolor({border: "2px solid green"})
                    setphonenumberbordercolor({border: "2px solid green"})
                    setemailbordercolor({border: "2px solid green"})
                    setcreatepasswordbordercolor({border: "2px solid green"})
                    setconfirmpasswordbordercolor({border: "2px solid green"})
                    setalerttextcolor({color: "lime"})
                    setalerttext("Sign up successfull")
                    userexist=false
                  }else {
                    setalerttextcolor({color: "red"})
                    setconfirmpasswordbordercolor({border: "2px solid red"})
                    setalerttext("password must include one of this symbols', @ # $ %'")
                  }
                }else{
                  setalerttextcolor({color: "red"})
                  setemailbordercolor({border: "2px solid red"})
                  setalerttext("password do not match or shorter than 6 characters")
                }
              }else{
                setalerttextcolor({color: "red"})
                setemailbordercolor({border: "2px solid red"})
                setalerttext("email is incorrect 'include @'")
              }
            }else{
              setalerttextcolor({color: "red"})
              setemailbordercolor({border: "2px solid red"})
              setalerttext("User already exist")
            }
          }else{
            setalerttextcolor({color: "red"})
            setphonenumberbordercolor({border: "2px solid red"})
            setalerttext("invalid phone number, 11 numbers only!")
          }
        }else{
          setalerttextcolor({color: "red"})
          setnamebordercolor({border: "2px solid red"})
          setalerttext("Fullname must be longer than 3 letters.")
        }
        
    }

  return (
    <div id='signup-container'>
        <div id='signup-Form-container'>
            <h3 className='signup-title'>CREATE AN ACCOUNT</h3>
            <p style={alerttextcolor}>{alerttext}</p>
            <form className='signup-form'>
                <label>Full Name</label>
                <input style={namebordercolor} ref={nameref} type='text' placeholder='John Smith' required/><br/>
                <label>Phone number</label>
                <input style={phonenumberbordercolor} ref={phoneref} type='number' placeholder='07030000000' required/><br/>
                <label>E-mail</label>
                <input style={emailbordercolor} ref={emailref} type='email' placeholder='example@yahoo.com' required/><br/>
                <label>Create Password</label>
                <input style={createpasswordbordercolor} ref={createpasswordref} type='password' placeholder='********' required/><br/>
                <label>Confirm Password</label>
                <input style={confirmpasswordbordercolor} ref={confirmpasswordref} type='password' placeholder='********' required /><br/>
            </form>
            <button onClick={registerUser} className='signup-button'><strong>SIGN UP</strong></button>
            
            <p className='login-options'>Or sign up using</p>
            <div className='signip-option-picture'><img src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png' alt='google image' width="30px"/></div>
            <h5 className='sign-in-button'>
              <p>I already Have an account?</p>
              <div><Link href="/login" >SIGN IN</Link></div>
            </h5>
          </div>
    </div>
  )
}

export default Signup