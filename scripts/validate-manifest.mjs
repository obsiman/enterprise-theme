import { strict as assert } from "node:assert";
import { read } from "./validation-utils.mjs";

const manifest = JSON.parse(await read("manifest.json"));
const versions = JSON.parse(await read("versions.json"));
const packageJson = JSON.parse(await read("package.json"));

assert.deepEqual(Object.keys(manifest).sort(), ["author", "authorUrl", "minAppVersion", "name", "version"].sort(), "Manifest contains unsupported or missing theme fields.");
assert.equal(manifest.name, "Enterprise");
assert.equal(manifest.author, "Bruno");
assert.match(manifest.authorUrl, /^https:\/\/github\.com\/[a-z0-9-]+\/?$/i);
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.equal(manifest.version, packageJson.version, "Manifest and package versions differ.");
assert.equal(manifest.minAppVersion, "1.13.7", "Enterprise targets the current public desktop release.");
assert.deepEqual(versions, { [manifest.version]: manifest.minAppVersion }, "versions.json must contain the current version contract only.");

console.log("Manifest and version validation passed.");
