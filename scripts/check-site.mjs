import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const indexPath = path.join(root, "index.html");
const index = await readFile(indexPath, "utf8");
const designSystem = await readFile(path.join(root, "assets/css/design-system.css"), "utf8");

const requiredFiles = [
  ".nojekyll",
  ".image-slots.state.json",
  "robots.txt",
  "favicon.svg",
  "assets/css/design-system.css",
  "assets/css/site.css",
  "assets/js/support.js",
  "assets/js/image-slot.js",
  "assets/vendor/react.production.min.js",
  "assets/vendor/react-dom.production.min.js",
  "assets/fonts/barlow-400.woff2",
  "assets/fonts/barlow-500.woff2",
  "assets/fonts/barlow-700.woff2",
  "assets/fonts/barlow-condensed-400.woff2",
  "assets/fonts/barlow-condensed-600.woff2",
  "assets/fonts/OFL.txt"
];

await Promise.all(requiredFiles.map(file => access(path.join(root, file))));

const localReferences = [...index.matchAll(/(?:href|src)="(\.\/[^"#?]+)"/g)]
  .map(match => match[1].replace(/^\.\//, ""));

await Promise.all(localReferences.map(file => access(path.join(root, file))));

const serviceBlock = index.match(/services = \[([\s\S]*?)\n  \];/);
const serviceCount = serviceBlock ? [...serviceBlock[1].matchAll(/\{ title:/g)].length : 0;

const checks = [
  [index.includes('name="robots" content="noindex, nofollow, noarchive, nosnippet"'), "Missing noindex metadata"],
  [index.includes("window.__resources"), "Local runtime resource mapping is missing"],
  [!index.includes("info@purtillsolicitors.com"), "Legacy enquiry email remains in the page"],
  [!(/tel:\+[^"'\n]*\s/.test(index)), "A telephone URI contains whitespace"],
  [!designSystem.includes("fonts.googleapis.com"), "Google Fonts is still loaded remotely"],
  [serviceCount === 9, `Expected 9 services, found ${serviceCount}`],
  [index.includes("componentDidUpdate()"), "Lifecycle fix is missing"],
  [index.includes("#/services/residential-and-commercial-property") || index.includes("hrefFor('service'"), "Service routing is missing"]
];

const failures = checks.filter(([passed]) => !passed).map(([, message]) => message);
if (failures.length) throw new Error(failures.join("\n"));

console.log(`Site check passed: ${requiredFiles.length} required files, ${localReferences.length} local references and ${serviceCount} services.`);
