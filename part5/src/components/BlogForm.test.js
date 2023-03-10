import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import BlogForm from './BlogForm';

test('<BlogForm /> calls event handler', async () => {
  const createBlog = jest.fn();
  const user = userEvent.setup();

  render(<BlogForm createBlog={createBlog} />);

  const inputTitle = screen.getByPlaceholderText('title');
  const inputAuthor = screen.getByPlaceholderText('author');
  const inputUrl = screen.getByPlaceholderText('url');

  const sendButton = screen.getByText('create');

  await user.type(inputTitle, 'blog');
  await user.type(inputAuthor, 'author');
  await user.type(inputUrl, 'url');

  await user.click(sendButton);

  expect(createBlog.mock.calls[0][0].title).toBe('blog');
  expect(createBlog.mock.calls[0][0].author).toBe('author');
  expect(createBlog.mock.calls[0][0].url).toBe('url');
});
