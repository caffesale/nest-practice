import { faker } from '@faker-js/faker/locale/en';

export const completeUser = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  password: 'password123#',
};
