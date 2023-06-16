import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/Masterlayout/LazyLoader'
import UserLayout from '../../components/Masterlayout/UserLayout';
const Cart = lazy(() => import("../../components/Cart/Cart"))

const CartPage = () => {
    return (
        <div>
            <UserLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <Cart></Cart>
                </Suspense>
            </UserLayout>
        </div>
    );
};

export default CartPage;