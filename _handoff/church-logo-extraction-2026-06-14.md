# Church logo extraction — 2026-06-14

Replaced the AI-generated placeholder shapes in the trust block (`src/components/ChurchLogos.tsx`)
with real logos pulled from each church's live website. Each logo was recolored to a monochrome
set — `public/church-logos/<slug>-{black,white,yellow}.png` (66 files, 22 churches × 3 variants).

The trust band sits on a black background, so the component displays the **white** variant and
cross-fades to Emily's brand **yellow (#EEDD47)** on hover (200ms opacity cross-fade). The black
variant is generated and on disk for any future light-background use.

## Results: 15 real logos extracted, 7 clean wordmark fallbacks (22/22 covered)

### Real logos (15)
| slug | source | quality notes |
|---|---|---|
| the-grove-church | header logo, 2200×696 transparent | excellent, high-res |
| community-christian-church | header logo (C3), transparent | clean |
| centerpoint-utah | site mark (cross), 1000×1000 | icon only, no wordmark — name label carries it |
| cornerstone-buzz | header logo, 2500×483 transparent | excellent |
| shelby-church | site logo, 1080×240 transparent | clean (reads "Shelbyville Community Church") |
| faith-bible-ok | site logo, 496×78 | **low-res** source; fine small, won't scale up |
| northpointe-community-church | header logo, 2500×816 | excellent |
| eastown-church | mobile header wordmark, 2500×450 | excellent |
| lifepoint-church | header logo, 2500×614 | excellent |
| ignite-church | header logo (flame), 1348×998 | dense flame detail; OK but busiest of the set |
| swg-leadership | header logo, 300×175 | low-ish res but clean |
| cornerstone-manteca | header mark (ring), 1500×1091, **no alpha** | white background knocked out programmatically; clean ring |
| the-crossing-church | site logo, 600×183 transparent | clean |
| lifechurch-atlanta | brand icon, 270×270 | **icon only, no name** + church rebranded to "Grace and Purpose Church"; weakest one, consider replacing |
| yit-indianapolis | header logo, 2504×1643 | high quality, but yitindy.org is **Youth Inspirations Theatre**, not a church — confirm it belongs here |

### Wordmark fallbacks (7) — set in Arial Bold, recolored to the same 3 variants
| slug | why it fell back |
|---|---|
| fcc-santa-maria | SnapPages site, text-only header, no logo image |
| sanibel-community-church | og:image was a **photo of the church building**, not a logo |
| holland-chapel | site is **dead/compromised** (returns WordPress malware files); link removed |
| central-coast-young-adults | Squarespace account **expired** ("Website Expired"); link removed |
| calvary-fort-worth | JS-rendered SPA, no static logo asset (would need a headless browser) |
| faith-community-fellowship | the site's `logo-white.png` was an unrelated "ABM" mark, not the church's logo |
| for-the-one-church | the site asset was the **ONEkids** children's-ministry sub-brand, not the main church logo |

## For Brett to iterate
- **lifechurch-atlanta** and **yit-indianapolis**: identity mismatches noted above — decide whether to keep, swap, or drop.
- **faith-community-fellowship** and **for-the-one-church**: if you can get the correct logo files from Emily, drop them in `_handoff/church-logo-raw-2026-06-14/<slug>.<ext>`, remove the slug from the `WORDMARK` set in `scripts/process-church-logos.py`, and re-run it.
- **faith-bible-ok / swg-leadership**: low-res sources; a higher-res file from Emily would sharpen them.
- **holland-chapel / central-coast-young-adults**: dead sites — currently shown as wordmarks with no link. Drop them if they're no longer worth listing.

## How to regenerate
Raw source assets are archived in `_handoff/church-logo-raw-2026-06-14/`.
Run `python3 scripts/process-church-logos.py` to rebuild all 66 variants.

---

## Round 2 (2026-06-14 PM): hunting the 7 wordmark fallbacks

Brett asked to find the real logos for the 7 fallbacks "by any means." A research
pass (Wayback Machine, current-site header `<img>` inspection, og:image, Squarespace/
Wix/SnapPages CDN assets) recovered **5 real logos**. Processed with
`scripts/process-new-logos.py <slug>=<rawpath>` (targeted: overwrites only the
named slugs, leaves the 13 existing logos untouched). Raw sources archived in
`_handoff/church-logo-raw-2026-06-14/`.

| slug | result | source recipe | original asset URL |
|---|---|---|---|
| fcc-santa-maria | REAL ✓ | current-site header `<img>` (found via 2025 Wayback snapshot) — flame/water-drop "F" + FIRST CHRISTIAN CHURCH | `thechurchco-production.s3.amazonaws.com/.../logo-with-words_white-2_logo.png` |
| faith-community-fellowship | REAL ✓ | current-site header logo. **NB: the CDN file named `logo-white.png` is an unrelated "ABM" mark — do not use it.** Correct file: | `fcffamily.com/wp-content/uploads/2023/11/NLtmrLSZ.png` (1254×496) |
| sanibel-community-church | REAL ✓ | current-site header, uncropped master (lighthouse + wordmark) | `sanibelchurch.com/wp-content/uploads/2025/05/SCC-Final.png` |
| calvary-fort-worth | REAL ✓ | Wayback 2026-02 snapshot, SnapPages `id="sp-logo"` element | `files.snappages.site/6S654W/assets/images/8337832_500x168_500.png` |
| for-the-one-church | REAL ✓ | Wayback 2022 snapshot, Wix media — MAIN "O·NE" wordmark (NOT the ONEkids sub-brand) | `static.wixstatic.com/media/8ac52c_c449c5ee37d848bebce3ada8cd389ebf~mv2.png` |
| central-coast-young-adults | WORDMARK (kept) | Found a 2122×2730 CCYA navy-disc monogram (Wayback 2023 Squarespace), but the monogram is defined by color *inside* a solid disc, so it flattens to a featureless white circle under monochrome recolor. Reverted to wordmark. Raw kept at `central-coast-young-adults.webp` if someone wants a full-color treatment later. | `static1.squarespace.com/.../CCYA+logo_blue.png` |
| holland-chapel | WORDMARK (kept) | **UNRESOLVED.** Found a real "Holland Chapel Baptist Church, Benton AR" logo (`holland-chapel-CANDIDATE-benton-ar.png`, 1700×2000) but could NOT confirm it is Emily's client — multiple distinct "Holland Chapel" churches exist. Needs Emily/Brett to confirm the right church before use. | candidate only |

**Net: 18 of 20 churches now have real extracted logos** (was 13). Remaining 2
wordmarks: central-coast-young-adults, holland-chapel. The marquee top row is the
real-logo tier; these two sit in the bottom row.
