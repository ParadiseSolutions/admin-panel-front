import React from "react";
import { fireEvent, getByTestId, render, screen, waitFor, within } from "@testing-library/react";
import AddonsComponent from "../../../../Pages/Tours/EditComponents/addons";
import { deleteAddonAPI, getAddonsPricingAPI } from "../../../../Utils/API/Tours";
import Swal from "sweetalert2";

// Mockear la API y librerías externas
jest.mock("../../../../Utils/API/Tours", () => ({
  getAddonsPricingAPI: jest.fn(),
  deleteAddonAPI: jest.fn(),
}));
jest.mock('sweetalert2', () => ({
  fire: jest.fn().mockResolvedValue({ isConfirmed: true }),
}));

describe("Addons tests", () => {
  const mockToggle = jest.fn();

  beforeEach(() => {
    getAddonsPricingAPI.mockResolvedValue({
      data: { data: [] }, // Datos de ejemplo, pueden ser mockData
    });
    jest.clearAllMocks();
  });

  test("renders AddonsComponent with data", async () => {
    const mockData = [
      {
        active: 1,
        add_on_type: "Extra People",
        add_on_type_id: 359,
        name: "Addons Name",
      },
    ];

    getAddonsPricingAPI.mockResolvedValueOnce({
      data: { data: mockData },
    });

    render(<AddonsComponent id={1} tourData={{}} toggle={mockToggle} />);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Addons Name"
        )
      ).toBeInTheDocument();
    });
  });

// ------------------------------------------> Verificar que la tabla se refresca correctamente tras una llamada a la API
  test('refreshTable updates addons data', async () => {
    const mockData = [{ id: 1, name: 'Addon 1' }];
    getAddonsPricingAPI.mockResolvedValueOnce({
      data: { data: mockData },
    });
    render(<AddonsComponent id={1} tourData={{}} toggle={mockToggle} />);
    await waitFor(() => {
      expect(getAddonsPricingAPI).toHaveBeenCalledWith(1);
    });
  });

  // ----------------------------------------> Verificar que el botón de continuar llama a toggle con el valor correcto
  test('calls toggle when "Continue" button is clicked', () => {

    render(<AddonsComponent id={1} tourData={{}} toggle={mockToggle} />);

    const continueButton = screen.getByText(/Continue/i);
    fireEvent.click(continueButton);

    expect(mockToggle).toHaveBeenCalledWith('7');
  });

   // ---------------------------------------> Verificar que la API de eliminación se llama correctamente y la tabla se refresca
  
   test('deletes addon and refreshes table on confirmation', async () => {
    const mockData = [{ id: 1, name: 'Addon 1', price: 100 }];
  
    // Mock para obtener los datos de los addons
    getAddonsPricingAPI.mockResolvedValueOnce({
      data: { data: mockData },
    });
  
    // Mock para simular la eliminación exitosa
    deleteAddonAPI.mockResolvedValue({});
  
    // Simula la confirmación de SweetAlert
    Swal.fire.mockResolvedValueOnce({ isConfirmed: true });
  
    render(<AddonsComponent id={1} tourData={{}} toggle={jest.fn()} />);
  
    // Espera a que la tabla esté renderizada y visible
    await screen.findByText(/Addon 1/i);
  
    // Busca el botón de eliminar dentro de esa fila
    const deleteButton = screen.getByTestId('delete-addon-1'); 
    fireEvent.click(deleteButton);
  
    // Espera a que la función deleteAddonAPI haya sido llamada con el ID correcto
    await waitFor(() => {
      expect(deleteAddonAPI).toHaveBeenCalledWith(1);
    });
  
    // Espera a que el addon ya no esté en el documento después de la eliminación
    expect(screen.queryByText(/Addon 1/i)).not.toBeInTheDocument();
  });

  // ----------------------------------> Verificar que la API de eliminación maneja errores correctamente
  // test('handles API error during addon deletion', async () => {
  //   // Simular error de la API
  //   deleteAddonAPI.mockRejectedValue({
  //     response: { data: { message: 'Error deleting' } }, // Asegúrate que esta estructura coincida con la esperada
  //   });
  
  //   render(<AddonsComponent id={1} tourData={{}} toggle={jest.fn()} />);
  
  //   const deleteButton = await screen.findByTestId('delete-addon-1');
  //   fireEvent.click(deleteButton);
  
  //   // Simular confirmación de SweetAlert
  //   Swal.fire.mockResolvedValueOnce({ isConfirmed: true });
  
  //   // Espera a que se muestre el mensaje de error correcto
  //   await waitFor(() => {
  //     expect(Swal.fire).toHaveBeenCalledWith('Error!', 'Error deleting');
  //   });
  // });

  // -----------------------------------> Verificar que la funcionalidad de eliminación llama a la API correctamente
  // test('onDeleteAddon calls API and shows success message', async () => {
  //   // Simular confirmación de SweetAlert
  //   Swal.fire.mockResolvedValueOnce({ isConfirmed: true });
  
  //   // Simular éxito en la API de eliminación
  //   deleteAddonAPI.mockRejectedValueOnce({
  //     response: { data: null },
  //   });
  
  //   // Mockear la respuesta de la API para obtener los datos iniciales
  //   const mockData = [{ id: 1, name: 'Addon 1', price: 100 }];
  //   getAddonsPricingAPI.mockResolvedValueOnce({
  //     data: { data: mockData },
  //   });
  
  //   // Renderizar el componente
  //   render(<AddonsComponent id={1} tourData={{}} toggle={jest.fn()} />);
  
  //   // Esperar a que el componente cargue y el botón de eliminar esté disponible
  //   const deleteButton = await screen.findByTestId('delete-addon-1');
  //   fireEvent.click(deleteButton);
  
  //   // Simular confirmación de SweetAlert
  //   await waitFor(() => {
  //     expect(Swal.fire).toHaveBeenCalledWith(expect.objectContaining({
  //       title: 'Delete Addon?',
  //       text: 'Do you want delete Addon 1',
  //     }));
  //   });
  
  //   // Asegurarse de que se ha llamado a la API de eliminación con el ID correcto
  //   await waitFor(() => {
  //     expect(deleteAddonAPI).toHaveBeenCalledWith(1);
  //   });
  
  //   // Asegurarse de que la tabla se ha actualizado después de la eliminación
  //   expect(getAddonsPricingAPI).toHaveBeenCalledWith(1);
  // });
});

