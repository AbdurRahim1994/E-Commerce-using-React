import axios from 'axios'
import { BaseURL } from '../helpers/Config'
import { SuccessToast, ErrorToast } from '../helpers/FormHelper'
import store from '../redux/store/store'
import { HideLoader, ShowLoader } from '../redux/state-slice/setting-slice'
import { GetToken, SetToken, SetUserDetail } from '../helpers/SessionHelper'
import { RemoveLoginFormValue, RemoveRegistrationFormValue, SetRegistrationFormValue } from '../redux/state-slice/profile-slice'

const token = GetToken();
axios.defaults.headers.common['token'] = token;
export const UserRegistration = async (postBody) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.post(BaseURL + '/UserRegistration', postBody)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Registration Successful")
                store.dispatch(RemoveRegistrationFormValue())
                return true
            }
            else {
                ErrorToast(res?.data?.status)
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(HideLoader())
        return false
    }
}

export const UserLogin = async (postBody) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.post(BaseURL + '/UserLogin', postBody)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SetToken(res?.data?.token)
                SetUserDetail(res?.data?.data)
                SuccessToast("Login Successful")
                store.dispatch(RemoveLoginFormValue())
                return true
            }
            else {
                ErrorToast(res?.data?.status)
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(HideLoader())
        return false
    }
}

export const UserProfileDetail = async () => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(BaseURL + '/UserProfileDetail')
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetRegistrationFormValue({ Name: "name", Value: res?.data?.data[0]['name'] }))
                store.dispatch(SetRegistrationFormValue({ Name: "email", Value: res?.data?.data[0]['email'] }))
                store.dispatch(SetRegistrationFormValue({ Name: "phone", Value: res?.data?.data[0]['phone'] }))
                store.dispatch(SetRegistrationFormValue({ Name: "password", Value: res?.data?.data[0]['password'] }))
                return true
            }
            else {
                ErrorToast(res?.data?.status)
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        store.dispatch(HideLoader())
        return false
    }
}

export const UserProfileUpdate = async (postBody) => {
    try {
        const res = await axios.post(BaseURL + '/UserProfileUpdate', postBody)
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Profile Update Successful")
                store.dispatch(RemoveRegistrationFormValue())
                SetUserDetail(res?.data?.data);
                return true
            }
            else {
                ErrorToast(res?.data?.status)
                return false
            }
        }
        else {
            ErrorToast("Something went wrong")
            return false
        }
    }
    catch (error) {
        ErrorToast("Something went wrong")
        return false
    }
}