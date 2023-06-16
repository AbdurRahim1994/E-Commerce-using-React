import { BaseURL } from '../helpers/Config'
import axios from 'axios'
import { SuccessToast, ErrorToast } from '../helpers/FormHelper'
import { GetToken } from '../helpers/SessionHelper'
import store from '../redux/store/store'
import { ResetProductFormValue, SetCategoryDropDown, SetProductFormValue, SetProductList, SetTotalProduct } from '../redux/state-slice/product-slice'
import { HideLoader, ShowLoader } from '../redux/state-slice/setting-slice'

const token = GetToken()
axios.defaults.headers.common['token'] = token;

export const CategoryDropDown = async () => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(BaseURL + '/CategoryDropDown')
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetCategoryDropDown(res?.data?.data))
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

export const ProductListRequest = async (pageNo, perPage, search) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(BaseURL + '/ProductList/' + pageNo + '/' + perPage + '/' + search)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetProductList(res?.data?.data[0]['Row']))
                store.dispatch(SetTotalProduct(res?.data?.data[0]['Total'][0]['total']))
                return true
            }
            else {
                ErrorToast(res?.data?.status)
                store.dispatch(SetProductList([]))
                store.dispatch(SetTotalProduct(0))
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

export const ProductById = async (productId) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(BaseURL + '/ProductById/' + productId)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetProductFormValue({ Name: "id", Value: res?.data?.data[0]['_id'] }))
                store.dispatch(SetProductFormValue({ Name: "title", Value: res?.data?.data[0]['title'] }))
                store.dispatch(SetProductFormValue({ Name: "description", Value: res?.data?.data[0]['description'] }))
                store.dispatch(SetProductFormValue({ Name: "price", Value: res?.data?.data[0]['price'] }))
                store.dispatch(SetProductFormValue({ Name: "quantity", Value: res?.data?.data[0]['quantity'] }))
                store.dispatch(SetProductFormValue({ Name: "category", Value: res?.data?.data[0]['Category'][0]['name'] }))
                store.dispatch(SetProductFormValue({ Name: "imagePreview", Value: res?.data?.data[0]['image']['data'] }))
                store.dispatch(SetProductFormValue({ Name: "contentType", Value: res?.data?.data[0]['image']['contentType'] }))
                store.dispatch(SetProductFormValue({ Name: "categoryId", Value: res?.data?.data[0]['Category'][0]['_id'] }))
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

export const RelatedProduct = async (categoryId, productId) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.get(BaseURL + '/RelatedProduct/' + categoryId + '/' + productId)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetProductList(res?.data?.data[0]['Row']))
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

export const ProductFilter = async (radio, checked) => {
    try {
        const postBody = {
            radio: radio,
            checked: checked
        }
        store.dispatch(ShowLoader())
        const res = await axios.post(BaseURL + '/ProductFilter', postBody)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                store.dispatch(SetProductList(res?.data?.data))
                return true
            }
            else {
                ErrorToast("No product found")
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

export const ProductDelete = async (productId) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.post(BaseURL + '/ProductDelete/' + productId)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
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

export const ProductCreateUpdateRequest = async (postBody) => {
    try {
        store.dispatch(ShowLoader())
        const res = await axios.post(BaseURL + '/ProductCreateUpdate', postBody)
        store.dispatch(HideLoader())
        if (res.status === 200) {
            if (res?.data?.status === 'success') {
                SuccessToast("Request Successful")
                store.dispatch(ResetProductFormValue())
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