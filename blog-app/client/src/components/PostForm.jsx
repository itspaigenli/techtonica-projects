import { useState } from "react";
import { createPost } from "../api/posts";

export default function PostForm({ onSuccess }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    await createPost({
      title,
      content,
      status: "draft",
    });

    setTitle("");
    setContent("");

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Post</h2>

      <div>
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="content">Content</label>
        <br />
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="6"
        />
      </div>

      <button type="submit">Save Draft</button>
    </form>
  );
}
