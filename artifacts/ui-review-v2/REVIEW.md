# Pathment design review, September 23, 2026

This pass supersedes the earlier illustrative previews in ui-review.

## Design and media

The landing page follows the working product's public-appearance.css green palette. It retains the official blue P logo with green accent. The hero, gallery, feature grid, workflow, community story, pricing, FAQ, and final enquiry were inspected in the browser.

Three real captures from the local seeded demo workspace replace illustrative product UI: mentor dashboard, weekly clan review, and curriculum roadmap drawer. Source PNGs and optimized WebP files are in public/product. The 24-second H.264 visual tour is assembled from these screens, with chapter titles, English captions, native controls, and no audio. It is not a live interaction recording. No production member data is included.

## Verification

- TypeScript and whole-repository ESLint passed.
- 16 workspace parsing and canonical routing assertions passed.
- Browser verified gallery selection, arrow-key navigation, screenshot dialog and Escape dismissal.
- Browser verified video playback (24 seconds, advancing currentTime, captions track).
- Published Starter, Growth, and Scale plans loaded through the same-origin API. Growth selection reached /pricing?plan=Growth#getting-started and populated the enquiry email subject.
- Mobile menu opened and closed; invalid external workspace URL displayed feedback and disabled Continue; valid workspace enabled it.
- No horizontal document overflow at 320, 390, 768, and 1440 pixels. Tablet pricing alignment was refined after visual inspection.
- Rendered homepage has no em dashes.

## Scope

Marketing workspace routing is verified. Authenticated cross-tenant isolation, workspace provisioning, invoice collection, and operator activation belong to the product and were not verified end to end here. The team contact opens an email client and does not send a message automatically. No deployment was performed.

Individual section screenshots are preferable to the full-page captures, which may contain browser stitching artifacts around sticky navigation.
