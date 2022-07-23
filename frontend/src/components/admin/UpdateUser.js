import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Sidebar from './Sidebar';
import {useAlert} from "react-alert";
import { clearErrors } from '../../actions/productAction';
import { Button } from "@material-ui/core";
import MetaData from "../Layout/MetaData";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import "./NewProduct.css"
import { UPDATE_USER_RESET } from '../../constants/userConstant';
import { getUserDetails, updateUser } from '../../actions/userAction';
import Loader from '../Layout/Loader/Loader';


const UpdateUser = ({history, match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {error, user, loading} = useSelector((state)=> state.userDetails)
    const {error: updateError, loading : updateloading, isUpdated} = useSelector((state)=> state.profile)
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
  
    const userId = match.params.id;

    useEffect(()=>{
        if(user && user._id !== userId){
            dispatch(getUserDetails(userId))
        }
        else{
            setName(user.name)
            setEmail(user.email);
            setRole(user.role);
       
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors)
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors)
        }
        if(isUpdated){
            alert.success("User Created Successfully");
            history.push("/admin/users")
            dispatch({type: UPDATE_USER_RESET})
        }
    }, [dispatch, alert, history,isUpdated, updateError, user,userId, error])

    const createProductSubmitHandler = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);
 
        dispatch(updateUser(userId ,myForm))

    }


  return (
    <Fragment>
        <MetaData title="Create Product"  />
        <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
            {loading ? (
            <Loader />
            ):(
                <form className="createProductForm" 
                encType="multipart/form-data" 
                onSubmit={createProductSubmitHandler}>
                    <h1>Create Product</h1>
                    <div>
                        <SpellcheckIcon />
                        <input 
                        type="text"
                        placeholder="Product Name"
                        required
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                         />
                    </div>
                    <div>
                        <MailOutlineIcon />
                        <input 
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                         />
                    </div>
                    <div>
                <VerifiedUserIcon />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Choose Role</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
                    

                    

                    <Button id="createProductBtn"
                        type="submit"
                      
                        disabled = {updateloading? true : false || role === "" ? true : false }
                        >
                            Submit

                    </Button>

                </form>)}

            </div>

        </div>
    </Fragment>
  )
}

export default UpdateUser