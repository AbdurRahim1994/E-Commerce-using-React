import React, { useEffect, useState } from 'react';
import { CategoryDeleteRequest, CategoryListRequest } from '../../APIRequest/CategoryAPIRequest'
import { useSelector } from 'react-redux';
import moment from 'moment/moment';
import { NavLink } from 'react-router-dom';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai'
import ReactPaginate from 'react-paginate';
import { DeleteAlert } from '../../helpers/DeleteAlert';

const CategoryList = () => {
    const [search, setSearch] = useState("0")
    const [perPage, setPerPage] = useState(20)

    useEffect(() => {
        CategoryListRequest(1, perPage, search)
    }, [])

    const CategoryList = useSelector((state) => state?.category?.CategoryList)
    const TotalCategory = useSelector((state) => state?.category?.TotalCategory)

    const OnPageChangeClick = async (event) => {
        await CategoryListRequest(event.selected + 1, perPage, search)
    }

    const OnPerPageChange = async (event) => {
        setPerPage(event.target.value);
        await CategoryListRequest(1, event.target.value, search)
    }

    const OnSearchKeywordChange = async (event) => {
        setSearch(event.target.value);
        if ((event.target.value).length === 0) {
            setSearch("0")
            await CategoryListRequest(1, perPage, "0")
        }
    }

    const OnSearchClick = async () => {
        await CategoryListRequest(1, perPage, search)
    }

    const OnCategoryDelete = async (categoryId) => {
        const res = await DeleteAlert()
        if (res.isConfirmed) {
            const deletedCategory = await CategoryDeleteRequest(categoryId)
            if (deletedCategory) {
                await CategoryListRequest(1, perPage, search)
            }
        }
    }

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='card'>
                        <div className='card-body'>
                            <div className='row'>
                                <div className='col-lg-4'>
                                    <h4>Category List</h4>
                                </div>
                                <div className='col-lg-3'>
                                    <select onChange={OnPerPageChange} className='form-control form-control-sm form-select form-select-sm'>
                                        <option value='20'>20 Per Page</option>
                                        <option value='30'>30 Per Page</option>
                                        <option value='50'>50 Per Page</option>
                                        <option value='100'>100 Per Page</option>
                                        <option value='200'>200 Per Page</option>
                                    </select>
                                </div>
                                <div className='col-lg-5'>
                                    <div className='input-group'>
                                        <input onChange={OnSearchKeywordChange} type='text' placeholder='Search...' className='form-control form-control-sm'></input>
                                        <button onClick={OnSearchClick} className='btn btn-success btn-sm mb-0'>Search</button>
                                    </div>
                                </div>
                            </div>

                            <div className='row'>
                                <div className='col-lg-12'>
                                    <div className='table-responsive table-section'>
                                        <table className='table'>
                                            <thead className='sticky-top bg-white'>
                                                <tr>
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>#NO</th>
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>Name</th>
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>Slug</th>
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>Created</th>
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    CategoryList.map((item, i) =>
                                                        <tr>
                                                            <td><p className='text-start text-xs'>{i + 1}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.name}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.slug}</p></td>
                                                            <td><p className='text-start text-xs'>{moment(item?.createdDate).format("MMM DD YYYY")}</p></td>
                                                            <td>
                                                                <NavLink to={`/Dashboard/CategoryCreateUpdate?id=${item?._id}`} className='btn btn-outline-light btn-sm text-info mb-0 p-2'>
                                                                    <AiOutlineEdit size={15}></AiOutlineEdit>
                                                                </NavLink>
                                                                <button onClick={OnCategoryDelete.bind(this, item?._id)} className='btn btn-outline-light btn-sm text-danger ms-2 mb-0 p-2'>
                                                                    <AiOutlineDelete size={15}></AiOutlineDelete>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    )
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <nav aria-label="Page navigation example">
                                        <ReactPaginate
                                            previousLabel="<"
                                            nextLabel=">"
                                            pageClassName="page-item"
                                            pageLinkClassName="page-link"
                                            previousClassName="page-item"
                                            previousLinkClassName="page-link"
                                            nextClassName="page-item"
                                            nextLinkClassName="page-link"
                                            breakLabel="..."
                                            breakClassName="page-item"
                                            breakLinkClassName="page-link"
                                            pageCount={TotalCategory / perPage}
                                            marginPagesDisplayed={2}
                                            pageRangeDisplayed={5}
                                            onPageChange={OnPageChangeClick}
                                            containerClassName="pagination"
                                            activeClassName="active"
                                        />
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryList;