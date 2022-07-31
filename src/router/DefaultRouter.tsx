import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isLoggedInAtom } from "../store/atom";
import Login from "../pages/Login";
import Todos from "../pages/Todos";

const ROUTE_PATH_LOGIN = "/login";
const ROUTE_PATH_TODOS = "/";

export default function DefaultRouter() {
  const isLoggedIn = useRecoilValue<boolean>(isLoggedInAtom);
  return (
    <Routes>
      <Route
        path={ROUTE_PATH_LOGIN}
        element={
          <RoutePage
            defaultElement={<Login />}
            needNavigate={isLoggedIn}
            navigateURL={ROUTE_PATH_TODOS}
          />
        }
      />
      <Route
        path={ROUTE_PATH_TODOS}
        element={<AuthPage defaultElement={<Todos />} isLoggedIn={isLoggedIn} />}
      />
    </Routes>
  );
}

interface IRoutePage {
  defaultElement: JSX.Element;
  needNavigate: boolean;
  navigateURL: string;
}
function RoutePage({ defaultElement, needNavigate, navigateURL }: IRoutePage) {
  if (needNavigate) return <Navigate to={navigateURL} replace />;
  else return defaultElement;
}

interface IAuthPage {
  defaultElement: JSX.Element;
  isLoggedIn: boolean;
}
function AuthPage({ defaultElement, isLoggedIn }: IAuthPage) {
  return (
    <RoutePage
      defaultElement={defaultElement}
      needNavigate={!isLoggedIn}
      navigateURL={ROUTE_PATH_LOGIN}
    />
  );
}
