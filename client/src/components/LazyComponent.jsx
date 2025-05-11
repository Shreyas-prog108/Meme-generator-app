import React, { Suspense, lazy } from "react";

const HeavyComponent = lazy(() => import("./LazyComponent"));



function MyComponent() {
  return (
    <Suspense fallback={<div>Loading Component...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}

export default MyComponent;