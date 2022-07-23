import React from 'react'
import { Fragment } from 'react'
import {SpeedDial, SpeedDialAction} from "@material-ui/lab"
import { useState } from 'react'
import "./Header.css";
import ListAltIcon from "@material-ui/icons/ListAlt"
import PersonIcon from "@material-ui/icons/Person"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import Dashboard from "@material-ui/icons/Dashboard"
import { useHistory } from 'react-router';
import {logout} from "../../../actions/userAction"
import { useDispatch } from 'react-redux';
import Backdrop from "@material-ui/core/Backdrop"

function UserOptions({user}) {
    const[open, setOpen] = useState(false)
    const history = useHistory();
    const dispatch = useDispatch()

    const options = [
        {icon: <ListAltIcon />, name:"Orders", func: orders},
        {icon: <PersonIcon />, name:"Profile", func: account},
        {icon: <ExitToAppIcon />, name:"Logout", func: logoutUser},

    ]

    if(user.role ==="admin"){
        options.unshift({
            icon: <Dashboard />,
            name: "Dashboard",
            func: dashboard,
        });
    }
    function dashboard(){
        history.push("/admin/dashboard")
    }
    function orders(){
        history.push("/orders")
    }
    function account(){
        history.push("/account")
    }
    function logoutUser(){
        dispatch(logout())
        alert.success("Logout Successfully")
    }
  return (
    <Fragment>
        <Backdrop open={open} style={{ zIndex:"10" }} />
        <SpeedDial 
         ariaLabel="SpeedDial tooltip example"
         onClose={()=> setOpen(false)}
         onOpen={()=> setOpen(true)}
         style= {{ zIndex: "11" }}
         open={open}
         direction= "down"
         className="speedDial"
         icon={
             <img 
                className="speedDialIcon"
                src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                alt="Profile"
             />
         }
        
        >
            {options.map((item)=>(
                <SpeedDialAction key={item.name} icon ={item.icon} tooltipTitle={item.name} onClick={item.func} />
            ))}

        </SpeedDial>
    </Fragment>
  )
}

export default UserOptions