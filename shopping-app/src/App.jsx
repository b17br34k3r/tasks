import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [cartItems, setCartItems] = useState([]);

  const products = [
    { id: 1, name: "Headphones", category: "Electronics", price: 99.99 },
    { id: 2, name: "T-Shirt", category: "Clothing", price: 29.99 },
    { id: 3, name: "Shoes", category: "Footwear", price: 49.99 },
  ];

  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const increase = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrease = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
          : item
      )
    );
  };

  return (
    <Router>
      <div className="container py-4">
        <nav className="mb-4">
          <Link to="/" className="btn btn-primary me-2">
            Home
          </Link>
          <Link to="/cart" className="btn btn-dark">
            Cart ({cartItems.length})
          </Link>
        </nav>

        <Routes>
          {/* Home Page */}
          <Route
            path="/"
            element={
              <div>
                <h2>Products</h2>
                <div className="row">
                  {products.map((product) => (
                    <div key={product.id} className="col-md-4 mb-3">
                      <div className="card p-3">
                        <h5>{product.name}</h5>
                        <p>{product.category}</p>
                        <p>${product.price}</p>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => addToCart(product)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            }
          />

          {/* Cart Page */}
          <Route
            path="/cart"
            element={
              <div>
                <h2>Your Cart</h2>
                {cartItems.length === 0 ? (
                  <p>No items in cart.</p>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="d-flex justify-content-between align-items-center border p-2 mb-2"
                    >
                      <div>
                        <strong>{item.name}</strong> - {item.category}
                        <br />
                        <small>${item.price}</small>
                      </div>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => decrease(item.id)}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-secondary"
                          onClick={() => increase(item.id)}
                        >
                          +
                        </button>
                        <button
                          className="btn btn-sm btn-danger ms-3"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
