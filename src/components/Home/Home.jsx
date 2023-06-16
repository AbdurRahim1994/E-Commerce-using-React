import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { CategoryDropDown, ProductFilter, ProductListRequest } from '../../APIRequest/ProductAPIRequest';
import { useSelector } from 'react-redux';
import price from '../../helpers/Price'
import { TbCurrencyTaka } from 'react-icons/tb'
import { Radio } from 'antd'
import SearchBar from '../SearchBar/SearchBar';
import store from '../../redux/store/store';
import { SetCartList } from '../../redux/state-slice/cart-slice';

const Home = () => {
    const [perPage, setPerPage] = useState(10)
    const [search, setSearch] = useState("0")
    const [radio, setRadio] = useState([]);
    const [checked, setChecked] = useState([])

    useEffect(() => {
        CategoryDropDown();
    }, [])

    const category = useSelector((state) => state?.product?.CategoryDropDown)

    useEffect(() => {
        if (radio.length <= 0 || checked.length <= 0) {
            ProductListRequest(1, perPage, search)
        }
    }, [])

    useEffect(() => {
        if (radio.length > 0 || checked.length > 0) {
            ProductFilter(radio, checked)
        }
    }, [radio, checked])

    const product = useSelector((state) => state?.product?.ProductList);

    const OnResetClick = () => {
        window.location.reload()
    }

    const OnLoadMoreClick = async () => {
        setPerPage(perPage + 10)
        await ProductListRequest(1, perPage + 10, search)
    }

    return (
        <div>
            <Navbar bg="dark">
                <Container>
                    <Navbar.Brand href="#home">
                        {/* <img src={logo} className='icon-nav-img'></img> */}
                    </Navbar.Brand>

                    <NavLink to='/Login' style={{ color: "white" }} className='font-weight-bolder btn btn-warning mb-0 m-2'>Login</NavLink>
                </Container>
            </Navbar>

            <SearchBar></SearchBar>

            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-3 mt-5'>
                        <div>
                            <h4 className='font-weight-bolder'>Category</h4>
                        </div>
                        <div>
                            {
                                category.map((cat, i) =>
                                    <div class="form-check">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"></input>
                                        <label class="form-check-label" for="flexCheckDefault">
                                            {cat?.name}
                                        </label>
                                    </div>
                                )
                            }
                        </div>
                        <div>
                            <h4 className='font-weight-bolder'>Price</h4>
                            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                                {
                                    price.map((p, i) =>
                                        <div key={p._id}>
                                            <Radio value={p.array}>{p.name}</Radio>
                                        </div>
                                    )
                                }
                            </Radio.Group>
                        </div>
                        <div className='mt-3'>
                            <button onClick={OnResetClick} className='btn btn-warning w-100 btn-sm'>Reset</button>
                        </div>
                    </div>

                    <div className='col-lg-9 mt-5'>
                        <div className='row'>
                            {
                                product.map((p, i) =>
                                    <div className='col-lg-3 mt-3'>
                                        <div className='card'>
                                            <div className='card-body'>
                                                <img className='w-100' src={`data:${p.image.contentType};base64,${p.image.data}`} height={150} alt=''></img>
                                                <p className='mb-0 font-weight-bolder' style={{ color: "black" }}>{p?.title}</p>
                                                <p className='font-weight-bolder text-primary'><TbCurrencyTaka size={20}></TbCurrencyTaka>{p?.price}</p>
                                                <div>
                                                    <NavLink className='btn btn-success btn-sm' to={`/Dashboard/ProductView?categoryId=${p?.categoryId}&productId=${p?._id}`}>View</NavLink>
                                                    <button onClick={() => store.dispatch(SetCartList(p))} className='btn btn-success btn-sm'>Add to Cart</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        <div className='row'>
                            <div className='col-lg-6'>
                                <button onClick={OnLoadMoreClick} className='btn btn-success btn-sm w-100 mt-3 ms-10'>Load More</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;