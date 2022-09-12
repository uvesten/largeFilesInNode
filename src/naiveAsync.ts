import { readFile, writeFile } from "fs/promises";

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

const getSum = /^([^;]+;){5} withdrawal; (?<withdrawalSum>[0-9.]+); USD$/;

const inFile = await readFile(inFilePath, { encoding: "utf-8" });
const output: string[] = [];

for (const line of inFile.split("\n")) {
  const res = getSum.exec(line);
  const sum = parseFloat(res?.groups?.["withdrawalSum"] ?? "0");
  if (sum > 1_000_000) {
    output.push(line);
  }
}

await writeFile(outFilePath, output.join("\n"));
