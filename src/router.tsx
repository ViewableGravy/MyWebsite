import { NotFoundRoute, Outlet, RootRoute, Route, Router } from '@tanstack/react-router';
import { VisitorMice } from 'components/liveMouse';
import { About } from 'pages/about';
import BlogArticle from 'pages/blog/article/article';
import Blog from 'pages/blog/blog';
import { Contact } from 'pages/contact/contact';
import { Dashboard } from 'pages/dashboard';
import Login from 'pages/login/login';
import Subdomains from 'pages/subdomains/subdomains';
import React, { Suspense } from 'react';
import { DevTools } from 'jotai-devtools'

const TanStackRouterDevtools =
  import.meta.env.PROD
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
        <DevTools />
        <TanStackRouterDevtools position='bottom-right' />
      </VisitorMice>
    </Suspense>
  ),
});

const routes = {
  home: new Route({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Blog,
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
  dashboard: new Route({
    getParentRoute: () => rootRoute,
    path: '/dashboard',
    component: Dashboard,
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
  routes.dashboard,
])

export const router = new Router({
  notFoundRoute: new NotFoundRoute({
    getParentRoute: () => rootRoute,
    component: Blog,
  }),
  routeTree,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}