import React, { useState } from 'react';

const ProductCrud = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Redmi Note 12',
      price: 14999,
      stock: 25,
      rating: 4.3,
      categories: ['Electronics', 'Mobiles']
    },
    {
      id: 2,
      name: 'Samsung Galaxy M14',
      price: 13999,
      stock: 10,
      rating: 4.1,
      categories: ['Mobiles']
    }
  ]);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    price: '',
    stock: '',
    rating: '',
    categories: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddOrUpdate = () => {
    const updatedProduct = {
      id: Number(formData.id),
      name: formData.name,
      price: Number(formData.price),
      stock: Number(formData.stock),
      rating: parseFloat(formData.rating),
      categories: formData.categories.split(',').map(c => c.trim())
    };

    const exists = products.some(p => p.id === updatedProduct.id);
    if (exists) {
      setProducts(products.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    } else {
      setProducts([...products, updatedProduct]);
    }

    setFormData({
      id: '', name: '', price: '', stock: '', rating: '', categories: ''
    });
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      rating: product.rating,
      categories: product.categories.join(', ')
    });
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="container">
      <h2>🛒 Flipkart-style Product Table</h2>

      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr style={{ backgroundColor: '#eee' }}>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Rating</th>
            <th>Categories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(prod => (
            <tr key={prod.id}>
              <td>{prod.id}</td>
              <td>{prod.name}</td>
              <td>₹{prod.price}</td>
              <td>{prod.stock}</td>
              <td>{prod.rating}</td>
              <td>{prod.categories.join(', ')}</td>
              <td>
                <button onClick={() => handleEdit(prod)}>Edit</button>{' '}
                <button onClick={() => handleDelete(prod.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{formData.id && products.find(p => p.id === Number(formData.id)) ? 'Update Product' : 'Add Product'}</h3>

      <input name="id" placeholder="ID" value={formData.id} onChange={handleChange} />
      <input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
      <input name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
      <input name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
      <input name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} />
      <input name="categories" placeholder="Categories (comma separated)" value={formData.categories} onChange={handleChange} />

      <button onClick={handleAddOrUpdate}>
        {formData.id && products.find(p => p.id === Number(formData.id)) ? 'Update' : 'Add'}
      </button>

      <div style={{ marginTop: '30px', backgroundColor: '#f2f2f2', padding: '20px', borderRadius: '10px' }}>
        <h4>📘 Telugu UI Steps</h4>
        {/* <ol>
          <li><strong>Step 1:</strong> Products అనే array లో objects ఉన్నాయ్, అందులో nested arrays కూడా ఉన్నాయి (categories).</li>
          <li><strong>Step 2:</strong> ఈ array ని useState తో React state గా use చేస్తున్నాం.</li>
          <li><strong>Step 3:</strong> Table లో product details చూపిస్తున్నాం.</li>
          <li><strong>Step 4:</strong> Add / Edit చేయడానికి input fields form తీసుకున్నాం.</li>
          <li><strong>Step 5:</strong> Edit బటన్ క్లిక్ చేసినప్పుడు form pre-filled అవుతుంది.</li>
          <li><strong>Step 6:</strong> Add or Update అయిన data products state లోకి పోతుంది.</li>
          <li><strong>Step 7:</strong> Delete బటన్ తో item remove అవుతుంది.</li>
        </ol> */}
      </div>
    </div>
  );
};

export default ProductCrud;
