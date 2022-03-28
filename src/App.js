import logo from "./logo.svg";

import React from "react";
import Header from "./components/Header";

import { CgChevronRightR } from "react-icons/cg";

import "./App.css";
import Todolist from "./components/Todolist";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="main container ">
      <a className="btnParent" href="https://todolistzee.netlify.app">
        <button className="btn" type="button">
          <CgChevronRightR />
        </button>
      </a>

      <Header />

      <Todolist />

      <Nav />
    </div>
  );
}

export default App;
