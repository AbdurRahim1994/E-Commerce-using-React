import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/Masterlayout/LazyLoader'
import UserLayout from '../../components/Masterlayout/UserLayout';
const ProductView = lazy(() => import('../../components/Product/ProductView'))
const ProductViewPage = () => {
    return (
        <div>
            <UserLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ProductView></ProductView>
                </Suspense>
            </UserLayout>
        </div>
    );
};

export default ProductViewPage;