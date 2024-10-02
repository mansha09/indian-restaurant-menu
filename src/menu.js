// src/Menu.js
import React, { useState } from "react";
import { menuItems } from "./data";
import "./Menu.css"; // Optional CSS for styling

const Menu = () => {
  const [filter, setFilter] = useState("All");

  // Filter menu items based on selected category
  const filteredItems = filter === "All" ? menuItems : menuItems.filter(item => item.category === filter);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Indian Restaurant Menu</h2>
      
      {/* Filter Options */}
      <div className="text-center mb-3">
        <button className="btn btn-primary m-2" onClick={() => setFilter("All")}>All</button>
        <button className="btn btn-success m-2" onClick={() => setFilter("Vegetarian")}>Vegetarian</button>
        <button className="btn btn-danger m-2" onClick={() => setFilter("Non-Vegetarian")}>Non-Vegetarian</button>
        <button className="btn btn-warning m-2" onClick={() => setFilter("Dessert")}>Dessert</button>
      </div>
      
      {/* Menu Items */}
      <div className="row">
        {filteredItems.map(item => (
          <div className="col-md-4 mb-4" key={item.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">
                  Category: {item.category} <br />
                  Price: ${item.price.toFixed(2)} <br />
                  {item.spicy && <span className="badge bg-danger">Spicy</span>}
                  {item.description && <small>{item.description}</small>} <br />
                  {item.rating && <span>Rating: {item.rating} ⭐</span>}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
