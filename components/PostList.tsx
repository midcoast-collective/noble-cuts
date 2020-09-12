import React from "react";
import { useState } from "react";

import { Post as PostType } from "@pages/index";
import Post from "@components/Post";
import * as Icon from "@components/Icon";

type PostListProps = {
  posts?: PostType.Processed[];
};

const PostList = ({ posts = [] }: Readonly<PostListProps>) => {
  const [filter, setFilter] = useState("faves");

  const filteredAndSortedPosts = posts
    .filter((post) => post.category === filter)
    .sort((a, b) => a["name"].localeCompare(b["name"]));

  if (posts.length < 1) return <p>Oops, there is nothing to see here...</p>;

  return (
    <div className="wrap">
      <div className="post-options centered">
        <div>
          <Icon.Delivery />
          <span>- Delivery</span>
        </div>
        <div>
          <Icon.Takeout />
          <span>- Takeout</span>
        </div>
        <div>
          <Icon.Mask />
          <span>- Masks</span>
        </div>
      </div>

      <div className="tabs">
        <button
          className={filter === "faves" ? "tab active" : "tab"}
          onClick={() => setFilter("faves")}
        >
          Faves
        </button>
        <button
          className={filter === "craves" ? "tab active" : "tab"}
          onClick={() => setFilter("craves")}
        >
          Craves
        </button>
        <button
          className={filter === "retail" ? "tab active" : "tab"}
          onClick={() => setFilter("retail")}
        >
          Retail
        </button>
        <button
          className={filter === "service" ? "tab active" : "tab"}
          onClick={() => setFilter("service")}
        >
          Services
        </button>
      </div>

      <div className="list">
        {filteredAndSortedPosts.length > 0 &&
          filteredAndSortedPosts.map((post) => (
            <Post post={post} key={post.slug} />
          ))}
      </div>
    </div>
  );
};

export default PostList;
