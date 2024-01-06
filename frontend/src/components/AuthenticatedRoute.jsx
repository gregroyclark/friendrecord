import { Redirect, Route } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to='/login' />
      }
    />
  );
};

export default AuthenticatedRoute;
