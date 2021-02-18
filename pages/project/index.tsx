import { Layout } from "@components/common/";
import { Profile } from "@components/common/";
import { Tabs } from "@components/common/";
import { About } from "@components/common/";
import { Projects } from "@components/common/";
import { Footer } from "@components/common/";
import { groq } from "next-sanity";
import { getClient, usePreviewSubscription } from "@libs/sanity";
import Error from "next/error";
import { useRouter } from "next/router";

const profileQuery = groq`
  *[_type == "profile"][0] {
    name,
    profileImage,
    coverImage,
    links[]->{title, url, icon}
  }
`;

const projectsQuery = groq`*[_type == "project"]`;

export async function getStaticProps({ params = {}, preview = false }) {
  const profileData = await getClient(preview).fetch(profileQuery);
  const projectsData = await getClient(preview).fetch(projectsQuery);
  return {
    props: {
      preview,
      profileData,
      projectsData,
    },
  };
}

export default function Home(props) {
  const { profileData, projectsData, preview } = props;
  const router = useRouter();

  if (!router.isFallback && !projectsData && !profileData) {
    return <Error statusCode={404} />;
  }
  const { data: profile } = usePreviewSubscription(profileQuery, {
    initialData: profileData,
    enabled: preview || router.query.preview !== null,
  });
  const { data: projects } = usePreviewSubscription(projectsQuery, {
    initialData: projectsData,
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
        <Projects projects={projects} />
        <Footer />
      </Layout>
    </>
  );
}
