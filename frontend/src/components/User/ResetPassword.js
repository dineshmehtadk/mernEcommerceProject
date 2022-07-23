
import React from 'react'
import { Fragment } from 'react';
import { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword, clearErrors} from '../../actions/userAction';
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import {useAlert} from "react-alert"
import Loader from '../Layout/Loader/Loader';
import MetaData from '../Layout/MetaData';

import "./ResetPassword.css"

const ResetPassword = ({ history, match }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { error, success, loading } = useSelector((state) => state.forgotPassword);
   
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    console.log(error)

    const resetPasswordSubmit = (e) => {   
        e.preventDefault();
        const myForm = new FormData();
       


        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);

        dispatch(resetPassword(match.params.token, myForm));
    }


    useEffect(() => {
        if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
        
        if (success) {
            alert.success(" Reset Password Successfully");
  
            history.push("/login");

        }
      }, [dispatch, error, alert, history, success]);

  return (
    <Fragment>
          {loading ? <Loader /> :
          <Fragment>
          <MetaData title="Reset Password" />
          <div className="resetPasswordContainer">
              <div className="resetPasswordBox">
                  <h2 className="resetPasswordHeading">Update Profile</h2>
                  <form className="resetPasswordForm"  onSubmit={resetPasswordSubmit}>
                    
                            <div className="signUpPassword">
                            <LockOpenIcon />
                            <input 
                                type="password"
                                placeholder="New Password"
                                required
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                       
                         <input type="submit"  value="Update" className="resetPasswordBtn" />

                    </form>

                  </div>
             </div>
           
        </Fragment>
        }
        </Fragment>
  )
}

export default ResetPassword