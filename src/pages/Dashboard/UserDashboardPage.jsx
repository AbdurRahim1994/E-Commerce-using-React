import React, { Suspense, lazy } from 'react';
import UserLayout from '../../components/Masterlayout/UserLayout';
import LazyLoader from '../../components/Masterlayout/LazyLoader';
const UserDashboard = lazy(() => import('../../components/Dashboard/UserDashboard'))

const UserDashboardPage = () => {
    return (
        <div>
            <UserLayout>
                <Suspense fallback={<LazyLoader></LazyLoader>}>
                    <UserDashboard></UserDashboard>
                </Suspense>
            </UserLayout>
        </div>
    );
};

export default UserDashboardPage;