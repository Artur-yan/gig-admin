import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { selectRoutes } from '../redux/selectors';
import { connect } from 'react-redux';

const getPaths = (pathname) => {
  const paths = ['/'];

  if (pathname === '/') return paths;

  pathname.split('/').reduce((prev, curr, index) => {
    const currPath = `${prev}/${curr}`;
    paths.push(currPath);
    return currPath;
  });
  return paths;
};

@connect(
  (state) => ({
    routes: selectRoutes(state)
  })
)
class BreadcrumbsItem extends Component {
  render() {
    const { routes, match } = this.props;
    const routeName = routes.get(match.url);

    if (routeName) {
      return (
        match.isExact ?
          (
            <BreadcrumbItem active>{routeName}</BreadcrumbItem>
          ) :
          (
            <BreadcrumbItem>
              <Link to={match.url || ''}>
                {routeName}
              </Link>
            </BreadcrumbItem>
          )
      );
    }
    return null;
  }
}

const Breadcrumbs = ({...rest, location : {pathname}, match}) => {
  const paths = getPaths(pathname);
  const items = paths.map((path, i) => <Route key={i++} path={path} component={BreadcrumbsItem}/>);
  return (
    <Breadcrumb>
      {items}
    </Breadcrumb>
  );
};

export default props => (
  <div>
    <Route path="/:path" component={Breadcrumbs} {...props} />
  </div>
);
