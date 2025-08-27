import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend.vercel.app/api/items"
    : "http://localhost:5000/api/items";

function App() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error("Fetch Error:", err.message);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async (item) => {
    try {
      await axios.post(API_URL, item);
      fetchItems();
    } catch (err) {
      console.error("Add Error:", err.message);
    }
  };

  const updateItem = async (id, updatedItem) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedItem);
      fetchItems();
    } catch (err) {
      console.error("Update Error:", err.message);
    }
  };

  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Delete Error:", err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">MERN Crud App</h1>
      <div className="card p-4 shadow-sm">
        <ItemForm addItem={addItem} />
      </div>
      <div className="mt-4">
        <ItemList
          items={items}
          updateItem={updateItem}
          deleteItem={deleteItem}
        />
      </div>
    </div>
  );
}

export default App;
