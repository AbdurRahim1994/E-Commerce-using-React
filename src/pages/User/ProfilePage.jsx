import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/Masterlayout/LazyLoader'
import UserLayout from '../../components/Masterlayout/UserLayout';
import AdminLayout from '../../components/Masterlayout/AdminLayout';
import { GetToken, GetUserDetail } from '../../helpers/SessionHelper';
const Profile = lazy(() => import('../../components/User/Profile'))

const ProfilePage = () => {
    const token = GetToken()
    const user = GetUserDetail()

    if (token && user.role === 1) {
        return (
            <div>
                <AdminLayout>
                    <Suspense fallback={<LazyLoader></LazyLoader>}>
                        <Profile></Profile>
                    </Suspense>
                </AdminLayout>
            </div>
        );
    }
    else if (token && user.role === 0) {
        return (
            <div>
                <UserLayout>
                    <Suspense fallback={<LazyLoader></LazyLoader>}>
                        <Profile></Profile>
                    </Suspense>
                </UserLayout>
            </div>
        );
    }
};

export default ProfilePage;