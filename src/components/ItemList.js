import React, { useState } from "react";

function ItemList({ items, updateItem, deleteItem }) {
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");   // ✅ corrected variable name
  const [editQuantity, setEditQuantity] = useState("");

  const startEdit = (item) => {
    setEditId(item._id);
    setEditName(item.name);
    setEditPrice(item.price);       // ✅ corrected
    setEditQuantity(item.quantity);
  };

  const saveEdit = () => {
    updateItem(editId, {
      name: editName,
      price: Number(editPrice),     // ✅ corrected
      quantity: Number(editQuantity),
    });
    setEditId(null);
  };

  return (
    <table className="table table-bordered table-striped">
      <thead className="table-dark">
        <tr>
          <th>Item Name</th>
          <th>Item Price</th>
          <th>Item Quantity</th>
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.length > 0 ? (
          items.map((item) => (
            <tr key={item._id}>
              <td>
                {editId === item._id ? (
                  <input
                    className="form-control"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>

              <td>
                {editId === item._id ? (
                  <input
                    type="number"
                    className="form-control"
                    value={editPrice}
                    onChange={(e) => setEditPrice(e.target.value)}
                  />
                ) : (
                  item.price
                )}
              </td>

              <td>
                {editId === item._id ? (
                  <input
                    type="number"
                    className="form-control"
                    value={editQuantity}
                    onChange={(e) => setEditQuantity(e.target.value)}
                  />
                ) : (
                  item.quantity
                )}
              </td>

              <td className="text-center">
                {editId === item._id ? (
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={saveEdit}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => startEdit(item)}
                  >
                    Edit
                  </button>
                )}

                <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={() => deleteItem(item._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center"> {/* ✅ changed colSpan to 4 */}
              No items found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default ItemList;
