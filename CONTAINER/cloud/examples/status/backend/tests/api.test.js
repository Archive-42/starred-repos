'use strict'

const { api, params } = require('@serverless/cloud');
const authorize = require('../utils/authorize');

test('Service CRUD', async () => {
  jest.spyOn(authorize).mockImplementation();

  const service = {
    serviceStatus: 'Operational',
    serviceName: 'Serverless Framework Dashboard',
    serviceDescription: 'This is the Serverless Framework Dashboard',
  };
  const response = await api
    .put(`/api/services?adminPassword=${params.ADMIN_PASSWORD}`)
    .invoke(service);

    console.log(response);

    const { body: createdService } = response

  expect(createdService.serviceStatus).toEqual(service.serviceStatus);
  expect(createdService.serviceName).toEqual(service.serviceName);
  expect(createdService.serviceDescription).toEqual(service.serviceDescription);
  expect(createdService.serviceId).toBeDefined();
  expect(createdService.serviceCreatedAt).toBeDefined();
  expect(createdService.serviceUpdatedAt).toBeDefined();

  await api
    .delete(`/services/${createdService.serviceId}?adminPassword=${params.ADMIN_PASSWORD}`)
    .invoke();
});
