import React, { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Loader from "./components/common/Loader";
import { userDetails } from "./recoil/atoms";

// Lazy load the components
const Home = lazy(() => import("./pages/Home"));
const ProjectsHome = lazy(() => import("./pages/ProjectsHome"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));

const RoutesComp = () => {
  const user = useRecoilValue(userDetails);

  const routes = [
    {
      path: "/",
      element: <Home />,
      protected: false,
    },
    {
      path: "/projects",
      element: <ProjectsHome />,
      protected: true,
    },
    {
      path: "/projects/:projectId",
      element: <MainLayout />,
      protected: true,
    },
  ];

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routes.map((route, index) => {
          // Protected routes
          if (route.protected) {
            return user._id ? (
              <Route key={index} path={route.path} element={route.element} />
            ) : (
              <Route
                key={index}
                path={route.path}
                element={<Navigate to="/" />}
              />
            );
          }
          return (
            <Route key={index} path={route.path} element={route.element} />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default RoutesComp;
