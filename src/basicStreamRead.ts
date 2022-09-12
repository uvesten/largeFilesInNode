import { writeFileSync } from "fs";
import { createReadStream } from "fs";

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

const inStream = createReadStream(inFilePath, { encoding: "utf-8" });
const output: string[] = [];

inStream.on("data", (line: string) => {
  const res = getSum.exec(line);
  const sum = parseFloat(res?.groups?.["withdrawalSum"] ?? "0");
  if (sum > 1_000_000) {
    output.push(line);
  }
});

const writeFinishedPromise = new Promise<void>((resolve) => {
  inStream.on("end", () => {
    writeFileSync(outFilePath, output.join("\n"));
    resolve();
  });
});

await writeFinishedPromise;
