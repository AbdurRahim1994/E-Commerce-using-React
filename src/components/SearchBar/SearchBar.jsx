import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom'
import { useState } from 'react';
import { ProductListRequest } from '../../APIRequest/ProductAPIRequest';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart, AiOutlineSearch } from 'react-icons/ai'
import { Badge } from 'antd'

const SearchBar = () => {
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

    return (
        <div>
            <Navbar bg="light" expand="lg" className='mt-5'>
                <Container>
                    <div className='input-group m-2'>
                        <input onChange={OnSearchKeywordChange} type='text' placeholder='Search...' className='form-control'></input>
                        <button onClick={OnSearchClick} className='btn btn-success btn-sm mb-0'>
                            <AiOutlineSearch size={20}></AiOutlineSearch>
                        </button>
                        <span className='ms-3 mt-1 text-primary'>
                            <Badge count={CartList.length >= 1 ? CartList.length : 0} offset={[0, 1]} showZero={true} color='green'>
                                <NavLink to='/Dashboard/Cart' className='text-primary'>
                                    <AiOutlineShoppingCart size={25}></AiOutlineShoppingCart>
                                </NavLink>
                            </Badge>
                        </span>
                    </div>
                </Container>
            </Navbar>
        </div>
    );
};

export default SearchBar;