import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Block = {
  title: string;
  blurb: string;
  photo1: string;
  photo2: string;
};

export type Page = {
  title: string;
  thumbnail: string;
  intro: string;
  id: string;
  blocks: Block[];
};

const pagesDirectory = path.join(process.cwd(), "content/pages");

export function getPagesData() {
  const fileNames = fs.readdirSync(pagesDirectory);
  const allPagesData = fileNames
    .filter((filename) => filename !== ".DS_Store")
    .map((fileName) => {
      const id = fileName.replace(/\.md$/, "");

      const fullPath = path.join(pagesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const matterResult = matter(fileContents);

      return {
        id,
        ...matterResult.data,
      };
    });

  return allPagesData;
}
