// Add this object to the LEDGER_ENTRIES array in ledger-data.js.
// It matches the existing {tag, title, dek, summary, url} fields exactly,
// plus the two new fields (date, tags) the rebuilt index.html now reads
// for sorting and filtering. Existing older entries don't need date/tags
// added right away — the index handles their absence gracefully (they
// just won't be filterable by tag and will sort to the end by date) —
// but adding them when you get a chance will make search/filter better.

{
  tag: "PAC MONEY",
  title: "The Biggest Donors, So Far",
  dek: "A running, sourced ranking of the largest single donors in this investigation to date.",
  summary: "Every company, PAC, and individual documented as a major Utah political donor across this investigation, ranked and flippable to see who each one gave the most to — plus a \"Who these people are\" breakdown of the lobbyists and officials who run the network.",
  url: "biggest-donors-flip.html",
  date: "2026-09-04",
  tags: [
    "UHREC", "URSCC", "NUPAC", "HSLPAC", "Adams Leadership PAC",
    "Lincoln Hill Partners", "Lincoln Hill PAC", "Irish Elk LLC",
    "Election Hive", "Kyle Palmer", "Lincoln Shurtz", "Casey Hill",
    "Derek Brown", "Chase Everton", "Dan Hemmert", "MIDA", "Stratos",
    "Spencer Cox", "Mike Schultz", "Stuart Adams", "H3 PAC",
    "Sage Government Solutions", "RPAC", "NWAOR", "PacifiCorp",
    "Utah Bankers Association", "EnergySolutions", "campaign finance",
    "lobbying"
  ]
}
