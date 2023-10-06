import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('render contents', () => {
  const blog = {
    title: 'Balanced intangible success',
    author: 'Steffen Decroix',
    url: 'root:testingblogs.net',
    likes: 0,
    user: 'root'
  }

  const { container } = render(
    <Blog
      blog={blog}
      updateLikes={() => null}
      removeBlog={() => null}
      username='dummy'
    />
  )

  const element = screen.getByText('Balanced intangible success')
  expect(element).toBeDefined()

  const div = container.querySelector('.blog')

  expect(div).toHaveTextContent('Balanced intangible success')
  expect(div).toHaveTextContent('Steffen Decroix')
  expect(div).not.toHaveTextContent('root:testingblogs.net')
  expect(div).not.toHaveTextContent('likes 0')
  expect(div).not.toHaveTextContent('root')

})

test('checks that the URL and likes are shown', async () => {
  const blog = {
    title: 'Balanced intangible success',
    author: 'Steffen Decroix',
    url: 'root:testingblogs.net',
    likes: 0,
    user: 'root'
  }

  render(
    <Blog
      blog={blog}
      updateLikes={() => null}
      removeBlog={() => null}
      username='dummy'
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)
  
  const urlElement = screen.getByText('root:testingblogs.net')
  const likesElement = screen.getByText('likes 0')
  expect(urlElement).toBeDefined()
  expect(likesElement).toBeDefined()
})

test('like button is clicked twice', async () => {
  const blog = {
    title: 'Balanced intangible success',
    author: 'Steffen Decroix',
    url: 'root:testingblogs.net',
    likes: 0,
    user: 'root'
  }

  const mockHandler = jest.fn()

  const { container } = render(
    <Blog
      blog={blog}
      updateLikes={mockHandler}
      removeBlog={() => null}
      username='dummy'
    />
  )

  const user = userEvent.setup()
  await user.click(container.querySelector('.details-button'))

  const buttonLike = container.querySelector('.like-button')
  await user.click(buttonLike)
  await user.click(buttonLike)

  expect(mockHandler.mock.calls).toHaveLength(2)
})