import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/Masterlayout/LazyLoader'
const Login = lazy(() => import('../../components/User/Login'))

const LoginPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader></LazyLoader>}>
                <Login></Login>
            </Suspense>
        </div>
    );
};

export default LoginPage;