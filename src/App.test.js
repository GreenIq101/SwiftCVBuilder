import { render, screen } from '@testing-library/react';
import App from './App';

test('renders SwiftCV Builder landing page', () => {
  render(<App />);
  const heading = screen.getByText(/SwiftCV Builder/i);
  expect(heading).toBeInTheDocument();
});
