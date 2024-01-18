import { Link, NotFoundRoute, Outlet, Register, RootRoute, Route, Router } from '@tanstack/react-router';
import Overlay from 'components/TransitionOverlay';
import { VisitorMice } from 'components/liveMouse';
import { About } from 'pages/about';
import BlogArticle from 'pages/blog/article/article';
import Blog from 'pages/blog/blog';
import { Contact } from 'pages/contact/contact';
import Home from 'pages/home/home';
import Login from 'pages/login/login';
import Subdomains from 'pages/subdomains/subdomains';
import React, { Suspense } from 'react';

const TanStackRouterDevtools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      )

const rootRoute = new RootRoute({
  component: () => (
    <Suspense fallback={null}>
      <VisitorMice>
        <Outlet />
        <TanStackRouterDevtools />
      </VisitorMice>
    </Suspense>
  ),
});

const routes = {
  home: new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Home,
  }),
  about: new Route({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: About,
  }),
  contact: new Route({
    getParentRoute: () => rootRoute,
    path: '/contact',
    component: Contact,
  }),
  login: new Route({
    getParentRoute: () => rootRoute,
    path: '/login',
    component: Login,
  }),
  subdomains: new Route({
    getParentRoute: () => rootRoute,
    path: '/subdomains',
    component: Subdomains,
  }),
  blog: new Route({
    getParentRoute: () => rootRoute,
    path: '/blog',
    component: Blog,
  }),
  blogArticle: new Route({
    getParentRoute: () => rootRoute,
    path: '/blog/$post',

    component: BlogArticle,
  }),
};

const routeTree = rootRoute.addChildren([
  routes.home,
  routes.about,
  routes.contact,
  routes.login,
  routes.subdomains,
  routes.blog,
  routes.blogArticle,
])

export const router = new Router({
  notFoundRoute: new NotFoundRoute({
    getParentRoute: () => rootRoute,
    component: Home,
  }),
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}