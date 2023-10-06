import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('<BlogForm />', async () => {
  const user = userEvent.setup()
  const createNew = jest.fn()

  const { container } = render(<BlogForm createNewBlog={createNew} />)

  const inputTitle = container.getElementsByClassName('input-title')[0]
  const inputAuthor = container.getElementsByClassName('input-author')[0]
  const inputUrl = container.getElementsByClassName('input-url')[0]
  const createButton = screen.getByText('create')

  await user.type(inputTitle, 'Balanced intangible success')
  await user.type(inputAuthor, 'Steffen Decroix')
  await user.type(inputUrl, 'root:testingblogs.net')
  await user.click(createButton)

  expect(createNew.mock.calls).toHaveLength(1)
  expect(createNew.mock.calls[0][0]).toEqual({
    title: 'Balanced intangible success',
    author: 'Steffen Decroix',
    url: 'root:testingblogs.net'
  })

})