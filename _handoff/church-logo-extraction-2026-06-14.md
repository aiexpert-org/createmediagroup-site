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
