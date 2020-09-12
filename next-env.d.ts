/// <reference types="next" />
/// <reference types="next/types/global" />

type ResponsiveImageOutput = {
  src: string;
  srcSet: string;
  placeholder: string;
  images: { path: string; width: number; height: number }[];
  width: number;
  height: number;
};

declare module "*.jpg" {
  const content: ResponsiveImageOutput;
  export default content;
}

declare module "*.jpeg" {
  const content: ResponsiveImageOutput;
  export default content;
}

declare module "*.png" {
  const content: ResponsiveImageOutput;
  export default content;
}
