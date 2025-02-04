import React, { Suspense } from 'react'
import Home1Page from './girltopsection/page'
import Home from './cards/page'
import Green from './greense/page'
import White from './whitesec/page'

const Loading = () => <div>Loading...</div>;

const Alishba = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Home1Page />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Home />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <Green />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <White />
      </Suspense>
    </div>
  )
}

export default Alishba;
