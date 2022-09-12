import { faker } from "@faker-js/faker";

export function makeDemoPeople(size: number) {
  const demoPeople = new Array<string>(size);
  for (let i = 0; i < size; i += 1) {
    demoPeople[i] =
      `${faker.name.fullName()}; ${faker.company.name()}; ` +
      `${faker.address.streetAddress()}, ${faker.address.zipCode()}, ${faker.address.city()}, ${faker.address.country()}; ` +
      `${faker.finance.account()}`;
  }
  return demoPeople;
}
