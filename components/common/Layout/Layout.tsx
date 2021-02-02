import { FC, useState } from "react";

export default function Layout({ children }) {
  return (
    <>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main
              className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last"
              tabIndex={0}
            >
              <article>{children}</article>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
