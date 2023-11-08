
import { useRef, useState } from "react";
import VendorCard from "../vendor/vendor-card";
import vendorsdata from "../vendor/vendorDatabase";
import "./navigation.css";
import {AiFillStar} from "react-icons/ai";
import { useContext } from "react";
import { Cartcontext } from "../context folder/appContext"

function Vendors(){
    let cart=useContext(Cartcontext)
    let sortedvendor= vendorsdata.sort( (a,b)=>{
            return b.rating-a.rating
         }
        )
    let [vendor, setvendor]=useState(sortedvendor.map((data, index)=>{
        let star=data.rating===1?<AiFillStar/>:data.rating===2?<div><AiFillStar/><AiFillStar/></div>:data.rating===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return(
                <div key={index} >
                    <VendorCard name={data.name} image={data.image} rating={star} about={data.about} vendorPage={data.vendorPage}/>
                </div>
            )
    })
    )
    const inputvalue=useRef()
    function findvendor(){
        let filteredVendor=vendorsdata.filter((vendor, index)=>{
            return vendor.name.toLocaleLowerCase().includes(inputvalue.current.value.toLocaleLowerCase())
        })
        setvendor(filteredVendor.map((data, index)=>{
            let star=data.rating===1?<AiFillStar/>:data.rating===2?<div><AiFillStar/><AiFillStar/></div>:data.rating===3?<div><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===4?<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>:data.rating===5&&<div><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/><AiFillStar/></div>
            return(
                <div key={index} >
                    <VendorCard name={data.name} image={data.image} rating={star} about={data.about} vendorPage={data.vendorPage} />
                </div>
            )
        })
        )
    }
    return(
        <div className="vendorContainer">
            <input onChange={findvendor} ref={inputvalue} style={cart.changeINdex} className="vendor-input" type="Text" placeholder="Search for vendor"/>
            {vendor}
        </div>
    )
}

export default Vendors