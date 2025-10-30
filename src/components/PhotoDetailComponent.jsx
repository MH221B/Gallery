import { Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchPhotosById } from '../services/photoService';

const PhotoDetailComponent = () => {
    const { id } = useParams();
    const [photo, setPhoto] = useState(null);
    useEffect(() => {
        const getPhoto = async () => {
            const data = await fetchPhotosById(id);
            setPhoto(data);
        };
        if (id) getPhoto();
    }, [id]);

    if (!photo) return (
        <div className="text-center my-4">
            <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );

    const description = photo.description || photo.alt_description || 'No description';
    const likes = photo.likes ?? 0;
    const views = photo.views ?? photo.views_count ?? 0;
    const downloads = photo.downloads ?? photo.downloads_count ?? 0;

    const rawTags = photo.tags || [];
    const tags = rawTags.slice(0, 4).map((t) => {
        if (!t) return '';
        if (typeof t === 'string') return t;
        return t.title || '';
    }).filter(Boolean);

    return (
        <div className="photo-detail-center">
            <Card className="photo-detail-card shadow-sm rounded-4 border border-2 border-secondary">
                <Card.Body>
                <Row className="g-4">
                    <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                        <img
                            src={photo.urls?.regular || photo.urls?.full || photo.urls?.small}
                            alt={photo.alt_description || ''}
                            className="img-fluid rounded photo-detail-img"
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <div className="mb-3">
                            <h4 className="mb-1">{photo.user?.name}</h4>
                            <p className="text-muted mb-0">{description}</p>
                        </div>
                        <div className="d-flex flex-wrap mb-3">
                            <Badge bg="primary" pill className="me-2 mb-2">Likes: {likes}</Badge>
                            <Badge bg="secondary" pill className="me-2 mb-2">Views: {views}</Badge>
                            <Badge bg="success" pill className="me-2 mb-2">Downloads: {downloads}</Badge>
                            <Badge bg="info" pill className="me-2 mb-2">Width: {photo.width ? `${photo.width}px` : 'N/A'}</Badge>
                            <Badge bg="info" pill className="me-2 mb-2">Height: {photo.height ? `${photo.height}px` : 'N/A'}</Badge>
                        </div>
                        <div>
                            <h6 className="mb-2">Tags</h6>
                            <div className="d-flex flex-wrap">
                                {tags.length > 0 ? (
                                    tags.map((t, i) => (
                                        <Badge key={i} bg="light" text="dark" pill className="me-2 mb-2 border border-1 border-secondary">{t}</Badge>
                                    ))
                                ) : (
                                    <div className="text-muted">No tags</div>
                                )}
                            </div>
                        </div>
                    </Col>
                </Row>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PhotoDetailComponent;

