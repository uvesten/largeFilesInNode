import { createReadStream, createWriteStream } from "fs";
import type { Readable } from "stream";
import { pipeline } from "stream/promises";
import split from "split2";

// read command line args
const argv = process.argv;

const inFilePath = argv[2]; // not much error checking going on here
const outFilePath = argv[3];

if (!(inFilePath && outFilePath)) {
  console.error(
    `This command needs to be called with inFilePath and outFilePath`
  );
  process.exit(1);
}

const getSum = /^([^;]+;){5} withdrawal; (?<withdrawalSum>[0-9.]+); USD/;

async function* logOnlyHighSums(readable: Readable): AsyncGenerator<string> {
  for await (const line of readable) {
    const res = getSum.exec(line as string);
    const sum = parseFloat(res?.groups?.["withdrawalSum"] ?? "0");
    if (sum > 1_000_000) {
      yield line;
    }
  }
}

const inStream = createReadStream(inFilePath);
const outStream = createWriteStream(outFilePath);

await pipeline(inStream, split(), logOnlyHighSums, outStream);
