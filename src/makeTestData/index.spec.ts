import assert from "assert";
import { makeDemoPeople } from "./makeDemoPeople.js";
import { yieldTestData } from "./yieldTestData.js";

it("exports the correct format", () => {
  const lines = yieldTestData(100, makeDemoPeople(50));

  for (const line of lines) {
    assert.match(line, /^([^;]+;){7} \w+\n$/);
  }
});
