import React from "react";

type ResponsiveImgProps = {
  src: string;
};

const ResponsiveImg = ({ src }: Readonly<ResponsiveImgProps>): JSX.Element => {
  // const [imageIsLoaded, setImageIsLoaded] = React.useState(false);
  // const image = React.useRef(null);

  // React.useEffect(() => {
  //   // @ts-ignore
  //   if (image?.current?.complete) {
  //     setImageIsLoaded(true);
  //   }
  // }, [src]);

  const placeholder = require(`../public/images/uploads/${src}?placeholder=true&placeholderSize=40`)
    .placeholder;

  return (
    <div
      className="responsive-image"
      style={{
        backgroundImage: `url(${placeholder})`,
        backgroundSize: "cover",
      }}
    >
      <picture>
        <source
          srcSet={
            require(`../public/images/uploads/${src}?size=400&format=webp`)
              .srcSet
          }
          type="image/webp"
        />
        <img
          alt={src}
          src={
            require(`../public/images/uploads/${src}?size=400&format=jpg`).src
          }
          loading="lazy"
        />
      </picture>
    </div>
  );
};

export default ResponsiveImg;
