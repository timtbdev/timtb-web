import { ProjectDetail } from "@components/common/";
import { groq } from "next-sanity";
import { getClient, usePreviewSubscription } from "@libs/sanity";
import Error from "next/error";
import { useRouter } from "next/router";
import { ProjectHeader } from "@components/common/";
import { Layout, Profile } from "@components/common/";
import { Tabs } from "@components/common/";
import { Footer } from "@components/common/";

const projectQuery = groq`*[_type == "project" && slug.current == $slug][0]
{
  title,
  slug,
  language,
  components,
  architecture,
  backend,
  icon,
  screenshots[]->{title, image},
  publishedAt,
  description,
  links[]->{title, url, icon},
}
`;

const profileQuery = groq`
  *[_type == "profile"][0] {
    name,
    profileImage,
    coverImage,
    links[]->{title, url, icon},
  }
`;

export async function getStaticProps({ params, preview = false }) {
  const projectData = await getClient(preview).fetch(projectQuery, {
    slug: params.slug,
  });
  const profileData = await getClient(preview).fetch(profileQuery);

  return {
    props: { preview, projectData, profileData },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    `*[_type == "project" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default function Project(props) {
  const { projectData, profileData, preview } = props;
  const router = useRouter();

  if (!router.isFallback && !projectData) {
    return <Error statusCode={404} />;
  }
  const { data: project } = usePreviewSubscription(projectQuery, {
    params: { slug: projectData?.slug?.current },
    initialData: projectData,
    enabled: preview || router.query.preview !== null,
  });

  const { data: profile } = usePreviewSubscription(profileQuery, {
    initialData: profileData,
    enabled: preview || router.query.preview !== null,
  });

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
  } = project;

  const { name, profileImage, coverImage } = profile;
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
        <ProjectDetail
          title={title}
          slug={slug}
          language={language}
          components={components}
          architecture={architecture}
          backend={backend}
          icon={icon}
          screenshots={screenshots}
          publishedAt={publishedAt}
          description={description}
          links={links}
        />
        <Footer />
      </Layout>
    </>
  );
}
