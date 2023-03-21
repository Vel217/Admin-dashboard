import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./input.css";
import SignIn from "./SignIn.jsx";
import Registration from "./Registration";
import UserList from "./UserList.jsx";
import ProtectRouters from "./ProtectRouters.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/reg" element={<Registration />} />
        <Route element={<ProtectRouters />}>
          <Route path="/list/*" element={<UserList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
