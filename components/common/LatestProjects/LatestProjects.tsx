import { urlFor } from "@libs/sanity";
import Link from "next/link";

export default function LatestProjects(props) {
  const { projects } = props;
  return (
    <>
      {/* Projects */}
      <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
        <div className="relative">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-start">
            <span className="pr-3 bg-gray-100 text-base font-medium text-gray-900 uppercase">
              Projects
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <Link href={`/project/${encodeURIComponent(project.slug.current)}`}>
              <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                <div className="flex-shrink-0">
                  <img
                    className="h-12 w-12 rounded-full"
                    src={urlFor(project.icon).url()}
                    alt="App icon"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <a href="#" className="focus:outline-none">
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                    <p className="text-base font-medium text-gray-900">
                      {project.title}
                    </p>
                    <p className="text-base text-gray-500 truncate">
                      {project.description}
                    </p>
                  </a>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
