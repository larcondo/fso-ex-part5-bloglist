import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
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