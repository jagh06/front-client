import React from "react";
import AdministrationPanel from "./administration-panel";
import LayoutClient from "../../components/LayoutClient";

const Page = () => {
  return (
    <LayoutClient>
      <main className="contenedor">
        <AdministrationPanel />
      </main>
    </LayoutClient>
  );
};

export default Page;
