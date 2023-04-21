import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import Member from '.';
import { useDispatch } from 'react-redux';
import { getMembers, addMembers } from '../../redux/memberActions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}));

jest.mock('../../redux/memberActions', () => ({
  getMembers: jest.fn(),
  addMembers: jest.fn()
}));

describe('Member component', () => {
  const dispatchMock = jest.fn();
  const getMembersMock = jest.fn();
  const addMembersMock = jest.fn();
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders without errors', () => {
    render(<Member />);
  });

  it('loads members on component mount', () => {
    render(<Member />);
    expect(getMembers).toHaveBeenCalled();
  });

  it('adds a new member on form submit', async () => {
    const { getByText, getByPlaceholderText } = render(<Member />);

    fireEvent.click(getByText('+ New Member'));
    fireEvent.change(getByPlaceholderText('Name'), { target: { value: 'John Doe' } });
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(addMembers).toHaveBeenCalledWith(
        expect.objectContaining({
          member_name: 'John Doe',
          member_id: expect.any(Number),
          id: expect.any(Number)
        })
      );
    });

    expect(dispatchMock).toHaveBeenCalled();
  });

  it('does not add a new member if form is not valid', async () => {
    const { getByText } = render(<Member />);

    fireEvent.click(getByText('+ New Member'));
    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(addMembers).not.toHaveBeenCalled();
    });

    expect(dispatchMock).not.toHaveBeenCalled();
  });

  it('closes add member form on cancel', () => {
    const { getByText } = render(<Member />);

    fireEvent.click(getByText('+ New Member'));
    fireEvent.click(getByText('Cancel'));

    expect(addMembersMock).not.toHaveBeenCalled();
    expect(dispatchMock).not.toHaveBeenCalled();
  });

  // Add more test cases as needed
});