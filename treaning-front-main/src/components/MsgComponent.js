import React, { useEffect, useState } from 'react';
import { Button, Col, Modal, Toast } from 'react-bootstrap';
import { LoadingBtn } from '../refreshPage/loading';

const MsgToast = ({ setShow, show, type, title, body }) => {
    const [status, setStatus] = useState("نعم ,متأكد")
    return (<>
        <Col xs={6} style={{ position: "fixed", top: "50px", left: "10px" }}>
            <Toast bg={type.toLowerCase()} onClose={() => setShow(false)} show={show} delay={4000} autohide>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto"> {title}</strong>
                    <small></small>
                </Toast.Header>
                <Toast.Body style={{ color: "white" }}> {body}</Toast.Body>
            </Toast>
        </Col>
    </>)
}

const MsgModal = ({ handleClose, opj, show, title, body, status}) => {
    // const [status, setStatus] = useState("نعم ,متأكد")

    return (<>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body> {body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    اغلاق
                </Button>
                <Button variant="success" onClick={opj}>
                    {status}
                </Button>
            </Modal.Footer>
        </Modal>
    </>)
}


export { MsgToast, MsgModal } 