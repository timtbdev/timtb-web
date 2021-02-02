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
        <div className="mt-6 px-4 py-5 sm:px-6 lg:px-8 bg-white shadow overflow-hidden sm:rounded-lg">
          <p className="text-xl font-semibold text-gray-900">{greeting}</p>
          <PortableText
            blocks={description}
            serializers={serializers}
            className="text-base text-gray-500"
          />
        </div>
      </div>
    </>
  );
}
