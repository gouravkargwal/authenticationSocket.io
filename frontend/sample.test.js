import '@testing-library/jest-dom';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './src/components/Login';
import Register from './src/components/Register';
import UploadPhoto from './src/components/UploadPhoto';

describe('Frontend Test', () => {
  it('Login component', async () => {
    act(() => {
      render(<Login />);
    });
    await waitFor(() => {
      expect(screen.getByText('No tasks')).toBeInTheDocument();
    });
  });
  it('Register component', async () => {
    act(() => {
      render(<Register />);
    });

    await waitFor(() => {
      expect(screen.getByText(/Task1/i)).toBeInTheDocument();
      expect(screen.getByText(/Task2/i)).toBeInTheDocument();
    });
  });
  it('Add a todo task', async () => {
    act(() => {
      render(<Home tasks={allTasks.data} url={BASE_URL} />);
    });
    let inputEl = screen.getByRole('textbox');
    let buttonEl = screen.getByText('Add');
    const user = userEvent.setup();
    await user.type(inputEl, 'Task3');
    expect(inputEl.value).toBe('Task3');
    await user.click(buttonEl);
    await waitFor(async () => {
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(BASE_URL, {
        task: screen.getByRole('textbox').value,
      });
    });
  });

  it('Upload photo', async () => {
    act(() => {
      render(<UploadPhoto />);
    });
    await waitFor(async () => {
      let buttonEl = screen.getAllByTestId('edit');
      const user = userEvent.setup();
      await user.click(buttonEl[0]);
      let updateEl = screen.getByText(/update/i);
      await user.click(updateEl);
    });
    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalledTimes(1);
      expect(mockAxios.put).toHaveBeenCalledWith(
        `${BASE_URL}/${allTasks.data[0]._id}`,
        {
          task: screen.getByRole('textbox').value,
        }
      );
    });
  });
});
