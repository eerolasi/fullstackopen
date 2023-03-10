import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('Blog', () => {
  const blog = {
    title: 'title',
    author: 'author',
    user: {
      username: 'testuser',
      name: 'test user',
    },
  };

  const mockHandler = jest.fn();

  let container;

  beforeEach(() => {
    container = render(
      <Blog blog={blog} updateLikes={mockHandler} />
    ).container;
  });

  test('renders title', () => {
    const div = container.querySelector('.title');
    expect(div).toHaveTextContent('title');
  });
  test('renders author', () => {
    const div = container.querySelector('.author');
    expect(div).toHaveTextContent('author');
  });

  test('does not render url or likes', async () => {
    const user = userEvent.setup();
    const div = container.querySelector('.details');
    const button = screen.getByText('view');
    await user.click(button);
    expect(div).not.toHaveStyle('display: none');
  });

  test('shows details when clicked', async () => {
    const user = userEvent.setup();
    const div = container.querySelector('.details');
    const button = screen.getByText('view');

    await user.click(button);
    expect(div).not.toHaveStyle('display: none');
  });
  test('like button worked', async () => {
    const user = userEvent.setup();
    const firstButton = screen.getByText('view');
    await user.click(firstButton);

    const likeButton = screen.getByText('like');

    await user.click(likeButton);
    await user.click(likeButton);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
