import { pipeline } from "stream/promises";
import { createWriteStream } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { yieldTestData } from "./yieldTestData.js";
import { makeDemoPeople } from "./makeDemoPeople.js";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const demoPeople = makeDemoPeople(Math.trunc(Math.random() * 1000));
const streamPromises = [];

for (const [name, size] of [
  ["small", 10000],
  ["medium", 1000000],
  ["large", 8000000],
  ["very_large", 30000000],
] as const) {
  streamPromises.push(
    pipeline(
      yieldTestData(size, demoPeople),
      createWriteStream(`${__dirname}/../../data_files/${name}.csv`)
    )
  );
}

await Promise.all(streamPromises);
