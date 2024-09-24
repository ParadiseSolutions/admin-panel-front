import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';  // Importa el BrowserRouter
import App from './App';

test('renders learn react link', () => {
  render(
    <BrowserRouter>  {/* Envuelve el componente en el router */}
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/HELLO!/i);
  expect(linkElement).toBeInTheDocument();
});