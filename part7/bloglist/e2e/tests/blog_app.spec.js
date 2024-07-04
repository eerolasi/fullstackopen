const { test, expect, beforeEach, describe } = require('@playwright/test')
const { resetDatabase, login, createBlog, likeTimes } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await resetDatabase(request)
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('blogs')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkai')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('mluukkain')
      await page.getByTestId('password').fill('salainen')
      await page.getByRole('button', { name: 'Login' }).click()

      await expect(page.getByText('Wrong credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await login(page, 'mluukkai', 'salainen')
    })

    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'create new blog' }).click()
      await page.getByTestId('title').fill('otsikko')
      await page.getByTestId('author').fill('kirjoittaja')
      await page.getByTestId('url').fill('osoite')

      await page.getByRole('button', { name: 'Create' }).click()
      await expect(page.getByText('otsikko by kirjoittaja')).toBeVisible()
    })
    describe('a blog exists', () => {
      beforeEach(async ({ page }) => {
        await createBlog(page, 'otsikko', 'kirjoittaja', 'osoite')
      })

      test('a blog can be liked', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        await page.getByRole('button', { name: 'like' }).click()

        await expect(page.getByText('You liked')).toBeVisible()
      })

      test('a blog can be deleted by its author', async ({ page }) => {
        await page.getByRole('button', { name: 'view' }).click()
        page.on('dialog', async (dialog) => {
          await dialog.accept()
        })
        await page.getByRole('button', { name: 'remove' }).click()
        await expect(page.getByText('removed')).toBeVisible()

        await expect(page.getByText('otsikko by kirjoittaja')).not.toBeVisible()
      })
      test('only the author can delete a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'logout' }).click()
        await login(page, 'ted', 'tedsecret')

        await page.getByRole('button', { name: 'view' }).click()
        await expect(page.getByText('remove')).not.toBeVisible()
      })
    })
  })
})
