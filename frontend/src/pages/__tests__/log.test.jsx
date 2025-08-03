import { render, screen, fireEvent } from '@testing-library/react';
import LogPage from '../log';

describe('LogPage', () => {
  it('renders the form and submits with userId, date, and intakeMl', async () => {
    render(<LogPage />);
    
    // Fill out the form
    fireEvent.change(screen.getByLabelText(/User ID/i), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText(/Date/i), { target: { value: '2025-08-04' } });
    fireEvent.change(screen.getByLabelText(/Intake \(ml\)/i), { target: { value: '500' } });

    // Mock fetch
    global.fetch = jest.fn(() => Promise.resolve({ ok: true }));

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Log Intake/i }));

    // Wait for success message
    expect(await screen.findByText(/Logged successfully!/i)).toBeInTheDocument();

    // Clean up fetch mock
    global.fetch.mockRestore();
  });
});
