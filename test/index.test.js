const fs = require("fs");
const path = require("path");
const Bundler = require("parcel-bundler");
const parcelPluginGAS = require("../lib/index");
const generateEntryFunctions = require("gas-entry-generator").generate;

describe("index.js", () => {
  beforeAll(async () => {
    const entryFile = path.resolve(__dirname, "test-source.js");

    const bundler = new Bundler(entryFile, {
      watch: false,
      minify: true,
      sourceMaps: false,
      outFile: "bundle.js",
    });

    await parcelPluginGAS(bundler);
    await bundler.bundle();
  });

  it("tests that function declarations are generated correctly", () => {
    const bundlePath = path.resolve(__dirname, "../dist/bundle.js");
    const bundleSource = fs.readFileSync(bundlePath, "utf-8");

    const bundleSourceGAS = bundleSource.replace(/globalThis\./g, "global.");
    const entries = generateEntryFunctions(bundleSourceGAS)
      .entryPointFunctions.split("\n")
      .join("");

    expect(bundleSource.includes(entries)).toBe(true);
  });
});
