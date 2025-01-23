import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Table, Form, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Pencil, Trash2, Eye } from 'lucide-react';
import { fetchInventory, toggleUserMode, deleteProduct, toggleProductStatus } from '../features/inventorySlice';
import EditProductModal from './EditProductModal';

const styles = `
.disabled-row {
  opacity: 0.5;
  pointer-events: none;
}
.user-view {
  pointer-events: none;
  opacity: 0.6;
}
`;

const InventoryDashboard = () => {
  const dispatch = useDispatch();
  const { items, isAdmin, status } = useSelector((state) => state.inventory);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchInventory());
    }
  }, [status, dispatch]);

  const stats = [
    {
      icon: "🛒",
      title: "Total product",
      value: items.filter(item => !item.disabled).length
    },
    {
      icon: "💱",
      title: "Total store value",
      value: items
        .filter(item => !item.disabled)
        .reduce((acc, item) => acc + (item.price * item.quantity), 0)
    },
    {
      icon: "📦",
      title: "Out of stocks",
      value: items.filter(item => item.quantity === 0).length
    },
    {
      icon: "📑",
      title: "No of Category",
      value: [...new Set(items.map(item => item.category))].length
    }
  ];

  const handleEdit = (product) => {
    if (!isAdmin) return;
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (!isAdmin) return;
    dispatch(deleteProduct(id));
  };

  const handleToggleStatus = (id) => {
    if (!isAdmin) return;
    dispatch(toggleProductStatus(id));
  };

  return (
    <>
    {status === 'loading' && 
    <>
    <Container className="spinner-container" fluid>
        <Spinner animation="grow" />
    </Container>
    </>
    }
      {(status === 'succeeded') && 
      <>
      <style>{styles}</style>
      <div className="dashboard">
        <div className="header">
          <h1 className="h5 mb-0">Inventory stats</h1>
          <div className="header-controls">
            <Form.Check
              type="switch"
              label={isAdmin ? "Admin" : "User"}
              checked={isAdmin}
              onChange={() => dispatch(toggleUserMode())}
              className="me-3"
            />
          </div>
        </div>

        <Container fluid className="p-4">
          <Row className="mb-4">
            {stats.map((stat, index) => (
                <Col key={index} xs={3}>                
                <Card className={`stats-card`}>
                    <Card.Body>
                        <div className="d-flex align-items-center mb-2">
                        <span className="me-2">{stat.icon}</span>
                        <span className="stats-value white-text">{stat.value}</span>
                        </div>
                        <div className="stats-title white-text">{stat.title}</div>
                    </Card.Body>
                </Card>
                </Col>
            ))}
          </Row>

          <Table responsive className="custom-table" variant="dark">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className={`table-rows ${item.disabled ? 'disabled-row' : ''}`}>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity}</td>
                  <td>${item.price * item.quantity}</td>
                  <td>
                    <div className="icon-list">
                        <Eye
                            className={`eye-icon ${!isAdmin ? 'action-disabled' : ''}`}
                            onClick={() => handleToggleStatus(item.id)}
                        />
                        <Pencil
                            className={`edit-icon ${(!isAdmin || item.disabled) ? 'action-disabled' : ''}`}
                            onClick={() => handleEdit(item)}
                        />
                        <Trash2
                            className={`delete-icon ${!isAdmin ? 'action-disabled' : ''}`}
                            onClick={() => handleDelete(item.id)}
                        />
                    </div>
                  
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        {selectedProduct && (
          <EditProductModal
            show={showEditModal}
            handleClose={() => {
              setShowEditModal(false);
              setSelectedProduct(null);
            }}
            product={selectedProduct}
          />
        )}
      </div>
      </>}
    </>
  );
};

export default InventoryDashboard;