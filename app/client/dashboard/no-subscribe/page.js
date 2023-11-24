import React from "react";
import NoSubscribe from "./no-subscribe";
import LayoutClient from "../../components/LayoutClient";

const Page = () => {
  return (
    <LayoutClient>
      <main className="contenedor">
        <NoSubscribe />
      </main>
    </LayoutClient>
  );
};

export default Page;
