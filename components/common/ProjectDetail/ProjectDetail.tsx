import { urlFor, sanityClient } from "@libs/sanity";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import PortableText from "@sanity/block-content-to-react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { ScreenshotSlider } from "@components/common/";
import { format } from "date-fns";

const serializers = {
  types: {
    youtube: ({ node }) => {
      const { url } = node;
      const id = getYouTubeId(url);
      return <YouTube videoId={id} />;
    },
    block(props) {
      switch (props.node.style) {
        case "h1":
          return <h1>{props.children}</h1>;
        default:
          return <p className="mt-3">{props.children}</p>;
      }
    },
  },
};

export default function ProjectDetail(props) {
  const {
    title,
    slug,
    language,
    components,
    architecture,
    backend,
    icon,
    screenshots,
    publishedAt,
    description,
    links,
  } = props;

  return (
    <>
      <div className="min-h-screen bg-gray-100">
        <main className="py-10">
          {/* <!-- Project header --> */}
          <div className="max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={urlFor(icon).url()}
                    alt="App icon"
                  />
                  <span
                    className="absolute inset-0 shadow-inner rounded-full"
                    aria-hidden="true"
                  ></span>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                <p className="text-base font-medium text-gray-500">
                  Published:{" "}
                  <time dateTime={new Date(publishedAt).toDateString()}>
                    {format(new Date(publishedAt), "MMMM yyyy")}
                  </time>
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-col-reverse justify-stretch space-y-4 space-y-reverse sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              {links.map((link) => (
                <a
                  href={link.url}
                  target="_blank"
                  className={
                    link.title == "Github"
                      ? "inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
                      : "inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  }
                >
                  {/* Heroicon */}
                  <svg
                    className="-ml-1 mr-2 h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d={link.icon}
                      clip-rule="evenodd"
                    />
                  </svg>
                  <span>{link.title}</span>
                </a>
              ))}
            </div>
          </div>

          <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1 lg:col-span-2">
              {/* <!-- Description list--> */}
              <section aria-labelledby="applicant-information-title">
                <div className="bg-white shadow sm:rounded-lg">
                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-base font-medium text-gray-900">
                          Language
                        </dt>
                        <dd className="mt-1 text-base text-gray-500">
                          {language}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-base font-medium text-gray-900">
                          Android
                        </dt>
                        <dd className="mt-1 text-base text-gray-500">
                          {components}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-base font-medium text-gray-900">
                          Architecture
                        </dt>
                        <dd className="mt-1 text-base text-gray-500">
                          {architecture}
                        </dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-base font-medium text-gray-900">
                          Backend
                        </dt>
                        <dd className="mt-1 text-base text-gray-500">
                          {backend}
                        </dd>
                      </div>
                      <div className="sm:col-span-2">
                        <div className="relative">
                          <div
                            className="absolute inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-start">
                            <span className="pr-2 bg-white font-semibold text-base text-gray-900">
                              Description
                            </span>
                          </div>
                        </div>
                        <PortableText
                          blocks={description}
                          serializers={serializers}
                          className="mt-1 text-base text-gray-500"
                        />
                      </div>
                    </dl>
                  </div>
                </div>
              </section>
            </div>

            <section
              aria-labelledby="timeline-title"
              className="lg:col-start-3 lg:col-span-1"
            >
              <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
                <h2
                  id="timeline-title"
                  className="text-lg mb-6 font-medium text-gray-900"
                >
                  Screenshots
                </h2>

                {/* <!-- Screenshots --> */}
                <ScreenshotSlider screenshots={screenshots} />
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  );
}
