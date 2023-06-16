import React, { Suspense, lazy } from 'react';
import AdminLayout from '../../components/Masterlayout/AdminLayout'
import LazyLoader from '../../components/Masterlayout/LazyLoader'
const ProductList = lazy(() => import('../../components/Product/ProductList'))

const ProductListPage = () => {
    return (
        <div>
            <AdminLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ProductList></ProductList>
                </Suspense>
            </AdminLayout>
        </div>
    );
};

export default ProductListPage;