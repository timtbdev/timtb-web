import { FC, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { urlFor } from "@libs/sanity";

export default function ProjectHeader(props) {
  const { name, profileImage } = props;
  const router = useRouter();
  const path = router.pathname;
  console.log(path);

  return (
    <>
      <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
        <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1"></div>
      </div>

      {/* Tabs */}
      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <div className="border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-2">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={urlFor(profileImage).url()}
                    alt="Profile image"
                  />
                  <span
                    className="absolute inset-0 shadow-inner rounded-full"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
              </div>
            </div>
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              {/* Current: "border-pink-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
              <Link href="/">
                <a
                  className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base"
                  aria-current="page"
                >
                  About
                </a>
              </Link>

              <a
                className={
                  path == "/project/[slug]"
                    ? "border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                }
              >
                Project
              </a>

              <Link href="/blog">
                <a
                  className={
                    path == "/blog/[slug]"
                      ? "border-pink-500 text-gray-900 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base"
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
