import React from "react";
import Image from "next/image";
import { useNextSanityImage } from "next-sanity-image";
import { urlFor, sanityClient } from "@libs/sanity";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function ScreenshotSlider({ screenshots }) {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  return (
    <>
      <Carousel responsive={responsive}>
        {screenshots.map((screenshot) => (
          <div>
            <Image
              {...useNextSanityImage(sanityClient, screenshot.image)}
              sizes="(max-width: 300px) 20vw, 300px"
            />
          </div>
        ))}
      </Carousel>
    </>
  );
}
