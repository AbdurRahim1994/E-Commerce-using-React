import React, { Suspense, lazy } from 'react';
import AdminLayout from '../../components/Masterlayout/AdminLayout'
import LazyLoader from '../../components/Masterlayout/LazyLoader'
const ProductCreateUpdate = lazy(() => import('../../components/Product/ProductCreateUpdate'))

const ProductCreateUpdatePage = () => {
    return (
        <div>
            <AdminLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <ProductCreateUpdate></ProductCreateUpdate>
                </Suspense>
            </AdminLayout>
        </div>
    );
};

export default ProductCreateUpdatePage;