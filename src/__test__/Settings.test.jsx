import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SettingsProvider, { SettingsContext } from '../Context/Settings/index.jsx';

describe('SettingsProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should provide default settings on initial render', () => {
    render(
      <SettingsProvider>
        <SettingsContext.Consumer>
          {value => (
            <>
              <div data-testid="itemsPerPage">{value.itemsPerPage}</div>
              <div data-testid="hideCompletedItems">{value.hideCompletedItems.toString()}</div>
              <div data-testid="sortBy">{value.sortBy}</div>
            </>
          )}
        </SettingsContext.Consumer>
      </SettingsProvider>
    );

    expect(screen.getByTestId('itemsPerPage')).toHaveTextContent('3');
    expect(screen.getByTestId('hideCompletedItems')).toHaveTextContent('false');
    expect(screen.getByTestId('sortBy')).toHaveTextContent('index');
  });

  test('should restore settings from localStorage on initial render', async () => {
    localStorage.setItem('Context-API-settings', JSON.stringify({
      itemsPerPage: 5,
      hideCompletedItems: true,
      sortBy: 'name'
    }));

    await act(async () => {
      render(
        <SettingsProvider>
          <SettingsContext.Consumer>
            {value => (
              <>
                <div data-testid="itemsPerPage">{value.itemsPerPage}</div>
                <div data-testid="hideCompletedItems">{value.hideCompletedItems.toString()}</div>
                <div data-testid="sortBy">{value.sortBy}</div>
              </>
            )}
          </SettingsContext.Consumer>
        </SettingsProvider>
      );
    });

    expect(screen.getByTestId('itemsPerPage')).toHaveTextContent('5');
    expect(screen.getByTestId('hideCompletedItems')).toHaveTextContent('true');
    expect(screen.getByTestId('sortBy')).toHaveTextContent('name');
  });

  test('should update localStorage when settings change', async () => {
    await act(async () => {
      render(
        <SettingsProvider>
          <SettingsContext.Consumer>
            {value => (
              <>
                <button onClick={() => value.setItemsPerPage(10)}>Change Items Per Page</button>
                <button onClick={value.toggleCompletedItems}>Toggle Completed Items</button>
                <button onClick={() => value.setSortBy('date')}>Change Sort By</button>
              </>
            )}
          </SettingsContext.Consumer>
        </SettingsProvider>
      );
    });

    act(() => {
      screen.getByText('Change Items Per Page').click();
      screen.getByText('Toggle Completed Items').click();
      screen.getByText('Change Sort By').click();
    });

    await waitFor(() => {
      const settings = JSON.parse(localStorage.getItem('Context-API-settings'));
      expect(settings).toEqual({
        itemsPerPage: 10,
        hideCompletedItems: true,
        sortBy: 'date'
      });
    });
  });

  test('should toggle hideCompletedItems when toggleCompletedItems is called', async () => {
    await act(async () => {
      render(
        <SettingsProvider>
          <SettingsContext.Consumer>
            {value => (
              <>
                <div data-testid="hideCompletedItems">{value.hideCompletedItems.toString()}</div>
                <button onClick={value.toggleCompletedItems}>Toggle Completed Items</button>
              </>
            )}
          </SettingsContext.Consumer>
        </SettingsProvider>
      );
    });

    expect(screen.getByTestId('hideCompletedItems')).toHaveTextContent('false');

    act(() => {
      screen.getByText('Toggle Completed Items').click();
    });
    expect(screen.getByTestId('hideCompletedItems')).toHaveTextContent('true');

    act(() => {
      screen.getByText('Toggle Completed Items').click();
    });
    expect(screen.getByTestId('hideCompletedItems')).toHaveTextContent('false');
  });
});
