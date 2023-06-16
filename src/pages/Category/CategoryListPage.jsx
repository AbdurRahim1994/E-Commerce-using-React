import React, { Suspense, lazy } from 'react';
import AdminLayout from '../../components/Masterlayout/AdminLayout'
import LazyLoader from '../../components/Masterlayout/LazyLoader'
const CategoryList = lazy(() => import('../../components/Category/CategoryList'))

const CategoryListPage = () => {
    return (
        <div>
            <AdminLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <CategoryList></CategoryList>
                </Suspense>
            </AdminLayout>
        </div>
    );
};

export default CategoryListPage;