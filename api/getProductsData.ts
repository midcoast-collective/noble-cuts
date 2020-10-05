import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

export type Product = {
  id: string;
  description: string;
  price: number;
  title: string;
  thumbnail: string;
};

const productsDirectory = path.join(process.cwd(), "content/products");

export async function getProductsData() {
  const fileNames = fs.readdirSync(productsDirectory);

  const allPostsData = fileNames
    .filter((filename) => filename !== ".DS_Store")
    .map(async (fileName) => {
      const id = fileName.replace(/\.md$/, "");
      const fullPath = path.join(productsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);
      let description = await remark().use(html).process(matterResult.content);

      const product: Product = {
        id,
        description: description.toString(),
        price: matterResult.data.price,
        title: matterResult.data.title,
        thumbnail: matterResult.data.thumbnail,
      };

      return product;
    });

  return Promise.all(allPostsData).then((values) => values);
}
