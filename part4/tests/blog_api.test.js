const supertest = require('supertest');
const mongoose = require('mongoose');
const helper = require('./test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');
const User = require('../models/user');

beforeEach(async () => {
  await User.deleteMany({});
  const user = {
    username: 'username',
    name: 'name',
    password: 'password',
  };
  await api
    .post('/api/users')
    .send(user)
    .set('Accept', 'application/json')
    .expect('Content-Type', /application\/json/);
});

beforeEach(async () => {
  await Blog.deleteMany({});

  await Blog.insertMany(helper.initialBlogs);
});
describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });
  test('blogs have an "id" property', async () => {
    const response = await helper.blogsInDb();
    expect(response[0].id).toBeDefined();
  });
});

describe('addition of a new blog', () => {
  let headers;

  beforeEach(async () => {
    const login = {
      username: 'username',
      password: 'password',
    };
    const response = await api.post('/api/login').send(login);
    headers = { Authorization: `Bearer ${response.body.token}` };
  });
  test('blogs can be added', async () => {
    const blog = {
      title: 'blog',
      author: 'author',
      url: 'http://blog.com',
      likes: 1,
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .set(headers)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

    const urls = blogsAtEnd.map((blog) => blog.url);
    expect(urls).toContain('http://blog.com');
  });

  test('likes defaults 0', async () => {
    const blog = {
      title: 'blog2',
      author: 'author2',
      url: 'http://blog2.com',
    };

    const response = await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .set(headers)
      .expect('Content-Type', /application\/json/);

    expect(response.body.likes).toBe(0);
  });

  test('fails if no title or url', async () => {
    const blog = {
      author: 'author3',
    };
    await api.post('/api/blogs').send(blog).set(headers).expect(400);

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });

  test('works only with valid token', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
    };
    await api.post('/api/blogs').send(blog).expect(401);
  });
});

describe('deletion of a blog', () => {

  let headers;
  beforeEach(async () => {
    const login = {
      username: 'username',
      password: 'password',
    };

    const response = await api.post('/api/login').send(login);
    headers = { Authorization: `Bearer ${response.body.token}` };

  });

  test('delete blog', async () => {
    const blog = {
      title: 'blog',
      author: 'author',
      url: 'http://blog.com',
      likes: 1,
    };
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .set(headers)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDb();
    const blogToDelete = blogsAtEnd[blogsAtEnd.length-1];
    await api.delete(`/api/blogs/${blogToDelete.id}`).set(headers).expect(204);

    const blogs = await helper.blogsInDb();
    expect(blogs).toHaveLength(helper.initialBlogs.length);

    const url = blogs.map((b) => b.url);
    expect(url).not.toContain(blogToDelete.url);
  });
});

describe('updating of a blog', () => {
  let headers;

  beforeEach(async () => {
    const login = {
      username: 'username',
      password: 'password',
    };
    const response = await api.post('/api/login').send(login);
    headers = { Authorization: `Bearer ${response.body.token}` };
  });
  test('update blog', async () => {
    const blogs = await helper.blogsInDb();
    const blog = blogs[0];
    const update = { likes: 5 };

    const updatedBlog = await api
      .put(`/api/blogs/${blog.id}`)
      .send(update)
      .set(headers)
      .expect(200);

    expect(updatedBlog.body.likes).toBe(update.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
