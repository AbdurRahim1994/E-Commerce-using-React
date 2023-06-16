import React, { lazy } from 'react';
import LazyLoader from '../../components/Masterlayout/LazyLoader'
import { Suspense } from 'react';
const NotFound = lazy(() => import('../../components/NotFound/NotFound'))

const NotFoundPage = () => {
    return (
        <div>
            <Suspense fallback={<LazyLoader></LazyLoader>}>
                <NotFound></NotFound>
            </Suspense>
        </div>
    );
};

export default NotFoundPage;