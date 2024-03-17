import React from "react";
import { Routes, Route } from "react-router-dom";
import { RouteSetting } from "utils/RouteSetting";

export const RoutesComponent = () => {
  return (
    <Routes>
      {
        // RouteSetting.jsを展開
        RouteSetting.map((route, index) => {
          return (
            <Route key={index} path={route.path} element={route.component} />
          );
        })
      }
    </Routes>
  );
};
