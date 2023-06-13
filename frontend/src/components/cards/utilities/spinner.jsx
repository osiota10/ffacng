import Spinner from 'react-bootstrap/Spinner';


const LoaderIcon = () => {
    return (
        <Spinner
            animation="border"
            as="span"
            className='me-1'
            size="sm"
            role="status"
            aria-hidden="true"
        >
            <span className="visually-hidden">Loading...</span>

        </Spinner>
    );
}

export default LoaderIcon;