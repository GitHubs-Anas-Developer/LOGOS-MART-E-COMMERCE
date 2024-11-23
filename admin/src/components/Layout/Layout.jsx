import React from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Footer from "./footer/Footer";

function Layouts({ children }) {
  return (
    <>
      <Header />
      <div className="layout-body flex">
        <Sidebar />
        <main className="content bg-slate-50 flex-grow p-4">
          {children} {/* Renders the content of the child components */}
        </main>
      </div>
    </>
  );
}

export default Layouts;
