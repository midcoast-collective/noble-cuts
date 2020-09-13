import React from "react";

type ResponsiveImageProps = {
  path: string;
} & Partial<React.ImgHTMLAttributes<HTMLImageElement>>;

const ResponsiveImage = ({
  path,
  ...props
}: Readonly<ResponsiveImageProps>): JSX.Element => {
  // const [imageIsLoaded, setImageIsLoaded] = React.useState(false);
  // const image = React.useRef(null);

  // React.useEffect(() => {
  //   // @ts-ignore
  //   if (image?.current?.complete) {
  //     setImageIsLoaded(true);
  //   }
  // }, [path]);

  const responsiveImage = require(`${path}?&sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&placeholder=true`);
  const responsiveImageWebp = require(`${path}?sizes[]=300,sizes[]=600,sizes[]=1024,sizes[]=2048&format=webp`);

  const placeholder = responsiveImage.placeholder;

  return (
    <div
      className="responsive-image"
      style={{
        backgroundImage: `url(${placeholder})`,
        backgroundSize: "cover",
      }}
    >
      <picture>
        <source srcSet={responsiveImageWebp.srcSet} type="image/webp" />
        <img
          alt={props.alt || ""}
          src={responsiveImage.src}
          loading={props.loading}
        />
      </picture>
    </div>
  );
};

export default ResponsiveImage;
