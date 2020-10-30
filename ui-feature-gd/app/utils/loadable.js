import React, { lazy, Suspense } from 'react';
import Loader from 'components/Loader/index';

const loadable = (importFunc, { fallback = null } = { fallback: <Loader/> }) => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={fallback}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
