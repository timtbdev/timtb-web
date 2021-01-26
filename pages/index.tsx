import { Layout } from "@components/common/";
import { Profile } from "@components/common/";
import { Tabs } from "@components/common/";
import { About } from "@components/common/";
import { LatestProjects } from "@components/common/";
import { Footer } from "@components/common/";
import { groq } from "next-sanity";
import { getClient, usePreviewSubscription } from "@libs/sanity";
import Error from "next/error";
import { useRouter } from "next/router";

const query = groq`
  *[_type == "profile"][0] {
    name,
    profileImage,
    coverImage,
    links[]->{title, url, icon},
    skills,
    location,
    email,
    greeting,
    description,
    projects[]->{title, slug, description, icon},
  }
`;

export async function getStaticProps({ params = {}, preview = false }) {
  const profileData = await getClient(preview).fetch(query);
  return {
    props: {
      preview,
      profileData,
    },
  };
}

export default function Home(props) {
  const { profileData, preview } = props;
  const router = useRouter();

  if (!router.isFallback && !profileData) {
    return <Error statusCode={404} />;
  }
  const { data: profile } = usePreviewSubscription(query, {
    initialData: profileData,
    enabled: preview || router.query.preview !== null,
  });

  const {
    name,
    profileImage,
    coverImage,
    links,
    skills,
    location,
    email,
    greeting,
    description,
    projects,
  } = profile;
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
        <About
          skills={skills}
          location={location}
          email={email}
          greeting={greeting}
          description={description}
        />
        <LatestProjects projects={projects} />
        <Footer/>
      </Layout>
    </>
  );
}
