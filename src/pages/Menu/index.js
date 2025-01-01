import React, { useContext, useEffect } from "react";
import Logout from '@common/Logout';
import ProductForm from "@components/ProductForm";
import Output from "@components/Output";
import styled, { keyframes } from 'styled-components';
import useProducts from "@hooks/useProducts"; // Importamos el hook
import { AuthContext } from '@context/AuthContext'; // Importamos el contexto de autenticación
import { useRouter } from "next/router"; // Hook para redirección

const Menu = () => {
  const { products, deleteProduct, fetchProducts } = useProducts(); // Usamos el hook
  const { token } = useContext(AuthContext); // Obtenemos el token desde el contexto
  const router = useRouter(); // Inicializamos el hook de enrutamiento

  useEffect(() => {
    // Verificamos si el token existe
    if (!token) {
      router.push('/Login'); // Redirigimos a login si no hay token
    }
  }, [token, router]);

  // Si no hay token, no renderizamos nada mientras se redirige
  if (!token) {
    return null;
  }

  return (
    <AppContainer>
      <Header>Inventory API Tester</Header>
      <ContentWrapper>
        <LeftSection>
          <Section>
            <SectionHeader>Get Products</SectionHeader>
            <Output data={products} onDelete={deleteProduct} />
          </Section>
        </LeftSection>

        <RightSection>
          <Section>
            <SectionHeader>Add Product (POST)</SectionHeader>
            <ProductForm
              method="POST"
              apiUrl="http://localhost:8000/products"
              token={token}  
              refreshProducts={fetchProducts}
            />
          </Section>

          <Section>
            <SectionHeader>Update Product (PUT)</SectionHeader>
            <ProductForm
              method="PUT"
              apiUrl="http://localhost:8000/products"
              token={token} 
              refreshProducts={fetchProducts}
            />
          </Section>
        </RightSection>
      </ContentWrapper>
      <Logout /> {/* Componente de logout */}
    </AppContainer>
  );
};

export default Menu;



// Definimos las animaciones
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const hoverEffect = keyframes`
  0% {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
  100% {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
`;

// Definimos los estilos de los componentes
export const AppContainer = styled.div`
  font-family: "Arial", sans-serif;
  margin: 20px;
  animation: ${fadeIn} 1s ease-out;
  @media (max-width: 768px) {
    margin: 10px;
  }
`;

export const Header = styled.h1`
  color: #45753d;
  text-align: center;
  margin-bottom: 30px;
  font-size: 3.5rem;
  font-weight: bold;
  background: linear-gradient(to right, #45753d, #45753d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 2px 4px 6px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1.2s ease-out;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const LeftSection = styled.div`
  flex: 1 1 60%;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const RightSection = styled.div`
  flex: 1 1 35%;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    flex: 1 1 100%;
  }
`;

export const Section = styled.div`
  margin-bottom: 40px;
  background: linear-gradient(to bottom right, #f0f8f8, #d4f4d2);
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.03);
    animation: ${hoverEffect} 0.5s forwards;
  }

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

export const SectionHeader = styled.h2`
  color: #45753d;
  text-align: center;
  margin-bottom: 20px;
  font-size: 2rem;
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

export const AnimatedButton = styled.button`
  background-color: #45753d;
  color: white;
  padding: 12px 20px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 25px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s, transform 0.3s;

  &:hover {
    background-color: #3dc12c;
    transform: translateY(-3px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;
