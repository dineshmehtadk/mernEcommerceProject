import React from 'react'
import { Fragment } from 'react';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../actions/userAction';
import FaceIcon from "@material-ui/icons/Face";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import "./UpdateProfile.css"
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant';
import {useAlert} from "react-alert"
import Profile from "../../images/Profile.png"
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';

function UpdateProfile({history}) {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {user} = useSelector((state)=> state.user)
    const {error, isUpdated, loading} = useSelector((state)=> state.profile)
   

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [avatar, setAvatar] = useState("");
    const [avatarPreview, setAvatarPreview] = useState(Profile)


    const updateProfileSubmit = (e)=>{
      
        e.preventDefault();
        const myForm = new FormData()
        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)
        dispatch(updateProfile(myForm))

    }

      const updateProfileDataChange =(e)=>{
        if(e.target.name === "avatar"){

            const reader = new FileReader();
            reader.onload = () => {
              if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
              }
              
            };
            reader.readAsDataURL(e.target.files[0]);

        }
    }

    useEffect(() => {
        
        if(user){
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
            
        }
        
        if (error) {
            
          alert.error(error)
          
          
        }
        if(isUpdated){
            alert.success("Profile Updated Successfully!")
            dispatch(loadUser())

            history.push("/account")

            dispatch({
                type: UPDATE_PROFILE_RESET,
            })


        }
        
      }, [dispatch, error, alert, history, isUpdated,user]);



  return (
    <Fragment>
          {loading ? <Loader /> :
          <Fragment>
          <MetaData title="update Profile" />
          <div className="updateProfileContainer">
              <div className="updateProfileBox">
                  <h2 className="updateProfileHeading">Update Profile</h2>
                  <form className="updateProfileForm"  onSubmit={updateProfileSubmit}>
                    <div className="updateProfileName">
                            <FaceIcon />
                            <input 
                                type="name"
                                placeholder="Name"
                                required
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="pdateProfileEmail">
                            <MailOutlineIcon />
                            <input 
                                type="email"
                                placeholder="Email"
                                required
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            </div>

                            <div id="updateProfileImage">
                                <img src={avatarPreview} alt="Avatar Preview" />
                               
                                <input 
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    onChange = {updateProfileDataChange}
                                />
                            </div>


                        
                         <input type="submit"  value="updateProfile" className="updateProfileBtn" />

                    </form>

                  </div>
             </div>
           
        </Fragment>
        }
        </Fragment>
  )
}

export default UpdateProfile