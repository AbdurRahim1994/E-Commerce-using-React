import React, { useEffect } from 'react';
import { CategoryDropDown, ProductById, ProductCreateUpdateRequest } from '../../APIRequest/ProductAPIRequest'
import { useSelector } from 'react-redux';
import { SetProductFormValue } from '../../redux/state-slice/product-slice';
import store from '../../redux/store/store'
import { useRef } from 'react';
import { ErrorToast, GetBase64, IsEmpty } from '../../helpers/FormHelper';
import logo from '../../assets/image/logo.png'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProductCreateUpdate = () => {
    let imageViewRef = useRef();
    let imageRef = useRef();
    const param = new URLSearchParams(window.location.search)
    const productId = param.get("id")
    const navigate = useNavigate()

    useEffect(() => {
        if (productId) {
            ProductById(productId)
        }
    }, [])

    useEffect(() => {
        CategoryDropDown();
    }, [])

    const ProductFormValue = useSelector((state) => state?.product?.ProductFormValue)
    const CategoryDropDownList = useSelector((state) => state?.product?.CategoryDropDown)

    const OnImagePreview = async () => {
        const imageFile = imageRef.files[0]
        const image = await GetBase64(imageFile)
        imageViewRef.src = image
    }

    const OnProductSave = async () => {
        const productData = new FormData();
        productData.append("id", ProductFormValue.id)
        productData.append("title", ProductFormValue.title)
        productData.append("description", ProductFormValue.description)
        productData.append("price", ProductFormValue.price)
        productData.append("quantity", ProductFormValue.quantity)
        productData.append("categoryId", ProductFormValue.categoryId)
        productData.append("image", ProductFormValue.image)

        if (IsEmpty(ProductFormValue.title)) {

            ErrorToast("Title is required")
        }
        else if (IsEmpty(ProductFormValue.price)) {
            ErrorToast("Price is required")
        }
        else if (IsEmpty(ProductFormValue.quantity)) {
            ErrorToast("Quantity is required")
        }
        else if (IsEmpty(ProductFormValue.categoryId)) {
            ErrorToast("Category is required")
        }
        else {
            const res = await ProductCreateUpdateRequest(productData)
            if (res === true) {
                navigate('/Dashboard/ProductList')
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4>Save Product</h4>
                            <hr className='bg-light'></hr>

                            <div className='row'>
                                <div className='col-lg-9'>
                                    <div className='row'>
                                        <div className='col-lg-4'>
                                            <div className='form-group'>
                                                <label className='form-label'>Product Image</label>
                                                <input ref={(input) => imageRef = input} onChange={(e) => store.dispatch(SetProductFormValue({ Name: "image", Value: e.target.files[0] }))} type='file' placeholder='Please enter photo' className='form-control form-control-sm'></input>
                                            </div>
                                        </div>

                                        <div className='col-lg-4'>
                                            <div className='form-group'>
                                                <label className='form-label'>Title</label>
                                                <input onChange={(e) => { OnImagePreview(); store.dispatch(SetProductFormValue({ Name: "title", Value: e.target.value })) }} value={ProductFormValue.title} type='text' placeholder='Please enter title' className='form-control form-control-sm'></input>
                                            </div>
                                        </div>

                                        <div className='col-lg-4'>
                                            <div className='form-group'>
                                                <label className='form-label'>Description</label>
                                                <input onChange={(e) => store.dispatch(SetProductFormValue({ Name: "description", Value: e.target.value }))} value={ProductFormValue.description} type='text' placeholder='Please enter description' className='form-control form-control-sm'></input>
                                            </div>
                                        </div>

                                        <div className='col-lg-4'>
                                            <div className='form-group'>
                                                <label className='form-label'>Price</label>
                                                <input onChange={(e) => store.dispatch(SetProductFormValue({ Name: "price", Value: e.target.value }))} value={ProductFormValue.price} type='number' placeholder='Please enter price' className='form-control form-control-sm'></input>
                                            </div>
                                        </div>

                                        <div className='col-lg-4'>
                                            <div className='form-group'>
                                                <label className='form-label'>Quantity</label>
                                                <input onChange={(e) => store.dispatch(SetProductFormValue({ Name: "quantity", Value: e.target.value }))} value={ProductFormValue.quantity} type='number' placeholder='Please enter quantity' className='form-control form-control-sm'></input>
                                            </div>
                                        </div>

                                        <div className='col-lg-4'>
                                            <div className='form-group'>
                                                <label className='form-label'>Category</label>
                                                <select onChange={(e) => store.dispatch(SetProductFormValue({ Name: "categoryId", Value: e.target.value }))} value={ProductFormValue.categoryId} className='form-control form-control-sm form-select form-select-sm'>
                                                    <option value="">Select Category</option>
                                                    {
                                                        CategoryDropDownList.map((cat, i) =>
                                                            <option value={cat._id} key={i.toLocaleString()}>{cat.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='row'>
                                        <div className='col-lg-4'>
                                            <button onClick={(OnProductSave)} className='btn btn-success btn-sm w-100 mt-2'>Save</button>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-3'>
                                    <div className='mt-3'>
                                        {
                                            ProductFormValue.image ?
                                                <img ref={(input) => imageViewRef = input} height={200} width={200} alt=''></img>
                                                :
                                                <img ref={(input) => imageViewRef = input} src={`data:${ProductFormValue.contentType};base64,${ProductFormValue.imagePreview}`} height={200} width={200} alt=''></img>
                                        }
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

export default ProductCreateUpdate;