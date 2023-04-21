import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Task from '.'


describe('Task Component', () => {
  test('renders task component correctly', () => {
    // Render the Task component
    render(<Task />);

    // Assert that the component renders as expected
    expect(screen.getByText('To do')).toBeInTheDocument();
    expect(screen.getByText('In Progress')).toBeInTheDocument();
    expect(screen.getByText('Done')).toBeInTheDocument();
  });

  test('adds a new task when form is submitted', () => {
    // Render the Task component
    render(<Task />);

    // Click the add task button to show the add task form
    const addButton = screen.getByText('Add Task');
    userEvent.click(addButton);

    // Fill in the form fields
    const taskNameInput = screen.getByLabelText('Task Name');
    const descriptionInput = screen.getByLabelText('Description');
    const assignMemberInput = screen.getByLabelText('Assign Member');
    const dateInput = screen.getByLabelText('Date');
    const submitButton = screen.getByText('Add');
    userEvent.type(taskNameInput, 'New Task');
    userEvent.type(descriptionInput, 'This is a new task');
    userEvent.selectOptions(assignMemberInput, '1'); // assuming '1' is the value of the first member option
    userEvent.type(dateInput, '2023-04-19');
    userEvent.click(submitButton);

    // Assert that the new task is added and shown in the 'To do' column
    expect(screen.getByText('New Task')).toBeInTheDocument();
    expect(screen.getByText('This is a new task')).toBeInTheDocument();
    expect(screen.getByText('To do')).toBeInTheDocument();
  });

  // Add more test cases for other functionalities of the Task component
});
