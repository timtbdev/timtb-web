import { urlFor, sanityClient } from "@libs/sanity";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";

export default function Profile(props) {
  const { name, profileImage, coverImage, links } = props;
  return (
    <>
      {/* Profile header */}
      <div>
        <div>
          <img
            className="h-28 w-full object-cover lg:h-28"
            src={urlFor(coverImage).url()}
            alt="Cover photo"
          />
        </div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={urlFor(profileImage).url()}
                alt="Profile photo"
              />
              <Image
                {...useNextSanityImage(sanityClient, profileImage)}
                sizes="(max-width: 128px) 9vw, 128px"
              />
            </div>
            <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                <h1 className="text-2xl font-bold text-gray-900 truncate">
                  {name}
                </h1>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                {links.map((link) => (
                  <a
                    href={link.url}
                    target="_blank"
                    className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    {/* Heroicon */}
                    <svg
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
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
          </div>
          <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-gray-900 truncate">
              {name}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}
