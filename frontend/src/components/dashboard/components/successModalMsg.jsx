import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


const SuccessModal = ({ title, message, show, onClose }) => {
    return (
        <Modal
            show={show}
            onHide={onClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {message}
            </Modal.Body>

            <Modal.Footer className='d-flex justify-content-center'>
                <Button variant="btn btn-danger" onClick={onClose} >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default SuccessModal;