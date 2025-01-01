// src/components/Output.js
import React, { useContext } from "react";
import styled from "styled-components";
import { FaTrashAlt } from "react-icons/fa";
import { AuthContext } from '@context/AuthContext'; // Importamos el contexto

const Output = ({ data, onDelete }) => {
  const { token } = useContext(AuthContext); // Obtenemos el token del contexto

  if (!data || data.length === 0) {
    return <Placeholder>No data to display</Placeholder>;
  }
  
  const handleDelete = (id) => {
    onDelete(id, token); // Llamamos a onDelete pasando el id y el token
  };

  return (
    <TableContainer>
      <Table>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>Name</Th>
            <Th>Description</Th>
            <Th>Price</Th>
            <Th>Quantity</Th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <Td>{item.id}</Td>
              <Td>{item.name}</Td>
              <Td>{item.description}</Td>
              <Td>{item.price}</Td>
              <Td>{item.quantity}</Td>
              <Td>
                <DeleteButton onClick={() => handleDelete(item.id)}>
                  <FaTrashAlt />
                </DeleteButton>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default Output;

const TableContainer = styled.div`
  margin-top: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background-color: #45753d;
  color: white;
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
`;

const Td = styled.td`
  padding: 10px;
  text-align: center;
  border: 1px solid #ddd;
`;

const Placeholder = styled.p`
  color: #aaa;
  font-style: italic;
  text-align: center;
  margin: 20px 0;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px;
  border-radius: 5px;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #c0392b;
  }

  svg {
    font-size: 16px;
  }
`;
