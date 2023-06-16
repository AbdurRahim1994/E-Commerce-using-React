import React, { useEffect } from 'react';
import { UserProfileDetail, UserProfileUpdate } from '../../APIRequest/UserAPIRequest'
import { useSelector } from 'react-redux';
import UserLogo from '../../assets/image/Sample_User_Icon.png'
import { SetRegistrationFormValue } from '../../redux/state-slice/profile-slice';
import store from '../../redux/store/store';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { GetUserDetail } from '../../helpers/SessionHelper';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate()
    useEffect(() => {
        UserProfileDetail();
    }, [])

    const user = useSelector((state) => state?.profile?.RegistrationFormValue)
    const userDetail = GetUserDetail();

    const OnProfileUpdate = async () => {
        if (IsEmpty(user.name)) {
            ErrorToast("Name is required")
        }
        else if (IsEmpty(user.phone)) {
            ErrorToast("Mobile number is required")
        }
        else if (IsEmpty(user.email)) {
            ErrorToast("Email is required")
        }
        else {
            const res = await UserProfileUpdate(user);
            if (res === true) {
                navigate(`/Dashboard/${userDetail?.role === 1 ? "Admin" : "User"}`)
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4>Personal Details</h4>
                            <div>
                                <img src={UserLogo} height={150} width={150}></img>
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>Name</label>
                                <input onChange={(e) => store.dispatch(SetRegistrationFormValue({ Name: "name", Value: e.target.value }))} defaultValue={user.name} type='text' placeholder='Please enter name' className='form-control form-control-sm animated fadeInUp'></input>
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>Email</label>
                                <input onChange={(e) => store.dispatch(SetRegistrationFormValue({ Name: "email", Value: e.target.value }))} defaultValue={user.email} readOnly={true} type='email' placeholder='Please enter email' className='form-control form-control-sm animated fadeInUp'></input>
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>Phone</label>
                                <input onChange={(e) => store.dispatch(SetRegistrationFormValue({ Name: "phone", Value: e.target.value }))} defaultValue={user.phone} type='number' placeholder='Please enter mobile number' className='form-control form-control-sm animated fadeInUp'></input>
                            </div>

                            <div>
                                <button onClick={OnProfileUpdate} className='btn btn-success btn-sm w-100 mt-3'>Update</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4>Change Password</h4>
                            <div>
                                <img src={UserLogo} height={150} width={150}></img>
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>Old Password</label>
                                <input type='password' placeholder='Please enter old password' className='form-control form-control-sm animated fadeInUp'></input>
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>New Password</label>
                                <input type='password' placeholder='Please enter new password' className='form-control form-control-sm animated fadeInUp'></input>
                            </div>

                            <div className='form-group'>
                                <label className='form-label'>Confirm Password</label>
                                <input type='password' placeholder='Please enter password again' className='form-control form-control-sm animated fadeInUp'></input>
                            </div>

                            <div>
                                <button className='btn btn-success btn-sm w-100 mt-3'>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;