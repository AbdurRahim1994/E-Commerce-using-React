import React, { useEffect } from 'react';
import store from '../../redux/store/store'
import { SetCategoryFormValue } from '../../redux/state-slice/category-slice';
import { useSelector } from 'react-redux';
import { CategoryCreateUpdateRequest, CategoryDetailById } from '../../APIRequest/CategoryAPIRequest';
import { ErrorToast, IsEmpty } from '../../helpers/FormHelper';
import { useNavigate } from 'react-router-dom';

const CategoryCreateUpdate = () => {
    const CategoryFormValue = useSelector((state) => state?.category?.CategoryFormValue)
    const param = new URLSearchParams(window.location.search)
    const categoryId = param.get('id')
    const navigate = useNavigate();

    useEffect(() => {
        if (categoryId) {
            CategoryDetailById(categoryId);
        }
    }, [])

    const OnCategorySave = async () => {
        if (IsEmpty(CategoryFormValue.name)) {
            ErrorToast("Category name is required");
        }
        else {
            const res = await CategoryCreateUpdateRequest(CategoryFormValue);
            if (res === true) {
                navigate('/Dashboard/CategoryList')
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <h4>Save Category</h4>
                            <hr className='bg-light'></hr>

                            <div className='row'>
                                <div className='col-lg-4'>
                                    <div className='form-group'>
                                        <label className='form-label'>Category Name</label>
                                        <input defaultValue={CategoryFormValue.name} onChange={(e) => store.dispatch(SetCategoryFormValue({ Name: "name", Value: e.target.value }))} type='text' placeholder='Please enter category name' className='form-control'></input>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-4'>
                                    <button onClick={OnCategorySave} className='btn btn-success w-100'>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCreateUpdate;