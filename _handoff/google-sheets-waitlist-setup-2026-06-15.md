# Wait-list to Google Sheet setup (Apps Script), 2026-06-15

Every wait-list signup from the site modal POSTs to `/api/wait-list`, which fans
the lead out to (1) a Google Sheet and (2) an email to Emily. This doc covers the
Google Sheet leg. It takes about five minutes.

The site already sends the POST. It is a no-op until `WAITLIST_SHEET_WEBHOOK_URL`
is set in Vercel, so nothing breaks before then.

## What the endpoint sends

`/api/wait-list` POSTs this JSON to the Apps Script web app:

```json
{
  "firstName": "Jordan",
  "lastName": "Lee",
  "email": "jordan@gracechurch.org",
  "churchDomain": "gracechurch.org",
  "referralCode": "michele okimura 2026",
  "source": "case-study:grace-community",
  "timestamp": "2026-06-15T14:03:22.000Z"
}
```

`source` is the CTA the lead clicked. Current values: `header`, `footer`,
`home-hero`, `how-it-works-hero`, `how-it-works`, `subscription-monthly`,
`subscription-annual`, `portfolio`, `resources-index`, `resources-article:<slug>`,
`case-studies-index`, `case-study:<slug>`, `contact-block`, `contact-page`.

## Steps (do these in Emily's Workspace, emily@createchurchmedia.com)

1. Create a Google Sheet named **CCM Wait List Signups**. In row 1 add headers:
   `Timestamp | First Name | Last Name | Email | Church Domain | Source | Referral Code`.
2. In the sheet: **Extensions → Apps Script**. Replace the default code with:

   ```js
   function doPost(e) {
     try {
       var data = JSON.parse(e.postData.contents);
       var sheet = SpreadsheetApp
         .getActiveSpreadsheet()
         .getSheetByName('Signups') || SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
       sheet.appendRow([
         data.timestamp || new Date().toISOString(),
         data.firstName || '',
         data.lastName || '',
         data.email || '',
         data.churchDomain || '',
         data.source || '',
         data.referralCode || ''
       ]);
       return ContentService
         .createTextOutput(JSON.stringify({ ok: true }))
         .setMimeType(ContentService.MimeType.JSON);
     } catch (err) {
       return ContentService
         .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
         .setMimeType(ContentService.MimeType.JSON);
     }
   }
   ```

   (If you keep the tab named "Sheet1", change `getSheetByName('Signups')` to
   match, or just leave the fallback to the first sheet.)
3. **Deploy → New deployment → Type: Web app.**
   - Description: `CCM wait list intake`
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click Deploy, authorize, and copy the **Web app URL**
     (looks like `https://script.google.com/macros/s/AKfyc.../exec`).
4. In Vercel (createmediagroup-site project) → Settings → Environment Variables,
   add `WAITLIST_SHEET_WEBHOOK_URL` = that URL, for Production (and Preview if
   you want test signups logged). Redeploy.
5. Test: open the live site, click any "Join the wait list" button, submit. A new
   row should appear in the sheet within a second or two.

## Notes

- The endpoint keeps the existing Resend email to Emily alongside the Sheet
  write.
- The Sheet write is best-effort: if the webhook is slow or down, the signup
  still emails Emily and the request still succeeds for the user.
- To rotate the URL, redeploy the Apps Script (new deployment) and update the
  Vercel env var. Old URLs keep working until the deployment is archived.

CCM does not use GoHighLevel. Emily uses HoneyBook for contracts and the client
portal, so there is no CRM sync from this endpoint.

- Env vars consumed by `/api/wait-list`: `WAITLIST_SHEET_WEBHOOK_URL` (Sheet),
  `RESEND_API_KEY` + `WAITLIST_TO` + `WAITLIST_FROM` (email).
