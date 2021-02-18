import { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Tabs() {
  const path = useRouter().pathname;
  return (
    <>
      {/* Tabs */}
      <div className=" bg-white">
        <div className="border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {/* Current: "border-pink-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
              <Link href="/">
                <a
                  className={
                    path == "/"
                      ? "border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-base"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-base"
                  }
                  aria-current="page"
                >
                  About
                </a>
              </Link>

              <Link href="/project">
                <a
                  className={
                    path == "/project" || path == "/project/[slug]"
                      ? "border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-base"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-base"
                  }
                >
                  Projects
                </a>
              </Link>

              <Link href="/blog">
                <a
                  className={
                    path == "/blog"
                      ? "border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-base"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-semibold text-base"
                  }
                >
                  Writing
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
