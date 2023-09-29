
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import WeatherForm from './WeatherForm';

jest.mock('../utilities/cities.json', () => [
    { name: 'New York', country: 'US' },
    { name: 'Los Angeles', country: 'US' },
]);

jest.mock('../utilities/countryCodes', () => ({
    countryCodes: { US: 'United States' },
}));

test('renders WeatherForm component', () => {
    render(<WeatherForm />);
    expect(screen.getByText(/Current Weather/)).toBeInTheDocument();
});

test('can select a country from the dropdown', async () => {
    render(<WeatherForm />);
    const countryDropdown = screen.getByTestId('countryDropdown');
    userEvent.selectOptions(countryDropdown, ['United States']);
    await waitFor(() => {
        expect(countryDropdown.value).toBe('United States');
    });
});

test('shows cities in dropdown when country is selected', async () => {
    render(<WeatherForm />);
    const countryDropdown = screen.getByTestId('countryDropdown');
    userEvent.selectOptions(countryDropdown, ['United States']);
    await waitFor(async () => {
        const newYorkOption = await screen.findByText('New York');
        expect(newYorkOption).toBeInTheDocument();
    });
});
