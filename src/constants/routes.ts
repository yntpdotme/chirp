import type {Route} from "next";

const ROUTES = {
  HOME: "/" as Route,
  PROFILE: (username: string) => `/profile/${username}` as Route,
  POST: (id: string) => `/posts/${id}` as Route,
};

export default ROUTES;
