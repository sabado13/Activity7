import React, { useState } from 'react';
import './App.css';

// Dummy JSON data representing fruits
const initialFruits = [
  { id: 1, name: 'apple', color: 'Red' },
  { id: 2, name: 'Banana', color: 'Yellow' },
  { id: 3, name: 'Orange', color: 'Orange' },
];

function App() {
  const [fruits, setFruits] = useState(initialFruits);
  const [newFruit, setNewFruit] = useState({ name: '', color: '' });
  const [editMode, setEditMode] = useState(false);
  const [filter, setFilter] = useState('');

  // Function to add a new fruit
  const addFruit = () => {
    if (newFruit.name && newFruit.color) {
      setFruits([...fruits, { ...newFruit, id: fruits.length + 1 }]);
      setNewFruit({ name: '', color: '' });
    }
  };

  // Function to edit a fruit
  const editFruit = (id) => {
    const editedFruit = fruits.find((fruit) => fruit.id === id);
    setNewFruit(editedFruit);
    setEditMode(true);
  };

  // Function to update a fruit
  const updateFruit = () => {
    if (newFruit.name && newFruit.color) {
      setFruits((prevFruits) =>
        prevFruits.map((fruit) =>
          fruit.id === newFruit.id ? { ...newFruit } : fruit
        )
      );
      setNewFruit({ name: '', color: '' });
      setEditMode(false);
    }
  };

  // Function to delete a fruit
  const deleteFruit = (id) => {
    setFruits(fruits.filter((fruit) => fruit.id !== id));
  };

  // Function to filter fruits by name
  const filteredFruits = fruits.filter((fruit) =>
    fruit.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Fruit list CRUDS</h1>
      <div className="filter">
        <input
          type="text"
          placeholder="Filter by name"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <div className="crud-form">
        <h2>{editMode ? 'Edit Fruit' : 'Insert new fruit'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={newFruit.name}
          onChange={(e) => setNewFruit({ ...newFruit, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Color"
          value={newFruit.color}
          onChange={(e) => setNewFruit({ ...newFruit, color: e.target.value })}
        />
        {editMode ? (
          <button onClick={updateFruit}>Update</button>
        ) : (
          <button onClick={addFruit}>Add</button>
        )}
      </div>
      <div className="fruit-list">
        {filteredFruits.map((fruit) => (
          <div key={fruit.id} className="fruit-item">
            <div>
              <strong>Name:</strong> {fruit.name}
            </div>
            <div>
              <strong>Color:</strong> {fruit.color}
            </div>
            <div>
              <button onClick={() => editFruit(fruit.id)}>Edit</button>
              <button onClick={() => deleteFruit(fruit.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;