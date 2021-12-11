'use strict';

const { api, params } = require('@serverless/cloud'); // eslint-disable-line

test('API', async () => {
  const redirect = {
    url: 'https://serverless.com',
    name: 'home',
  };
  const { body: createdRedirect } = await api
    .put(`/?adminPassword=${params.ADMIN_PASSWORD}`)
    .invoke(redirect);

  expect(createdRedirect.url).toBeDefined();
  expect(createdRedirect.shortUrl).toBeDefined();
  expect(createdRedirect.name).toBeDefined();

  await api.delete(`/home?adminPassword=${params.ADMIN_PASSWORD}`).invoke();
});
