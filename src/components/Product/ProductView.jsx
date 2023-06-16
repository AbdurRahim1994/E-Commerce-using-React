import React, { useEffect } from 'react';
import { ProductById, RelatedProduct } from '../../APIRequest/ProductAPIRequest';
import { useSelector } from 'react-redux';
import { AiOutlineShoppingCart } from 'react-icons/ai'
import store from '../../redux/store/store';
import { SetCartList } from '../../redux/state-slice/cart-slice';
import SearchBar from '../SearchBar/SearchBar';

const ProductView = () => {
    const param = new URLSearchParams(window.location.search)
    const productId = param.get('productId')
    const categoryId = param.get('categoryId')

    useEffect(() => {
        if (productId) {
            ProductById(productId)
        }
    }, [])

    const product = useSelector((state) => state?.product?.ProductFormValue);

    useEffect(() => {
        if (categoryId && productId) {
            RelatedProduct(categoryId, productId)
        }
    }, [])

    const RelateableProduct = useSelector((state) => state?.product?.ProductList);

    return (
        <div>
            <SearchBar></SearchBar>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-10 ms-8 mt-3'>
                        <div className='card'>
                            <div className='card-body'>
                                <div className='row'>
                                    <div className='col-lg-4'>
                                        <img src={`data:${product.contentType};base64,${product.imagePreview}`} height={200} width={200} alt=''></img>
                                    </div>
                                    <div className='col-lg-4'>
                                        <h4 style={{ color: "black" }}>{product?.title}</h4>
                                        <h5>Category : <span className='text-primary'>{product?.category}</span></h5>
                                        <h4>Price : <span className='text-primary'>TK. {product?.price}</span></h4>
                                        <button onClick={() => store.dispatch(SetCartList(product))} className='btn btn-warning w-50 text-white'>
                                            <AiOutlineShoppingCart size={22}></AiOutlineShoppingCart> Add to Cart
                                        </button>
                                    </div>
                                    <div className='col-lg-4'>
                                        <h5 className='font-weight-bolder'>Related Products</h5>
                                        {
                                            RelateableProduct.map((r, i) =>
                                                <div className='row'>
                                                    <div className='col-lg-4'>
                                                        <img src={`data:${r.image.contentType};base64,${r.image.data}`} height={50} width={50} alt=''></img>
                                                    </div>
                                                    <div className='col-lg-8'>
                                                        <h5 className='font-weight-bolder'>{r.title}</h5>
                                                        <h6 className='text-secondary text-xs font-weight-bolder'>{r.Category[0]['name']}</h6>
                                                        <h6 className='text-xs font-weight-bolder'>{r.price}</h6>
                                                    </div>
                                                </div>
                                            )
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

export default ProductView;