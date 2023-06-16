import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { AiOutlineDelete } from 'react-icons/ai'
import empty from '../../assets/image/Empty_Cart.png'
import { BsCash } from 'react-icons/bs'
import { TbReplace } from 'react-icons/tb'
import { GiTakeMyMoney } from 'react-icons/gi'
import { MdProductionQuantityLimits } from 'react-icons/md'
import { GetToken, GetUserDetail } from '../../helpers/SessionHelper'
import SearchBar from '../SearchBar/SearchBar';

const Cart = () => {
    const token = GetToken()
    const user = GetUserDetail()

    const CartList = useSelector((state) => state?.cart?.CartList);

    let TotalPrice = 0;
    CartList.forEach((item) => TotalPrice += item.price)

    return (
        <div>
            <SearchBar></SearchBar>
            <div className='container-fluid'>
                {
                    CartList.length > 0 ?
                        <div className='row'>
                            <div className='col-lg-9 mt-5'>
                                <div className='row'>
                                    <div className='col-lg-12'>
                                        <div className='card'>
                                            <div className='card-body'>
                                                <div className='d-flex justify-content-between'>
                                                    <h4>Select Item ({CartList.length})</h4>
                                                    <h4>Your Total : <span className='text-success font-weight-bolder'>{TotalPrice}</span></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='row'>
                                    <div className='col-lg-12 mt-5'>
                                        <div className='card'>
                                            <div className='card-body'>
                                                {
                                                    CartList.map((c, i) =>
                                                        <div className='row'>
                                                            <div className='col-lg-3'>
                                                                {
                                                                    c.imagePreview ?
                                                                        <img height={80} width={80} src={`data:${c.contentType};base64,${c.imagePreview}`}></img>
                                                                        :
                                                                        <img height={80} width={80} src={`data:${c.contentType};base64,${c.image.data}`}></img>
                                                                }
                                                            </div>

                                                            <div className='col-lg-3'>
                                                                <div>
                                                                    <h4>{c.title}</h4>
                                                                    <h6>{c.category}</h6>
                                                                    <button className='btn btn-outline-warning btn-sm p-2 text-danger'>
                                                                        <AiOutlineDelete size={15}></AiOutlineDelete>
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div className='col-lg-3'>

                                                            </div>

                                                            <div className='col-lg-3'>

                                                            </div>
                                                        </div>
                                                    )
                                                }

                                                <hr className='bg-primary'></hr>
                                                <div className='d-flex justify-content-end'>
                                                    {
                                                        token && user.role === 0 ?
                                                            <NavLink className='btn btn-warning text-white'>
                                                                Place Order
                                                            </NavLink>
                                                            :
                                                            <NavLink to='/Login' className='btn btn-warning text-white'>
                                                                Place Order
                                                            </NavLink>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-3 mt-5'>
                                <div className='card'>
                                    <div className='card-body'>
                                        <h6><BsCash size={20}></BsCash> Cash On Delivery Available</h6>
                                        <h6><TbReplace size={20}></TbReplace> 7 Days Replacement Policy</h6>
                                        <h6><GiTakeMyMoney size={20}></GiTakeMyMoney> 100% Money Back Guarantee</h6>
                                        <h6><MdProductionQuantityLimits size={20}></MdProductionQuantityLimits> 100% Original Product</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div className='center-screen'>
                            <img src={empty}></img>
                            <h1>Your Cart is Empty !</h1>
                            <h4>You haven't order yet</h4>
                            <NavLink to='/' className='text-primary' style={{ fontSize: "30px" }}>Continue Shopping</NavLink>
                        </div>
                }
            </div>
        </div>
    );
};

export default Cart;