import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ProductDelete, ProductListRequest } from '../../APIRequest/ProductAPIRequest';
import { useSelector } from 'react-redux';
import logo from '../../assets/image/logo.png'
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { DeleteAlert } from '../../helpers/DeleteAlert'

const ProductList = () => {
    const [search, setSearch] = useState("0");
    const [perPage, setPerPage] = useState(20);
    const navigate = useNavigate()


    useEffect(() => {
        ProductListRequest(1, perPage, search);
    }, [])

    const ProductList = useSelector((state) => state?.product?.ProductList)
    const TotalProduct = useSelector((state) => state?.product?.TotalProduct)

    const OnPageChangeClick = async (event) => {
        await ProductListRequest(event.selected + 1, perPage, search)
    }

    const OnPerPageChange = async (event) => {
        setPerPage(event.target.value);
        await ProductListRequest(1, event.target.value, search)
    }

    const OnSearchKeywordChange = async (event) => {
        setSearch(event.target.value);
        if ((event.target.value).length === 0) {
            setSearch("0")
            await ProductListRequest(1, perPage, "0")
        }
    }

    const OnSearchClick = async () => {
        await ProductListRequest(1, perPage, search)
    }

    const OnProductDelete = async (productId) => {
        const res = await DeleteAlert()
        if (res.isConfirmed) {
            const deletedProduct = await ProductDelete(productId)
            if (deletedProduct === true) {
                await ProductListRequest(1, perPage, search);
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
                                    <h4>Product List</h4>
                                </div>
                                <div className='col-lg-4'>
                                    <select onChange={OnPerPageChange} className='form-control form-control-sm form-select form-select-sm'>
                                        <option value='20'>20 Per Page</option>
                                        <option value='30'>30 Per Page</option>
                                        <option value='50'>50 Per Page</option>
                                        <option value='100'>100 Per Page</option>
                                        <option value='200'>200 Per Page</option>
                                    </select>
                                </div>
                                <div className='col-lg-4'>
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
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>Product</th>
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>Description</th>
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>Price</th>
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>Quantity</th>
                                                    <th className='text-uppercase text-xxs text-secondary font-weight-bolder opacity-7'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    ProductList.map((item, i) =>
                                                        <tr>
                                                            <td><p className='text-start text-xs'>{i + 1}</p></td>
                                                            <td>
                                                                <div className='d-flex px-py-1'>
                                                                    <img src={`data:${item?.image?.contentType};base64,${item?.image?.data}`} className='avatar me-3'></img>
                                                                    <div className='d-flex flex-column justify-content-center'>
                                                                        <h6 className='text-xs mb-0'>{item?.title}</h6>
                                                                        <p className='text-xs text-secondary mb-0'>{item?.Category[0] ? item?.Category[0]['name'] : ""}</p>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td><p className='text-start text-xs'>{item?.description}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.price}</p></td>
                                                            <td><p className='text-start text-xs'>{item?.quantity}</p></td>
                                                            <td>
                                                                <NavLink to={`/Dashboard/ProductCreateUpdate?id=${item?._id}`} className='btn btn-outline-light btn-sm text-info mb-0 p-2'>
                                                                    <AiOutlineEdit size={15}></AiOutlineEdit>
                                                                </NavLink>
                                                                <button onClick={() => OnProductDelete(item?._id)} className='btn btn-outline-light btn-sm text-danger ms-2 mb-0 p-2'>
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
                                            pageCount={TotalProduct / perPage}
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

export default ProductList;