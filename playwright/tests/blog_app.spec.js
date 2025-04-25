const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('/api/testing/reset')
      await request.post('/api/users', {
        data: {
          name: 'Roma Susi',
          username: 'romatest',
          password: 'salasana'
        }
      })

      await page.goto('/')
    })
    
    test('front page can be opened', async ({ page }) => {
      const locator = await page.getByText('Blogs')
      await expect(locator).toBeVisible()
      await expect(page.getByText('Roman Volkov 2025')).toBeVisible()
    })

    test('Login form is shown', async ({ page }) => {
      await page.getByRole('button', { name: 'log in' }).click()
    
      await expect(page.getByTestId('username')).toBeVisible()
      await expect(page.getByTestId('password')).toBeVisible()
    
      await expect(page.getByRole('button', { name: 'login' })).toBeVisible()
      await expect(page.getByRole('button', { name: 'cancel' })).toBeVisible()
    })

    describe('Login', () => {
      test('succeeds with correct credentials', async ({ page }) => {
        await loginWith(page, 'romatest', 'salasana')
        await expect(page.getByText('Roma Susi logged-in')).toBeVisible()
      })
    
      test('fails with wrong credentials', async ({ page }) => {
        await loginWith(page, 'romatest', 'wrongpassword')
    
        const errorDiv = await page.locator('.error')
        await expect(errorDiv).toContainText('Wrong credentials')
        await expect(errorDiv).toHaveCSS('border-style', 'solid')
        await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    
        await expect(page.getByText('Roma Susi logged in')).not.toBeVisible()
      })
    })

    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'romatest', 'salasana')
      })

      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, {
          title: 'React test',
          author: 'Author',
          url: 'https://example.com'
        })

        await expect(page.getByText('React test Author')).toBeVisible()
      })

      test('a blog can be liked', async ({ page }) => {
        await createBlog(page, {
          title: 'React test',
          author: 'Author',
          url: 'https://example.com'
        })

        await page.getByRole('button', { name: 'view' }).click()
      
        const likesText = await page.getByText(/likes:/).textContent()
        const likesBefore = parseInt(likesText.match(/\d+/)[0])
      
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText(`likes: ${likesBefore + 1}`)).toBeVisible()
      })
    })  


})
