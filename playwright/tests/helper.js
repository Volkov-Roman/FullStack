const loginWith = async (page, username, password)  => {
  await page.getByRole('button', { name: 'log in' }).click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createBlog = async (page, { title, author, url }) => {
  await page.getByRole('button', { name: 'new blog' }).waitFor()
  await page.getByRole('button', { name: 'new blog' }).click()
  await page.getByPlaceholder('Title').fill(title)
  await page.getByPlaceholder('Author').fill(author)
  await page.getByPlaceholder('URL').fill(url)
  await page.getByRole('button', { name: 'save' }).click()
}
  
export { loginWith, createBlog }
