export const ADD_ROUTE_NAME = '[Layout] ADD_ROUTE_NAME';

export function addRouteName(route, name) {
  return {
    type: ADD_ROUTE_NAME,
    route, name
  }
}