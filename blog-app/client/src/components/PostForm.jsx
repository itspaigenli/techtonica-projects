import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/posts";
import { getCategories } from "../api/categories";

export default function PostForm({ onSuccess, editingPost, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [submitStatus, setSubmitStatus] = useState("draft");
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title || "");
      setContent(editingPost.content || "");
      setSubmitStatus(editingPost.status || "draft");
      setCategoryId(editingPost.category_id || "");
    } else {
      setTitle("");
      setContent("");
      setSubmitStatus("draft");
      setCategoryId("");
    }
  }, [editingPost]);

  async function handleSubmit(e) {
    e.preventDefault();

    const postData = {
      title,
      content,
      status: submitStatus,
      category_id: categoryId ? Number(categoryId) : null,
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
    setSubmitStatus("draft");
    setCategoryId("");

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

      <div>
        <label className="block font-semibold mb-1">Category</label>
        <select
          className="w-full border border-gray-300 rounded px-3 py-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          onClick={() => setSubmitStatus("draft")}
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Save Draft
        </button>

        <button
          type="submit"
          onClick={() => setSubmitStatus("published")}
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Publish
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
