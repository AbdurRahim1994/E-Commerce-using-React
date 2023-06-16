import React, { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import profile from '../../assets/image/Sample_User_Icon.png'
import { NavLink } from 'react-router-dom'
import { RemoveUser, GetUserDetail } from '../../helpers/SessionHelper'
import { AiOutlineLogout, AiOutlineUser } from 'react-icons/ai'
import { LogoutAlert } from '../../helpers/LogoutAlert';
import { SuccessToast } from '../../helpers/FormHelper'
import { useState } from 'react';
import { ProductListRequest } from '../../APIRequest/ProductAPIRequest';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai'
import { Badge } from 'antd'
import {GoListOrdered} from 'react-icons/go'
import SearchBar from '../SearchBar/SearchBar';


const UserLayout = (props) => {
    const [perPage, setPerPage] = useState(10)
    const [search, setSearch] = useState("0")

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

    const CartList = useSelector((state) => state?.cart?.CartList);
    const TotalCart = useSelector((state) => state?.cart?.TotalCart)

    const Logout = async () => {
        const res = await LogoutAlert();
        if (res.isConfirmed) {
            RemoveUser();
            SuccessToast("Successfully Logout")
        }
    }
    return (
        <div>
            <Navbar className='fixed-top px-0 shadow-sm'>
                <Container fluid={true}>
                    <Navbar.Brand>
                        <div>
                            {/* <h4 className='text-white p-0 m-0'><a onClick={OnMenuClickHandler}><AiOutlineMenu></AiOutlineMenu></a></h4> */}
                        </div>
                    </Navbar.Brand>

                    <div className='float-right h-auto d-flex align-items-center'>
                        <div className='user-dropdown'>
                            <img src={profile} className='icon-nav-img icon-nav' alt='logo'></img>
                            <div className='user-dropdown-content'>
                                <div className='mt-4 text-center'>
                                    <img src={profile} alt='logo' className='icon-nav-img'></img>
                                    <h6>{GetUserDetail()?.name}</h6>
                                    <hr className='user-dropdown-divider p-0'></hr>
                                    <NavLink to='/Dashboard/User/Profile' className='side-bar-item'>
                                        <AiOutlineUser className='side-bar-item-icon'></AiOutlineUser>
                                        <span className='side-bar-item-caption'>Profile</span>
                                    </NavLink>
                                    <NavLink className='side-bar-item'>
                                        <GoListOrdered className='side-bar-item-icon'></GoListOrdered>
                                        <span className='side-bar-item-caption'>My Order</span>
                                    </NavLink>
                                    <a className='side-bar-item'>
                                        <AiOutlineLogout className='side-bar-item-icon'></AiOutlineLogout>
                                        <span onClick={Logout} className='side-bar-item-caption'>Logout</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>
            <br></br>
            <br></br>
            
            <div className='mt-5'>
                {props.children}
            </div>
        </div>
    );
};

export default UserLayout;