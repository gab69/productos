import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [data, setData] = useState([]);
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    descripcion: '',
    precio: '',
    foto: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/hello');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      } else {
        throw new Error('Error al obtener los datos');
      }
    } catch (error) {
      console.error('Hubo un error:', error);
    }
  };

  const handleDelete = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    setData(updatedData);
  };

  const handleImageChange = (id, event) => {
    const updatedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          foto: URL.createObjectURL(event.target.files[0])
        };
      }
      return item;
    });

    setData(updatedData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleAddProduct = () => {
    const id = `product_${Date.now()}`;
    const updatedProduct = {
      ...newProduct,
      id
    };

    setData([...data, updatedProduct]);
    setNewProduct({
      id: '',
      name: '',
      descripcion: '',
      precio: '',
      foto: ''
    });
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-2">Agregar Producto</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }} className="flex flex-wrap">
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            placeholder="Nombre"
            className="block mb-2 p-2 mr-2"
          />
          <input
            type="text"
            name="descripcion"
            value={newProduct.descripcion}
            onChange={handleInputChange}
            placeholder="Descripción"
            className="block mb-2 p-2 mr-2"
          />
          <input
            type="text"
            name="precio"
            value={newProduct.precio}
            onChange={handleInputChange}
            placeholder="Precio"
            className="block mb-2 p-2 mr-2"
          />
          <input
            type="file"
            onChange={(event) => setNewProduct({ ...newProduct, foto: URL.createObjectURL(event.target.files[0]) })}
            className="block mb-2 mr-2"
          />
          <button type="submit" className="bg-blue-500 text-white py-2 px-4">Agregar Producto</button>
        </form>
      </div>
      
      <h1 className="text-2xl font-bold mb-4">Productos</h1>
      <table className="min-w-full mb-4">
        <thead>
          <tr className="bg-gray-200 text-gray-600">
            <th className="py-2 px-4">ID</th> 
            <th className="py-2 px-4">Nombre</th>
            <th className="py-2 px-4">Descripción</th>
            <th className="py-2 px-4">Precio</th>
            <th className="py-2 px-4">Imagen</th>
            <th className="py-2 px-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((product) => (
            <tr key={product.id} className="border-b border-gray-200">
              <td>{product.id}</td>
              <td className="py-2 px-4">{product.name}</td>
              <td className="py-2 px-4">{product.descripcion}</td>
              <td className="py-2 px-4">{product.precio}</td>
              <td className="py-2 px-4">
                <img src={product.foto} alt={`Imagen de ${product.name}`} width="100" height="100" />
              </td>
              <td className="py-2 px-4">
                <div className="flex items-center justify-end">
                  <input type="file" onChange={(event) => handleImageChange(product.id, event)} />
                  <button
                    className="bg-red-500 text-white py-1 px-3 ml-2"
                    onClick={() => handleDelete(product.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default YourComponent;
