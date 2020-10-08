import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Product = {
  id: string;
  description: string;
  priceperpound: string;
  price: number;
  title: string;
  thumbnail: string;
  quantity: number;
};

const productsDirectory = path.join(process.cwd(), "content/products");

export function getProductsData() {
  const fileNames = fs.readdirSync(productsDirectory);

  const allPostsData = fileNames
    .filter((filename) => filename !== ".DS_Store")
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(productsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      const product: Product = {
        id,
        description: matterResult.data.description,
        price: matterResult.data.price,
        priceperpound: matterResult.data.priceperpound,
        title: matterResult.data.title,
        thumbnail: matterResult.data.thumbnail,
        quantity: 0,
      };

      return product;
    });

  return allPostsData;
}
