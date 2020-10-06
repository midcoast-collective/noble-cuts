import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Block = {
  title: string;
  blurb: string;
  photo: string;
};

export type FAQ = {
  question: string;
  answer: string;
};

export type Page = {
  title: string;
  photo: string;
  intro: string;
  outro: string;
  id: string;
  blocks: Block[];
  faqs: FAQ[];
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
