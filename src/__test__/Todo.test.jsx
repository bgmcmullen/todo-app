import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../Components/Todo/index.jsx';

import { MantineProvider } from '@mantine/core';

import SettingsProvider from '../Context/Settings/index.jsx'

describe('Todo Component', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    })
  });

  beforeEach(() => {
    localStorage.clear();
  });

  test('renders Todo component and navigates to Settings page', () => {
    render(
      <>
        <MantineProvider>
          <SettingsProvider>
            <Todo />
          </SettingsProvider >
        </MantineProvider>
      </>
    );

    // Check if the header and footer are rendered
    expect(screen.getByText('To Do List: 0 items pending')).toBeInTheDocument();
    expect(screen.getByText('© 2024 Brendan McMullen')).toBeInTheDocument();

    // Check if the navigation links are rendered
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();

    // Navigate to the Settings page
    fireEvent.click(screen.getByText('Settings'));
    expect(screen.getByText('Sort by Difficulty')).toBeInTheDocument(); // Adjust based on actual settings page content
  });

  test('adds a new item', async () => {
    render(
      <>
        <MantineProvider>
          <SettingsProvider>
            <Todo />
          </SettingsProvider >
        </MantineProvider>
      </>
    );

    fireEvent.click(screen.getByText('Home'));
    // Fill out the form and submit
    fireEvent.change(screen.getByLabelText('To Do Item'), { target: { value: 'New Task' } }); // Adjust label text
    fireEvent.change(screen.getByLabelText('Assigned To'), { target: { value: 'John Doe' } }); // Adjust label text
    fireEvent.change(screen.getByLabelText(/difficulty/i), { target: { value: '3' } }); // Adjust label text
    fireEvent.click(screen.getByText('Add Item')); // Adjust button text

    // Wait for the item to be added to the list
    await waitFor(() => expect(screen.getByText('New Task')).toBeInTheDocument());

    // Check if the item is added to localStorage
    const storedList = JSON.parse(localStorage.getItem('Context-API-list'));
    expect(storedList).toHaveLength(1);
    expect(storedList[0].text).toBe('New Task'); // Adjust based on actual item properties
  });

  test('toggles item completion', async () => {
    render(<>
      <MantineProvider>
        <SettingsProvider>
          <Todo />
        </SettingsProvider >
      </MantineProvider>
    </>);

    // Add an item
    fireEvent.change(screen.getByLabelText('To Do Item'), { target: { value: 'Task to Complete' } }); // Adjust label text
    fireEvent.click(screen.getByText('Add Item')); // Adjust button text

    // Wait for the item to be added
    await waitFor(() => expect(screen.getByText('Task to Complete')).toBeInTheDocument());

    // Toggle item completion
    fireEvent.click(screen.getByText('Mark Complete'));

    // Check if the item's completion status is toggled
    const storedList = JSON.parse(localStorage.getItem('Context-API-list'));
    expect(storedList[0].complete).toBe(true);
  });

  test('deletes an item', async () => {
    render(<>
      <MantineProvider>
        <SettingsProvider>
          <Todo />
        </SettingsProvider >
      </MantineProvider>
    </>);

    // Add an item
    fireEvent.change(screen.getByLabelText('To Do Item'), { target: { value: 'Task to Delete' } }); // Adjust label text
    fireEvent.click(screen.getByText('Add Item')); // Adjust button text

    // Wait for the item to be added
    await waitFor(() => expect(screen.getByText('Delete')).toBeInTheDocument());

    // Delete the item
    fireEvent.click(screen.getByText('Delete')); // Adjust button text based on actual button

    // Check if the item is deleted from the list and localStorage
    await waitFor(() => expect(screen.queryByText('Task to Delete')).not.toBeInTheDocument());

    const storedList = JSON.parse(localStorage.getItem('Context-API-list'));
    expect(storedList).toHaveLength(0);
  });
});
