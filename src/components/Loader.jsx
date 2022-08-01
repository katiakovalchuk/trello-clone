import Spinner from 'react-bootstrap/Spinner';

const Loader = () => {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
      <Spinner animation="border" />
    </div>
  )
}

export default Loader;
