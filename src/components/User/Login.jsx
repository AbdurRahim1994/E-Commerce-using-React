import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa'
import { useSelector } from 'react-redux';
import store from '../../redux/store/store'
import { SetLoginFormValue } from '../../redux/state-slice/profile-slice';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper'
import { UserLogin } from '../../APIRequest/UserAPIRequest'
import { GetUserDetail } from '../../helpers/SessionHelper'

const Login = () => {
    const LoginFormValue = useSelector((state) => state?.profile?.LoginFormValue)
    const user = GetUserDetail();
    const location = useLocation();

    const OnLogin = async () => {
        if (IsEmpty(LoginFormValue.email)) {
            ErrorToast("Email is required")
        }
        else if (IsEmpty(LoginFormValue.password)) {
            ErrorToast("Password is required")
        }
        else {
            const res = await UserLogin(LoginFormValue)
            if (res === true) {
                window.location.href = location.state || `/Dashboard/${user?.role === 1 ? "Admin" : "User"}`
            }
        }
    }
    return (
        <div className='container-fluid'>
            <div className='row justify-content-center'>
                <div className='col-lg-8 center-screen'>
                    <div className='card w-100'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='text-start form-group'>
                                        <label className='form-label'>Email<span className='text-danger'>*</span></label>
                                        <input onChange={(e) => store.dispatch(SetLoginFormValue({ Name: "email", Value: e.target.value }))} type='text' placeholder='Please enter email' className='form-control form-control-sm animated fadeInUp'></input>
                                    </div>

                                    <div className='text-start form-group'>
                                        <label className='form-label'>Password<span className='text-danger'>*</span></label>
                                        <input onChange={(e) => store.dispatch(SetLoginFormValue({ Name: "password", Value: e.target.value }))} type='password' placeholder='Please enter password' className='form-control form-control-sm animated fadeInUp'></input>
                                    </div>

                                    <div className='text-end'>
                                        <NavLink className='text-xs text-info font-weight-bolder'>Forgot Password?</NavLink>
                                    </div>

                                    <div className='text-start'>
                                        <NavLink to='/Registration'><span className='text-xs font-weight-bolder'>New Member?</span> <span className='text-info font-weight-bolder text-xs'>Register</span></NavLink>
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <button onClick={OnLogin} className='btn btn-success btn-sm w-100 mt-4 animated fadeInUp'>Login</button>
                                    <p className='text-start text-secondary text-xs font-weight-bolder opacity-10'>Or login with</p>
                                    <button className='btn btn-dark w-100 btn-sm animated fadeInUp'><FaFacebookF size={16}></FaFacebookF>  Facebook</button>
                                    <button className='btn w-100 btn-sm animated fadeInUp' style={{ color: "#fff", backgroundColor: "#F56565", borderColor: "#F56565" }}><FaGooglePlusG size={20}></FaGooglePlusG>  Google</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;