import React, { useState } from "react";
import { menuItems } from "./data";
import "./Menu.css";
import { Offcanvas, Button, Modal, Form } from "react-bootstrap"; // Import Modal for item details
import { FaShoppingCart, FaUser } from "react-icons/fa";

const Menu = () => {
  const [filter, setFilter] = useState("All");
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [selectedItem, setSelectedItem] = useState(null); // State for selected item
  const [quantity, setQuantity] = useState(1); // State for item quantity
  const [spiciness, setSpiciness] = useState("Mild"); // State for spiciness level

  const toggleOffcanvas = () => setShowOffcanvas(prevShow => !prevShow);
  const toggleModal = () => setShowModal(prevShow => !prevShow);

  const handleItemClick = item => {
    setSelectedItem(item);
    setQuantity(1); // Reset quantity
    setSpiciness("Mild"); // Reset spiciness level
    toggleModal(); // Open the modal
  };

  const filteredItems = filter === "All" ? menuItems : menuItems.filter(item => item.category === filter);

  const handleAddToCart = () => {
    // Logic to add the item with selected quantity and spiciness level to the cart
    console.log("Adding to cart:", { item: selectedItem, quantity, spiciness });
    toggleModal(); // Close the modal after adding
  };

  return (
    <div className="menu-container">
      {/* User and Cart buttons with icons */}
      <div className="user-cart-container">
        <Button variant="outline-primary" className="user-cart-btn">
          <FaUser />
        </Button>
        <Button variant="outline-success" className="user-cart-btn">
          <FaShoppingCart />
        </Button>
      </div>

      {/* Hamburger icon to toggle the offcanvas menu */}
      <Button variant="primary" className="hamburger-btn mb-3" onClick={toggleOffcanvas}>
        &#9776; {/* Hamburger icon */}
      </Button>

      <h2 className="text-center mb-4">Indian Restaurant Menu</h2>

      {/* Offcanvas component for the vertical side menu */}
      <Offcanvas show={showOffcanvas} onHide={toggleOffcanvas} backdrop={false} placement="start">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="text-center mt-5">Menu Categories</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Button className="btn-block mb-2" variant="primary" onClick={() => { setFilter("All"); toggleOffcanvas(); }}>All</Button>
          <Button className="btn-block mb-2" variant="success" onClick={() => { setFilter("Vegetarian"); toggleOffcanvas(); }}>Vegetarian</Button>
          <Button className="btn-block mb-2" variant="danger" onClick={() => { setFilter("Non-Vegetarian"); toggleOffcanvas(); }}>Non-Vegetarian</Button>
          <Button className="btn-block mb-2" variant="warning" onClick={() => { setFilter("Dessert"); toggleOffcanvas(); }}>Dessert</Button>
          <Button className="btn-block mb-2" variant="info" onClick={() => { setFilter("Drinks"); toggleOffcanvas(); }}>Drinks</Button>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Menu Items */}
      <div className="container mt-4">
        <div className="row">
          {filteredItems.map(item => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card h-100" onClick={() => handleItemClick(item)}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">
                    Category: {item.category} <br />
                    Price: ${item.price.toFixed(2)} <br />
                    {item.spicy && <span className="badge bg-danger">Spicy</span>} <br />
                    {item.description && <small>{item.description}</small>} <br />
                    {item.rating && <span>Rating: {item.rating} ⭐</span>}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for item details */}
      {selectedItem && (
        <Modal show={showModal} onHide={toggleModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedItem.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <img
              src={selectedItem.image}
              alt={selectedItem.name}
              className="img-fluid mb-3"
              style={{ height: "200px", objectFit: "cover" }}
            />
            <p>Category: {selectedItem.category}</p>
            <p>Price: ${selectedItem.price.toFixed(2)}</p>
            <p>{selectedItem.description}</p>

            {/* Spiciness Level */}
            <Form.Group controlId="spicinessSelect">
              <Form.Label>Spiciness Level</Form.Label>
              <Form.Control as="select" value={spiciness} onChange={e => setSpiciness(e.target.value)}>
                <option value="Mild">Mild</option>
                <option value="Medium">Medium</option>
                <option value="Hot">Hot</option>
              </Form.Control>
            </Form.Group>

            {/* Quantity Input */}
            <Form.Group controlId="quantityInput">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Menu;
