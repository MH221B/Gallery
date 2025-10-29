import { useRef, useCallback } from "react";
import ListPhotoComponent from "./ListPhotoComponent";
import { Spinner } from "react-bootstrap";

export default function PhotosPage({ photos, loading, hasMore, onLoadMore }) {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          if (typeof onLoadMore === "function") onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  return (
    <>
      <ListPhotoComponent photos={photos} />

      <div ref={lastElementRef} style={{ height: "1px" }} />

      {loading && (
        <div className="text-center my-4">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!hasMore && (
        <div className="text-center my-4">
          <p>You've seen all the photos!</p>
        </div>
      )}
    </>
  );
}
