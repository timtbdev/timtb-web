import PortableText from "@sanity/block-content-to-react";

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

export default function About(props) {
  const { skills, location, email, greeting, description } = props;
  return (
    <>
      {/* About */}
      <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
          <div className="sm:col-span-1">
            <dt className="text-base font-semibold text-gray-900">Skills</dt>
            <dd className="mt-1 text-base text-gray-500">{skills}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-base font-semibold text-gray-900">Location</dt>
            <dd className="mt-1 text-base text-gray-500">{location}</dd>
          </div>
          <div className="sm:col-span-1">
            <dt className="text-base font-semibold text-gray-900">Email</dt>
            <dd className="mt-1 text-base text-gray-500">{email}</dd>
          </div>
          <div className="sm:col-span-3">
            <dt className="text-base font-semibold text-gray-900 uppercase">
              {greeting}
            </dt>
            <dd className="mt-1 max-w-3xl text-base text-gray-500">
              <PortableText
                blocks={description}
                serializers={serializers}
                className="text-base text-gray-500"
              />
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
