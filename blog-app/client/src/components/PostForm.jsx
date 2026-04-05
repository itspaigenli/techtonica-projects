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
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">Create Post</h2>

      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          type="text"
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-semibold mb-1">Content</label>
        <textarea
          className="w-full border border-gray-300 rounded px-3 py-2 min-h-30"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
      >
        Save Draft
      </button>
    </form>
  );
}
