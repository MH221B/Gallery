import { Row, Col } from "react-bootstrap";
import PhotoComponent from './PhotoComponent';

const chunkArray = (arr, size) => {
  const chunkedArr = [];
  for (let i = 0; i < arr.length; i += size) {
    chunkedArr.push(arr.slice(i, i + size));
  }
  return chunkedArr;
};

const ListPhotoComponent = ({ photos }) => {
  const columnsPerRow = 4;
  const rows = chunkArray(photos, columnsPerRow);

  return (
    <>
      {rows.map((rowPhotos, rIdx) => (
        <Row key={rIdx} className="mb-4"> 
          {rowPhotos.map((photo) => (
            <Col md={3} sm={6} xs={12} key={photo.id} className="d-flex mb-3 mb-md-0">
              <PhotoComponent photo={photo} />
            </Col>
          ))}
        </Row>
      ))}
    </>
  );
};

export default ListPhotoComponent;