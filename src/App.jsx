import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HeaderComponent from "./components/headerComponent";
import PhotosPage from "./components/PhotosPage";
import { Container } from "react-bootstrap";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { fetchPhotos } from "./services/photoService";
import PhotoDetailComponent from "./components/PhotoDetailComponent";

function App() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadInitialPhotos = async () => {
    setLoading(true);
    try {
      const data = await fetchPhotos(1, 20);
      setPhotos(data);
      setPage(2);
      if (data.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch initial photos", error);
    }
    setLoading(false);
  };

  const loadMorePhotos = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const data = await fetchPhotos(page, 20);

      if (data.length === 0) {
        setHasMore(false);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Failed to fetch more photos", error);
    }
    setLoading(false);
  }, [page, loading, hasMore]);

  useEffect(() => {
    loadInitialPhotos();
  }, []); 

  return (
    <Router>
      <HeaderComponent />
      <Container className="my-4 d-flex flex-column flex-grow-1">
        <Routes>
          <Route path="/" element={<Navigate to="/photos" replace />} />
          <Route
            path="/photos"
            element={
              <PhotosPage
                photos={photos}
                loading={loading}
                hasMore={hasMore}
                onLoadMore={loadMorePhotos}
              />
            }
          />
          <Route path="/photos/:id" element={<PhotoDetailComponent />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
