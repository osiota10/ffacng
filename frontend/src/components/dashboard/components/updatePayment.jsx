


const UpdatePaymentProof = () => {
    return (
        <>
            {/* Add Payment Proof Forms */}
            <Modal
                show={addPaymentProof}
                onHide={handleAddPaymentProofClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Payment Proof</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={e => onAddPaymentSubmit(e)}>
                        <div class="input-group mb-3">
                            <input
                                type="file"
                                class="form-control"
                                id="inputGroupFile02"
                                name="payment_proof"
                                value={payment_proof}
                                onChange={e => onPaymentFormChange(e)}
                                required
                            />
                            <label class="input-group-text" for="inputGroupFile02">Upload</label>
                        </div>
                        <section className="d-grid">
                            <button
                                type="submit"
                                className={loading ? 'btn btn-primary disabled' : 'btn btn-primary'}
                            >
                                {loading
                                    ?
                                    <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                                    :
                                    null
                                }
                                Submit
                            </button>
                        </section>
                    </form>
                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-center'>
                    <Button variant="btn btn-danger" onClick={handleAddPaymentProofClose} >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdatePaymentProof;