import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';


const SuccessModal = ({ title, message, show, onClose, errorMessage }) => {
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
                {errorMessage ? null
                    :
                    <p className='text-center'>{message}</p>
                }

                {
                    errorMessage
                        ?
                        <section>
                            {Object.entries(errorMessage).map(([key, value]) => (
                                <Alert variant='danger' key={key}>
                                    <span className='fw-bolder'>{key}:</span> {value}
                                </Alert>
                            ))}
                        </section>
                        :
                        null
                }
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