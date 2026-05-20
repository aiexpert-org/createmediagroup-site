import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

/**
 * Default OG image for Create Media Group — 1200x630.
 *
 * Built from brand tokens (cream BG + clay accent + serif type).
 * Replace with a branded version once Emily has finished assets.
 */
export const runtime = "edge";
export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#faf7f2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#1a1916",
          fontFamily: "Georgia, 'Times New Roman', serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            letterSpacing: 5,
            textTransform: "uppercase",
            color: "#6b6864",
          }}
        >
          <span style={{ fontFamily: "Georgia, serif" }}>
            Create Media Group
          </span>
          <span style={{ color: "#b85c38" }}>$800/mo · flat</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 92,
              lineHeight: 1.0,
              fontWeight: 400,
              letterSpacing: -2,
              maxWidth: 1040,
              fontFamily: "Georgia, serif",
            }}
          >
            Your church&rsquo;s designer.
          </div>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.0,
              fontWeight: 400,
              fontStyle: "italic",
              letterSpacing: -1,
              color: "#b85c38",
              fontFamily: "Georgia, serif",
            }}
          >
            Not a design queue.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingTop: 32,
            borderTop: "1px solid #c9c1b3",
            fontSize: 22,
            color: "#6b6864",
          }}
        >
          <span>Unlimited church graphic design subscription</span>
          <span
            style={{
              letterSpacing: 4,
              textTransform: "uppercase",
              fontSize: 18,
            }}
          >
            createmediagroup.org
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
