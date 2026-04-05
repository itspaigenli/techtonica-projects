import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/posts";

export default function PostForm({ onSuccess, editingPost, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || "");
      setContent(editingPost.content || "");
    } else {
      setTitle("");
      setContent("");
    }
  }, [editingPost]);

  async function handleSubmit(e) {
    e.preventDefault();

    const postData = {
      title,
      content,
      status: editingPost ? editingPost.status : "draft",
      category_id: editingPost ? editingPost.category_id : null,
      tags: editingPost ? editingPost.tags : null,
      discussion_status: editingPost ? editingPost.discussion_status : "open",
      feature_image_url: editingPost ? editingPost.feature_image_url : null,
    };

    if (editingPost) {
      await updatePost(editingPost.id, postData);
    } else {
      await createPost(postData);
    }

    setTitle("");
    setContent("");

    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold">
        {editingPost ? "Edit Post" : "Create Post"}
      </h2>

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

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          {editingPost ? "Update Post" : "Save Draft"}
        </button>

        {editingPost && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
