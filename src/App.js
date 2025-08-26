import React,{useState, useEffect} from "react";
import axios from 'axios';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const API_URL = 'http://localhost:5000/api/items';

function App(){
  const [items,setItems] = useState([]);

  const fetchItems = async ()=>{
    const res = await axios.get(API_URL);
    setItems(res.data);
  };

  useEffect(()=>{
    fetchItems();
  },[]);

  const addItem = async (item)=>{
    await axios.post(API_URL, item);
    fetchItems();
  };

  const updateItem = async(id, updateItem)=>{
    await axios.put(`${API_URL}/${id}`, updateItem);
    fetchItems();
  };

  const deleteItem = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  fetchItems();
};


  return(
    <div className="container mt-4">
      <h1 className="text-center mb-4">MERN Crud App</h1>
      <div className="card p-4 shadow-sm">
        <ItemForm addItem={addItem} />
      </div>
      <div className="mt-4">
        <ItemList items={items} updateItem={updateItem} deleteItem={deleteItem} />
      </div>
    </div>
  );
}

export default App;