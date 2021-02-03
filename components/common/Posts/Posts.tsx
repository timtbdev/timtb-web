import { urlFor } from "@libs/sanity";
import Link from "next/link";
import { useState } from "react";
import PortableText from "@sanity/block-content-to-react";
import { format } from "date-fns";

const serializers = {
  types: {
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

export default function Posts({ posts }) {
  return (
    <>
      <div className="mt-3 mb-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 divide-y-2 divide-gray-200">
        {posts.map((post) => (
          <div className="mt-6 px-4 py-5 sm:px-6 lg:px-8 bg-white shadow overflow-hidden sm:rounded-lg">
            <p className="text-sm text-gray-500">
              <time dateTime={new Date(post.publishedAt).toDateString()}>
                {format(new Date(post.publishedAt), "mm/dd/yyyy")}
              </time>
            </p>
            <Link href={`/blog/${encodeURIComponent(post.slug.current)}`}>
              <a className="mt-2 block ">
                <p className="text-xl font-semibold text-gray-900">
                  {post.title}
                </p>
              </a>
            </Link>
            <p className="mt-3 text-base text-gray-500">
              <PortableText
                blocks={post.shortDescription}
                serializers={serializers}
                className="mt-1 text-base text-gray-500 line-clamp-3"
              />
            </p>
            <div className="mt-3">
              <Link href={`/blog/${encodeURIComponent(post.slug.current)}`}>
                <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                  Read more →
                </a>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
