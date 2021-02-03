import React from "react";
import Image from "next/image";
import { urlFor } from "@libs/sanity";
import getYouTubeId from "get-youtube-id";
import YouTube from "react-youtube";
import PortableText from "@sanity/block-content-to-react";
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

export default function PostDetail(props) {
  const { title, slug, coverImage, publishedAt, category, content } = props;

  return (
    <>
      <div className="relative py-16 bg-white overflow-hidden">
        <div className="hidden lg:block lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div
            className="relative h-full text-lg max-w-prose mx-auto"
            aria-hidden="true"
          >
            <svg
              className="absolute top-12 left-full transform translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full transform translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto">
            <Image
              className="w-full rounded-lg"
              src={urlFor(coverImage).url()}
              alt="Cover Image"
              width="1310"
              height="873"
            />
            <h1>
              <span className="mt-6 block text-base text-center text-indigo-600 font-semibold tracking-wide uppercase">
                {category.category}
              </span>
              <span className="mt-3 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                {title}
              </span>
              <span className="mt-3 block text-base text-center text-gray-500 font-medium tracking-wide uppercase">
                <time dateTime={new Date(publishedAt).toDateString()}>
                  {format(new Date(publishedAt), "MM/dd/yyyy")}
                </time>
              </span>
            </h1>
            <PortableText
              blocks={content}
              serializers={serializers}
              className="mt-8 text-xl text-gray-500 leading-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
