---
name: title-5-roster-find-firms
description: Find MassDEP-approved Title 5 System Inspectors on Title 5 Roster by city/town or county, with credentials and links to each listing.
---

# Find firms on Title 5 Roster

Use this when someone needs MassDEP-approved Title 5 System Inspectors. Data is the public listing data from https://title5roster.com/ (official licence records; retrieval dates are in each record). A listing is not an endorsement.

## Options (pick one)

1. **Search API**: `GET https://leads.radonroster.com/api/firms?site=title5&county=<county>&service=<code>&limit=10`
   - Location (one is required): `city`, `county`.
   - Service codes: `title5_inspection` (MassDEP-approved System Inspector).
   - CORS is open. Spec: https://title5roster.com/openapi.json
2. **MCP**: streamable HTTP at `https://leads.radonroster.com/mcp?site=title5`, with tools `search_firms`, `get_firm` and `list_areas`.
3. **Static feeds** (no API call): https://title5roster.com/api/index.json lists every county/city feed, for example `https://title5roster.com/api/county/<slug>.json`. https://title5roster.com/api/firms.json has every firm.

## Using results

- Each firm has: `id`, `name`, `certification`, `issuing_agency`, `credentials[]` (number, expiry), `services`, `city`, `state`, `counties`, `cities`, `firm_url`, `quote_url` and, where the site shows it, `google_rating`.
- Area results have `match`: `local` means listed in that area's own section; `nearby` means listed under nearby/other firms.
- Phone and contact details are not in the API. Send people to `firm_url`.
- Mention that credentials should be confirmed with the issuing agency (link in `source.urls`).
- Do not scrape the HTML pages; use the feeds.
