import Immutable from 'immutable';
import { ADD_ROUTE_NAME } from './actions';

const initialState = Immutable.fromJS({
  routes: {
    '/': 'Home',
    '/customers': 'Customers',
    '/upgrade-requests': 'Upgrade Requests',
    '/templates': 'Templates',
    '/storefront/featured-products': 'Featured Products',
    '/storefront/slides': 'Slides',
    '/product-categories': 'Product Categories',
    '/product-types': 'Product Types',
    '/product-types/create': 'Create New Product Type',
    '/products': 'Products',
    '/products/create': 'Create New Product'
  }
});

export default function reducer (state = initialState, action) {
  switch(action.type) {
    /**
     * Routes
     */
    case ADD_ROUTE_NAME:
      return state.update('routes', routes => routes.set(action.route, action.name));
    default:
      return state;
  }
}
