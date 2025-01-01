import React, { useState } from "react";
import styled from "styled-components";

const ProductForm = ({ method, apiUrl, token, refreshProducts }) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let body = {};
    if (method === "PUT") {
      if (name) body.name = name;
      if (description) body.description = description;
      if (price) body.price = parseFloat(price);
      if (quantity) body.quantity = parseInt(quantity, 10);
    } else {
      body = { name, description, price: parseFloat(price), quantity: parseInt(quantity, 10) };
    }

    try {
      const response = await fetch(
        method === "POST" ? apiUrl : `${apiUrl}/${id}`,
        {
          method,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: method === "DELETE" ? null : JSON.stringify(body),
        }
      );
      if (!response.ok) {
        console.error("Error en la operación:", response.statusText);
        return;
      }
      refreshProducts(); // Refrescar la lista después de la operación
    } catch (error) {
      console.error("Error en la solicitud:", error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {method !== "POST" && (
        <Input
          type="text"
          placeholder="Product ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
      )}

      {method !== "DELETE" && (
        <>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </>
      )}

      <Button type="submit">
        {method === "POST" ? "Add" : method === "PUT" ? "Update" : "Delete"} Product
      </Button>
    </Form>
  );
};

export default ProductForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin: 0 auto;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 12px;
  background-color: #45753d;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;

  &:hover {
    background-color: #3dc12c;
  }
`;
