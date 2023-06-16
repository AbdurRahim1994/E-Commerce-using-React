import React, { useRef } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import profile from '../../assets/image/Sample_User_Icon.png'
import { NavLink } from 'react-router-dom'
import { RemoveUser, GetUserDetail } from '../../helpers/SessionHelper'
import { AiOutlineLogout, AiOutlineUser, AiOutlineMenu } from 'react-icons/ai'
import { LogoutAlert } from '../../helpers/LogoutAlert';
import { SuccessToast } from '../../helpers/FormHelper'
import logo from '../../assets/image/logo.png'
import { RiDashboardLine } from 'react-icons/ri'
import { BsPeople, BsCircle, BsBox } from "react-icons/bs";
import { MdProductionQuantityLimits } from "react-icons/md";
import { Accordion } from 'react-bootstrap';

const AdminLayout = (props) => {
    let sideNavRef = useRef();
    let contentRef = useRef();
    let topNavRef = useRef();

    const OnMenuClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        const topNav = topNavRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
            topNav.classList.add('top-nav-close')
            topNav.classList.remove('top-nav-open')
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
            topNav.classList.add('top-nav-open')
            topNav.classList.remove('top-nav-close')
        }
    };

    const Logout = async () => {
        const res = await LogoutAlert();
        if (res.isConfirmed) {
            RemoveUser();
            SuccessToast("Successfully Logout")
        }
    }

    const sidebarItems = [
        {
            title: 'Dashboard',
            url: '/Dashboard/Admin',
            submenu: [],
            icon: <RiDashboardLine className='side-bar-item-icon'></RiDashboardLine>
        },
        {
            title: 'Category',
            url: '/Dashboard/Category',
            icon: <BsBox className='side-bar-item-icon'></BsBox>,
            submenu: [
                {
                    title: 'New Category',
                    url: '/Dashboard/CategoryCreateUpdate',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>
                },
                {
                    title: 'Category List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/Dashboard/CategoryList'
                }
            ]
        },
        {
            title: 'Product',
            url: '/Dashboard/Product',
            icon: <MdProductionQuantityLimits className='side-bar-item-icon'></MdProductionQuantityLimits>,
            submenu: [
                {
                    title: 'New Product',
                    url: '/Dashboard/ProductCreateUpdate',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>
                },
                {
                    title: 'Product List',
                    icon: <BsCircle size={16} className='side-bar-subitem-icon'></BsCircle>,
                    url: '/Dashboard/ProductList'
                }
            ]
        }
    ]

    const IsSidebarAccordionActive = () => {
        let urlList = [];
        sidebarItems.map((item) => {
            urlList.push(
                item.submenu.map((subitem) => {
                    return subitem?.url
                })
            )
        })

        return urlList.findIndex((item) =>
            item.includes(window.location.pathname)
        )
    }
    return (
        <div>
            <Navbar className='fixed-top px-0 shadow-sm'>
                <Container fluid={true}>
                    <Navbar.Brand>
                        <div ref={(div) => topNavRef = div} className='top-nav-open'>
                            <h4 className='text-white p-0 m-0'><a onClick={OnMenuClickHandler}><AiOutlineMenu></AiOutlineMenu></a></h4>
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
                                    <NavLink to='/Dashboard/Admin/Profile' className='side-bar-item'>
                                        <AiOutlineUser className='side-bar-item-icon'></AiOutlineUser>
                                        <span className='side-bar-item-caption'>Profile</span>
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

            <div ref={(div) => sideNavRef = div} className='side-nav-open'>
                <NavLink className='d-flex justify-content-center sticky-top bg-white'>
                    <img src={logo} className='icon-nav-img-lg mt-3'></img>
                </NavLink>

                <Accordion defaultActiveKey={`${IsSidebarAccordionActive()}`}>
                    {
                        sidebarItems.map((item, index) => {
                            return item.submenu.length !== 0 ? (
                                <Accordion.Item key={index.toString()} eventKey={`${index}`} className='mt-2'>
                                    <Accordion.Header>
                                        <div className='side-bar-item'>
                                            {item.icon}
                                            <span className='side-bar-item-caption'>{item.title}</span>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {
                                            item.submenu.map((subitem, index) => (
                                                <NavLink key={index.toString()}
                                                    to={subitem.url}
                                                    className={(navData) =>
                                                        navData.isActive ? 'side-bar-subitem-active side-bar-subitem'
                                                            : 'side-bar-subitem'}>
                                                    {subitem.icon}
                                                    <span className='side-bar-subitem-caption'>{subitem.title}</span>
                                                </NavLink>
                                            ))
                                        }
                                    </Accordion.Body>
                                </Accordion.Item>

                            ) : (
                                <NavLink
                                    to='/'
                                    className={(navData) =>
                                        navData.isActive ? 'side-bar-item-active side-bar-item mt-2' : 'side-bar-item mt-2'
                                    }>
                                    {item.icon}
                                    <span className='side-bar-item-caption'>{item.title}</span>
                                </NavLink>
                            )

                        })
                    }
                </Accordion>

                <NavLink to='/Dashboard/Admin/Profile' className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2"}>
                    <AiOutlineUser className='side-bar-item-icon'></AiOutlineUser>
                    <span className='side-bar-item-caption'>Profile</span>
                </NavLink>

                <a className='side-bar-item'>
                    <AiOutlineLogout className='side-bar-item-icon'></AiOutlineLogout>
                    <span onClick={Logout} className='side-bar-item-caption'>Logout</span>
                </a>
            </div>

            <div ref={(div) => contentRef = div} className='content'>
                {props.children}
            </div>
        </div>
    );
};

export default AdminLayout;