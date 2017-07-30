import React from 'react';

const isProd = (process.env.NODE_ENV === 'production');

const App = () => {
  if (isProd) {
      return <div>Hello React App!</div>
  }
  return <div>I'm React Hot Loader! Change me in the source and see I'm hot!</div>
};

export default App
