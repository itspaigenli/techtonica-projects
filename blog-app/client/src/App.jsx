import { useState } from "react";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

export default function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  function handleRefresh() {
    setRefreshKey((prev) => prev + 1);
  }

  return (
    <div>
      <h1>Sumo Blog</h1>

      <section>
        <h2>Viewer</h2>
        <PostList refreshKey={refreshKey} />
      </section>

      <section>
        <h2>Admin</h2>
        <PostForm onSuccess={handleRefresh} />
      </section>
    </div>
  );
}
