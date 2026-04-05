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

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button type="submit">Save Draft</button>
    </form>
  );
}
