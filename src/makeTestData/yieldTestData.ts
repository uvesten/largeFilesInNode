import { faker } from "@faker-js/faker";

export function* yieldTestData(
  size: number,
  people: string[]
): Generator<string> {
  yield "date; name; company; address; account_number; transaction_type; amount; currency_code\n";

  let numericDate = new Date().getTime() - 365 * 60 * 60 * 1000;

  for (let i = 0; i < size; i += 1) {
    numericDate += Math.trunc(Math.random() * 10) + 1;
    yield `${new Date(numericDate).toISOString()}; ${
      people[Math.trunc(Math.random() * people.length)] as string
    }; ${faker.finance.transactionType()}; ${(
      Math.random() * 1_100_000
    ).toFixed(2)}; USD\n`;
  }
}
