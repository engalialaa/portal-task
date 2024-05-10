import { createBrowserRouter, Outlet } from "react-router-dom";
import React from "react";
import { AuthLayout } from "../pages/Auth/AuthLayout";
import { Login } from "../pages/Auth/Login";
import { Layout } from "../pages/Layout";
import { Posts } from "../pages/Post";
import {Home} from "react-feather";
import {HomePage} from "../pages/admin/Home";

export const router: any = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <AuthLayout>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "dashboard",
        element: (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        ),
        children: [
          {
            index: true,
            element: <HomePage />
          },
        ],
      },

      {
        path: "posts",
        element: (
          <AuthLayout>
            <Outlet />
          </AuthLayout>
        ),
        children: [
          {
            index: true,
            element: <Posts />,
          },
        ],
      },
    ],
  },
]);
