import React, { Suspense, lazy } from 'react';
import LazyLoader from '../../components/Masterlayout/LazyLoader'
const Home = lazy(() => import('../../components/Home/Home'))

const HomePage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader></LazyLoader>}>
                <Home></Home>
            </Suspense>
        </div>
    );
};

export default HomePage;