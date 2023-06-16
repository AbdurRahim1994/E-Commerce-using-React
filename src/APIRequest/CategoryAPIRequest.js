import { BaseURL } from '../helpers/Config'
import axios from 'axios'
import { SuccessToast, ErrorToast } from '../helpers/FormHelper'
import { GetToken } from '../helpers/SessionHelper'
import store from '../redux/store/store'
import { ResetCategoryFormValue, SetCategoryFormValue, SetCategoryList, SetTotalCategory } from '../redux/state-slice/category-slice'
import { HideLoader, ShowLoader } from '../redux/state-slice/setting-slice'

const token = GetToken();
axios.defaults.headers.common['token'] = token;

export const CategoryListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(BaseURL + '/CategoryList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetCategoryList(res?.data?.data[0]['Row']))
                store.dispatch(SetTotalCategory(res?.data?.data[0]['Total'][0]['total']))
                return true
            }
            else {
                store.dispatch(SetCategoryList([]))
                store.dispatch(SetTotalCategory(0))
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

export const CategoryDeleteRequest = async (categoryId) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.post(BaseURL + '/CategoryDelete/' + categoryId)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                return true
            }
            else if (res?.data?.status === 'associate') {
                ErrorToast(res?.data?.data)
                return false
            }
            else {
                ErrorToast(res?.data?.status)
                return false;
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

export const CategoryCreateUpdateRequest = async (postBody) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.post(BaseURL + '/CategoryCreateUpdate', postBody)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetCategoryFormValue())
                return true;
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

export const CategoryDetailById = async (categoryId) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(BaseURL + '/CategoryById/' + categoryId)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetCategoryFormValue({ Name: "name", Value: res?.data?.data[0]['name'] }))
                store.dispatch(SetCategoryFormValue({ Name: "id", Value: res?.data?.data[0]['_id'] }))
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
