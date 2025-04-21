import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author, but not url or likes by default', () => {
  const blog = {
    title: 'Testing React components',
    author: 'Roma',
    url: 'http://example.com',
    likes: 420
  }

  render(<Blog blog={blog} />)

  expect(screen.getByText(/Testing React components/)).toBeDefined()
  expect(screen.getByText(/Roma/)).toBeDefined()

  const urlElement = screen.queryByText('http://example.com')
  const likesElement = screen.queryByText('likes')

  expect(urlElement).toBeNull()
  expect(likesElement).toBeNull()
})
