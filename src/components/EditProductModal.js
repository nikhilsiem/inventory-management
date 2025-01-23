import React, { useEffect, useState } from 'react';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../features/inventorySlice';

const EditProductModal = ({ show, handleClose, product }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(product);

  const handleSubmit = (e) => { 
    e.preventDefault();
    dispatch(updateProduct(formData));
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} className="modal-container">
      <Modal.Header closeButton>
        <Modal.Title className="white-text">Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label className="white-text">Name</Form.Label>
                    <Form.Control
                    disabled="true"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                </Form.Group>
                </Col>
            <Col>
                <Form.Group className="mb-3">
                    <Form.Label className="white-text">Category</Form.Label>
                    <Form.Control
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    />
                </Form.Group>
            </Col>
            </Row>
            <Row>
                <Col>
                <Form.Group className="mb-3">
                <Form.Label className="white-text">Price</Form.Label>
                    <Form.Control
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    />
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3">
                    <Form.Label className="white-text">Quantity</Form.Label>
                    <Form.Control
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                    />
                </Form.Group>
                </Col>
            </Row>
          <Button variant="dark" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditProductModal;