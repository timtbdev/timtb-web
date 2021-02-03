import { Layout, PostHeader, Profile } from "@components/common/";
import { groq } from "next-sanity";
import { getClient, usePreviewSubscription } from "@libs/sanity";
import Error from "next/error";
import { useRouter } from "next/router";
import { Posts } from "@components/common/";
import { Tabs } from "@components/common/";
import { Footer } from "@components/common/";

const postsQuery = groq`*[_type == "blog" && defined(slug.current)]`;

const profileQuery = groq`
  *[_type == "profile"][0] {
    name,
    profileImage,
    coverImage,
    links[]->{title, url, icon},
  }
`;

export async function getStaticProps({ params = {}, preview = false }) {
  const postsData = await getClient(preview).fetch(postsQuery);
  const profileData = await getClient(preview).fetch(profileQuery);
  return {
    props: { preview, postsData, profileData },
  };
}

export default function Blog(props) {
  const { postsData, profileData, preview } = props;
  const router = useRouter();

  if (!router.isFallback && !postsData && !profileData) {
    return <Error statusCode={404} />;
  }
  const { data: posts } = usePreviewSubscription(postsQuery, {
    initialData: postsData,
    enabled: preview || router.query.preview !== null,
  });

  const { data: profile } = usePreviewSubscription(profileQuery, {
    initialData: profileData,
    enabled: preview || router.query.preview !== null,
  });

  const { name, profileImage, coverImage, links } = profile;
  return (
    <>
      <Layout>
        <Profile
          name={name}
          profileImage={profileImage}
          coverImage={coverImage}
          links={links}
        />
        <Tabs />
        <Posts posts={posts} />
        <Footer />
      </Layout>
    </>
  );
}
