// Fotos do site num iPhone simulado (390x844, toque, tela retina 2x), seção por seção.
// Uso: node scripts/celular.mjs <url> <pasta-de-saida>
import { createRequire } from "node:module";
const require = createRequire("D:/Claude/Cole Bem/goodmoney-qa/package.json");
const puppeteer = require("puppeteer-core");

const [url, out] = process.argv.slice(2);
const browser = await puppeteer.launch({
  executablePath: "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  headless: "new",
});
const page = await browser.newPage();
await page.emulate({
  viewport: { width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
  userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
});
await page.goto(url, { waitUntil: "networkidle0" });
await page.evaluate(() => document.getElementById("pv")?.remove());
await new Promise((r) => setTimeout(r, 1500));
await page.screenshot({ path: `${out}/c0-topo.png` });
// aceita os cookies pra ver o resto sem o aviso
await page.evaluate(() => [...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Aceitar")?.click());
const total = await page.evaluate(() => document.documentElement.scrollHeight);
let y = 0, i = 1;
while (y < total) {
  y += 760;
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await new Promise((r) => setTimeout(r, 1300));
  await page.screenshot({ path: `${out}/c${i}.png` });
  i++;
}
console.log("fotos:", i, "altura:", total);
await browser.close();
