"use client"
import React, { useRef, useState } from 'react'
import "./user-profile.css"
import { Cartcontext } from '../../context folder/appContext'
import { useContext } from 'react'
import users from '../../signup/usersData'
import Link from 'next/link'

function UserProfile() {
    const cart= useContext(Cartcontext)
    function signout(){
      localStorage.removeItem('loggedinUser')
        cart.signout()
    }
    let user=cart.currentUser

    const [deleteButton, setdeleteButton]=useState(<button id='delete-button' onClick={switchDeletebutton}>Delete my account</button>)
    function switchDeletebutton(){
      setdeleteButton(<div>
        <h3>Are you sure? <br/>if you delete account all your records will be lost for ever.</h3>
        <div>
          <Link href="/signup-page"><button onClick={deleteAccount} id='delete-button'>Yes</button></Link>
          <button onClick={switchBackToDeletebutton} id='edit-button'>No</button>
        </div>
      </div>)
    }
    function deleteAccount(){
      users.map((item, index)=>{
        if (item.id===cart.currentUser.id){
          cart.deleteUserAccount(index)
          localStorage.removeItem('loggedinUser')
        }
      })
    }
    function switchBackToDeletebutton(){
      setdeleteButton(<button id='delete-button' onClick={switchDeletebutton}>Delete my account</button>)
    }

    const [alerttexts, setalerttexts]=useState("use the form")
    const [alerttextcolors, setalerttextscolors]=useState()
    const [namebordercolors, setnamebordercolors]=useState()
    const [phonenumberbordercolors, setphonenumberbordercolors]=useState()
    

    const nameref=useRef()
    const phoneref=useRef()
    const [editButton, setEditButton]=useState(<button onClick={editaccount} id='edit-button'>Edit my account</button>)
    function editaccount(){
      setEditButton(<div className='edit-form-container'>
        <h6><strong>Edit my profile</strong></h6>
        <p>Ensure name is more than 3 letters <br/> and phonenumber is 11 digits </p>
        <form >
          <label>New name</label><br/>
          <input type='text' onBlur={validate} style={namebordercolors} ref={nameref} placeholder='your new name' required id='editInput'/><br/>
          <label>New phonenumber</label><br/>
          <input type='number' onBlur={validate} style={phonenumberbordercolors} ref={phoneref} Placeholder='Phonenumber' required id='editInput'/><br/>
        </form>
        <button onClick={saveNewUserData} id='edit-button'>Save</button>
        <button onClick={cancelEdit} id='edit-button'>Cancel</button>
      </div>)
    }
    function reset(){
      setEditButton(<button onClick={editaccount} id='edit-button'>Edit my account</button>)
            
    }
    function validate(){
      if (nameref.current.value.length>4){
        setnamebordercolors({border: "6px solid green"})
        setalerttextscolors({color: "green"})
        setalerttexts("Update successfull")
        
      }
      if (phoneref.current.value.length===11){
          setalerttextscolors({color: "green"})
          setphonenumberbordercolors({border: "2px solid green"})
          setalerttexts("Update successfull")
      }
    }
    function saveNewUserData(){
      if (nameref.current.value.length>4){
        if (phoneref.current.value.length===11){
          setalerttextscolors({color: "green"})
          setphonenumberbordercolors({border: "2px solid green"})
          setalerttexts("Update successfull")
          users.map((item)=>{
            let check=JSON.parse(localStorage.getItem('loggedinUser'))
            if (item.id===check.id){
              item.name=nameref.current.value
              item.phonenumber=phoneref.current.value
              reset()
              setEditButton(<button onClick={editaccount} id='edit-button'>Edit my account</button>)
            }
          })
        }else{
          setalerttextscolors({color: "red"})
          setphonenumberbordercolors({border: "2px solid red"})
          setalerttexts("invalid phone number, 11 numbers only!")
        }
      }else{
        setalerttextscolors({color: "red"})
        setnamebordercolors({border: "2px solid red"})
        setalerttexts("Fullname must be longer than 4 letters.")
      }
    }
    function cancelEdit(){
      setEditButton((<button onClick={editaccount} id='edit-button'>Edit my account</button>))
    }
  return (
    <div className='profileContainer' >
        <p id='profile-welcome'>Welcome:</p>
        <p id='profile-name'>{user.name} <br/>{user.email},   {user.phonenumber}</p>
        <div id='profile-links'>
          <div>
            <p>Pending disputes:{user.pendingDispute.length}</p>
          </div>
          <div>
            <p>Learnly Points:{user.learnlyPoints}</p>
          </div>
        </div>
        <Link href="/login">
        <button id='sign-out-button' onClick={signout}>Sign out</button>
        </Link>
        {deleteButton}
        {editButton}
        <button id='sign-out-button'>Change password</button>
    </div>
  )
}

export default UserProfile