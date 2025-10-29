import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const PhotoComponent = ({ photo }) => {
  const navigate = useNavigate();
  const titleText = photo.description ?? photo.alt_description ?? "";

  return (
    <Card className="photo-card shadow-lg rounded-4 border-0 h-100">
      <div className="photo-img-wrap">
        <Card.Img variant="top" src={photo.urls.regular} className="photo-img" />
      </div>

      <Card.Body className="d-flex flex-column">
        <div className="photo-title-wrap text-center">
          <Card.Title
            className="fw-semibold photo-title"
            title={titleText}
          >
            {titleText}
          </Card.Title>
        </div>

        <div className="photo-meta mt-auto">
          <div className="text-muted text-center">
            {photo.user.name}
          </div>
          <div className="d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={() => navigate(`/photos/${photo.id}`)}
              className="rounded-pill px-4"
            >
              View Details
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default PhotoComponent;
