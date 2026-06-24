// Renders scripts/og-image.html to public/og-image.jpg at 1200x630.
// Requires Playwright chromium available (npm i -D playwright, or run with an
// existing global install). Run: node scripts/generate-og.mjs
import { chromium } from 'playwright'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const htmlPath = resolve(here, 'og-image.html')
const out = resolve(here, '..', 'public', 'og-image.jpg')

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle' })
await page.evaluate(() => document.fonts.ready)
const card = await page.$('.card')
await card.screenshot({ path: out, type: 'jpeg', quality: 90 })
await browser.close()
console.log('wrote', out)
