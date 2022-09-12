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

const inFile = await readFile(inFilePath);
const output: string[] = [];

let oldIdx = 0;
let idx = -1;
do {
  oldIdx += idx + 1;
  idx = inFile.subarray(oldIdx).findIndex((val) => val === "\n".charCodeAt(0));
  if (idx === -1) {
    break;
  }
  const str = inFile.slice(oldIdx, idx + oldIdx).toString("utf-8");
  const res = getSum.exec(str);
  const sum = parseFloat(res?.groups?.["withdrawalSum"] ?? "0");
  if (sum > 1_000_000) {
    output.push(str);
  }
} while (idx > 0);

await writeFile(outFilePath, output.join("\n"));
