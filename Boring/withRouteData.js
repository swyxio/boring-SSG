import React from 'react';
const RouteDataContext = React.createContext(null);

// for SSR providing
export const RouteDataProvider = RouteDataContext.Provider;
// for SSR consuming (faac!)
export const RouteData = RouteDataContext.Consumer;
// for HOC version
export const withRouteData = Comp => {
  return <RouteData>{data => <Comp {...data} />}</RouteData>;
};
