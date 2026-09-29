
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");

  // *Get Products*
  const getProducts = async () => {
    const response = await fetch(
      "http://localhost:3000/products"
    );

    const data = await response.json();
    setProducts(data);
  };

  // *Run when page loads*
  useEffect(() => {
    getProducts();
  }, []);

  // *Add Product*
  const addProduct = async (e) => {
    e.preventDefault();

    const product = {
      id: id,
      name: name,
      price: price,
      brand: brand,
      rating: rating,
      stock: stock,
      category: category
    };

    await fetch("http://localhost:3000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    // *Clear form*
    setName("");
    setPrice("");
    setId("");
    setCategory("");
    setBrand("");
    setRating("");
    setStock("");

    // *Get updated products*
    getProducts();
  };

  // *Delete Product*
  const deleteProduct = async (id) => {
    await fetch(
      `http://localhost:3000/products/${id}`,
      {
        method: "DELETE"
      }
    );

    getProducts();
  };

  return (
    <div>
      <h1 className="title">Product Management System</h1>

      {/* *Add Product Form* */}
      <form onSubmit={addProduct} className="product-form">
        <input
          type="text"
          placeholder="Product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="input"
        />

        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          className="input"
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="input"
        />

        <button type="submit" className="add-btn">
          Add Product
        </button>
      </form>

      <hr />

      {/* *Product Table* */}
      <table border="1" cellPadding="10" className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Rating</th>
            <th>Stock</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>₹{product.price}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.rating}</td>
              <td>{product.stock}</td>
              <td>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
