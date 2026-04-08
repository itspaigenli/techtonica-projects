import { useEffect, useState } from "react";
import { createPost, updatePost } from "../api/posts";
import { getCategories } from "../api/categories";

export default function PostForm({ onSuccess, editingPost, onCancelEdit }) {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    async function loadCategories() {
      const data = await getCategories();
      setCategories(data);
    }

    loadCategories();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const submitter = e.nativeEvent.submitter;
    const title = (formData.get("title") || "").toString();
    const content = (formData.get("content") || "").toString();
    const categoryId = (formData.get("categoryId") || "").toString();
    const featureImageUrl = (formData.get("featureImageUrl") || "").toString();
    const submitStatus = submitter?.value || "draft";

    if (!title.trim()) {
      setError("Title is required.");
      setIsSubmitting(false);
      return;
    }

    if (!content.trim()) {
      setError("Content is required.");
      setIsSubmitting(false);
      return;
    }

    if (!categoryId) {
      setError("Category is required.");
      setIsSubmitting(false);
      return;
    }

    const postData = {
      title,
      content,
      status: submitStatus,
      category_id: Number(categoryId),
      feature_image_url: featureImageUrl || null,
    };

    try {
      if (editingPost) {
        await updatePost(editingPost.id, postData);
      } else {
        await createPost(postData);
      }

      form.reset();
      onSuccess(submitStatus);
    } catch (err) {
      setError(
        err.message || "Unable to save the post right now. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-[1.75rem] border border-stone-200 bg-sand-100 p-6"
    >
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-clay-600">
          Compose
        </p>
        <h2 className="font-display text-3xl uppercase tracking-[0.08em] text-ink-950">
          {editingPost ? "Edit Post" : "Create Post"}
        </h2>
      </div>

      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <div>
        <label className="mb-2 block text-sm font-semibold text-stone-800">
          Title
        </label>
        <input
          name="title"
          type="text"
          className="sumo-input"
          defaultValue={editingPost?.title || ""}
          placeholder="Grand Champion in Waiting"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-stone-800">
          Content
        </label>
        <textarea
          name="content"
          className="sumo-input min-h-40"
          defaultValue={editingPost?.content || ""}
          placeholder="Write your tournament analysis, preview, or profile here..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-stone-800">
          Category
        </label>
        <select
          name="categoryId"
          className="sumo-input"
          defaultValue={editingPost?.category_id || ""}
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-stone-800">
          Feature Image URL
        </label>
        <input
          name="featureImageUrl"
          type="text"
          className="sumo-input"
          defaultValue={editingPost?.feature_image_url || ""}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <button
          type="submit"
          value="draft"
          disabled={isSubmitting}
          className="sumo-button-secondary"
        >
          {isSubmitting ? "Saving..." : "Save Draft"}
        </button>

        <button
          type="submit"
          value="published"
          disabled={isSubmitting}
          className="sumo-button"
        >
          {isSubmitting ? "Saving..." : "Publish"}
        </button>

        {editingPost && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="rounded-full border border-transparent px-4 py-2 text-sm font-semibold text-stone-500 transition hover:text-stone-800"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
