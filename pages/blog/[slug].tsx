import { PostDetail } from "@components/common/";
import { groq } from "next-sanity";
import { getClient, usePreviewSubscription } from "@libs/sanity";
import Error from "next/error";
import { useRouter } from "next/router";
import { PostHeader } from "@components/common/";
import { Footer } from "@components/common/";

const postQuery = groq`*[_type == "blog" && slug.current == $slug][0]
{
  title,
  slug,
  coverImage,
  publishedAt,
  category->{category},
  content
}
`;

const profileQuery = groq`
  *[_type == "profile"][0] {
    name,
    profileImage
  }
`;

export async function getStaticProps({ params, preview = false }) {
  const postData = await getClient(preview).fetch(postQuery, {
    slug: params.slug,
  });
  const profileData = await getClient(preview).fetch(profileQuery);

  return {
    props: { preview, postData, profileData },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "blog" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default function Blog(props) {
  const { postData, profileData, preview } = props;
  const router = useRouter();

  if (!router.isFallback && !postData) {
    return <Error statusCode={404} />;
  }
  const { data: post } = usePreviewSubscription(postQuery, {
    params: { slug: postData?.slug?.current },
    initialData: postData,
    enabled: preview || router.query.preview !== null,
  });

  const { data: profile } = usePreviewSubscription(profileQuery, {
    initialData: profileData,
    enabled: preview || router.query.preview !== null,
  });

  const { title, slug, coverImage, publishedAt, category, content } = post;

  const { name, profileImage } = profile;
  return (
    <>
      <PostHeader name={name} profileImage={profileImage} />
      <PostDetail
        title={title}
        slug={slug}
        coverImage={coverImage}
        publishedAt={publishedAt}
        category={category}
        content={content}
      />
      <Footer />
    </>
  );
}
