import React from 'react';
import { FaFacebookF, FaGooglePlusG } from 'react-icons/fa'
import store from '../../redux/store/store'
import { SetRegistrationFormValue } from '../../redux/state-slice/profile-slice';
import { useSelector } from 'react-redux';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper'
import { UserRegistration } from '../../APIRequest/UserAPIRequest'
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    const navigate = useNavigate()
    const RegistrationFormValue = useSelector((state) => state?.profile?.RegistrationFormValue)

    const OnRegistration = async () => {
        if (IsEmpty(RegistrationFormValue.name)) {
            ErrorToast("Name is required")
        }
        else if (IsEmpty(RegistrationFormValue.email)) {
            ErrorToast("Email is required")
        }
        else if (IsEmpty(RegistrationFormValue.phone)) {
            ErrorToast("Mobile number is required")
        }
        else if (IsEmpty(RegistrationFormValue.password)) {
            ErrorToast("Passowrd is required")
        }
        else {
            const res = await UserRegistration(RegistrationFormValue)
            if (res === true) {
                navigate('/Login')
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
                                        <label className='form-label'>Name<span className='text-danger'>*</span></label>
                                        <input onChange={(e) => store.dispatch(SetRegistrationFormValue({ Name: "name", Value: e.target.value }))} type='text' placeholder='Please enter name' className='form-control form-control-sm animated fadeInUp'></input>
                                    </div>

                                    <div className='text-start form-group'>
                                        <label className='form-label'>Email<span className='text-danger'>*</span></label>
                                        <input onChange={(e) => store.dispatch(SetRegistrationFormValue({ Name: "email", Value: e.target.value }))} type='email' placeholder='Please enter email' className='form-control form-control-sm animated fadeInUp'></input>
                                    </div>

                                    <div className='text-start form-group'>
                                        <label className='form-label'>Password<span className='text-danger'>*</span></label>
                                        <input onChange={(e) => store.dispatch(SetRegistrationFormValue({ Name: "password", Value: e.target.value }))} type='password' placeholder='8 characters including at least 1 uppercase 1 lowercase and 1 number' className='form-control form-control-sm animated fadeInUp'></input>
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='text-start form-group'>
                                        <label className='form-label'>Phone<span className='text-danger'>*</span></label>
                                        <input onChange={(e) => store.dispatch(SetRegistrationFormValue({ Name: "phone", Value: e.target.value }))} type='number' placeholder='Please enter mobile number' className='form-control form-control-sm animated fadeInUp'></input>
                                    </div>

                                    <button onClick={OnRegistration} className='btn btn-success btn-sm w-100 animated fadeInUp mt-4'>Register</button>
                                    <p className='text-start text-secondary text-xs font-weight-bolder opacity-10'>Or, sign up with</p>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <button className='btn btn-dark w-100 btn-sm animated fadeInUp'><FaFacebookF size={16}></FaFacebookF>  Facebook</button>
                                        </div>
                                        <div className='col-lg-6'>
                                            <button className='btn w-100 btn-sm animated fadeInUp' style={{ color: "#fff", backgroundColor: "#F56565", borderColor: "#F56565" }}><FaGooglePlusG size={20}></FaGooglePlusG>  Google</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;