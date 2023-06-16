import React, { Suspense, lazy } from 'react';
import AdminLayout from '../../components/Masterlayout/AdminLayout'
import LazyLoader from '../../components/Masterlayout/LazyLoader'
const CategoryCreateUpdate = lazy(() => import('../../components/Category/CategoryCreateUpdate'))

const CategoryCreateUpdatePage = () => {
    return (
        <div>
            <AdminLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <CategoryCreateUpdate></CategoryCreateUpdate>
                </Suspense>
            </AdminLayout>
        </div>
    );
};

export default CategoryCreateUpdatePage;