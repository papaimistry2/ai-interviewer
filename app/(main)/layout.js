import React from "react";
import DashboaedProvider from "./provider";

function DashbordLayout({ children }) {
  return (
    <div>
      <DashboaedProvider>
        <div className="p-10">
          {children}
        </div>
        </DashboaedProvider>
    </div>
  );
}

export default DashbordLayout;
