import { render, screen } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom/extend-expect'

import Table from '../components/Employee/Table'

test('renders correct columns table', () => {
  render(<Table />);
  const firstNameElement = screen.getByText('First name');
  const lastNameElement = screen.getByText('Last name');
  const companyElement = screen.getByText('Company');
  const emailNameElement = screen.getByText('Email');
  const phoneElement = screen.getByText('Phone');
  const actionsElement = screen.getByText('Acctions');
  
  expect(firstNameElement).toBeInTheDocument();
  expect(lastNameElement).toBeInTheDocument();
  expect(companyElement).toBeInTheDocument();
  expect(emailNameElement).toBeInTheDocument();
  expect(phoneElement).toBeInTheDocument();
  expect(actionsElement).toBeInTheDocument();
});
