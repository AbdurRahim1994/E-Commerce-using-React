import React, { Suspense, lazy } from 'react';
import AdminLayout from '../../components/Masterlayout/AdminLayout'
import LazyLoader from '../../components/Masterlayout/LazyLoader'
const AdminDashboard = lazy(() => import('../../components/Dashboard/AdminDashboard'))

const AdminDashboardPage = () => {
    return (
        <div>
            <AdminLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <AdminDashboard></AdminDashboard>
                </Suspense>
            </AdminLayout>
        </div>
    );
};

export default AdminDashboardPage;