
import React from 'react'
import { Fragment } from 'react';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, clearErrors} from '../../actions/userAction';
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {useAlert} from "react-alert"
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstant';
import "./UpdatePassword.css"

const UpdatePassword = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);
   
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const updatePasswordSubmit = (e) => {   
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(updatePassword(myForm));
    }


    useEffect(() => {
        if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
        
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
  
            history.push("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            });
        }
      }, [dispatch, error, alert, history, isUpdated]);

  return (
    <Fragment>
          {loading ? <Loader /> :
          <Fragment>
          <MetaData title="update Profile" />
          <div className="updatePasswordContainer">
              <div className="updatePasswordBox">
                  <h2 className="updatePasswordHeading">Update Profile</h2>
                  <form className="updatePasswordForm"  onSubmit={updatePasswordSubmit}>
                    
                        <div className="signUpPassword">
                            <VpnKeyIcon />
                            <input 
                                type="password"
                                placeholder="Old Password"
                                required
                                name="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                            </div>
                            <div className="signUpPassword">
                            <LockOpenIcon />
                            <input 
                                type="password"
                                placeholder="New Password"
                                required
                                name="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                            </div>
                            <div className="signUpPassword">
                            <LockIcon />
                            <input 
                                type="password"
                                placeholder="Confirm Password"
                                required
                                name="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            </div>
                       
                         <input type="submit"  value="updatePassword" className="updatePasswordBtn" />

                    </form>

                  </div>
             </div>
           
        </Fragment>
        }
        </Fragment>
  )
}

export default UpdatePassword