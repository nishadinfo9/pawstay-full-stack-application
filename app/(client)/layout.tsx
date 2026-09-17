import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <nav>navbar</nav>
      <main>{children}</main>
      <footer>footer</footer>
    </>
  );
};

export default layout;