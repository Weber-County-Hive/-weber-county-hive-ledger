// ===== WEBER COUNTY HIVE — MONEY-FLOW LEDGER REPO DATA =====
// One entry per visualization/piece. To add a new one, add one object here.
// "date" (YYYY-MM-DD) and "tags" are optional — the index page sorts/filters
// by them when present, and just skips entries that don't have them yet.
const LEDGER_ENTRIES = [
  {
    tag: "Case 01",
    title: "The Ledger — Utah PAC Money Flow",
    dek: "Following the money between PACs, candidates, and vendors",
    summary: "A full interactive breakdown of how money moves between Utah PACs, candidates, and vendors — built from itemized campaign-finance disclosures.",
    url: "ledger.html",
    tags: ["PAC money", "campaign finance", "vendors"]
  },
  {
    tag: "Case 02",
    title: "Follow the Money — UWHA, Election Hive, and the PAC That Isn't a PAC",
    dek: "A tip about one nonprofit leads to a Super PAC attorney, a self-dealing treasurer, and $730,000 in political money",
    summary: "How a public tip about Utah Workforce Housing Advocacy traces through a Political Issues Committee that moved $360,000 in and $370,350 out — including a $25,000 payment to a PAC treasurer's own firm and two same-day contribution refunds.",
    url: "follow-the-money-uwha.html",
    tags: ["UWHA", "Election Hive", "PIC", "self-dealing", "nonprofit"]
  },
  {
    tag: "Case 03",
    title: "The Roybal Chain: How One PAC Funds a County Commissioner, a Realtors' Association, and the Man Who Registered It at His Own House",
    dek: "A PAC registered at a lobbyist's home, a Senate President's own leadership PAC, and a real estate trade association all lead to the same Weber County Commissioner",
    summary: "Chris Roybal's Utah Forward PAC, Adams Leadership PAC, and a century-old realtors' association all funded Gage Froerer's campaigns while he voted to advance the West Weber Inland Port — plus a paid consultant who was simultaneously the county's own economic development director, and a separate housing authority paying Froerer's own family business.",
    url: "west-weber-pac-chain.html",
    tags: ["Gage Froerer", "Utah Forward PAC", "Adams Leadership PAC", "Weber County Commission", "inland port", "real estate"]
  },
  {
    tag: "Case 04",
    title: "The Housing Authority Loop",
    dek: "A commissioner, his wife, and the board that pays his family's companies",
    summary: "Gage Froerer sits as a trustee of the Weber Housing Authority. So does his wife, Gloria — a fact stated openly and dismissed at his 2019 appointment. The authority has paid his family's real estate companies $19,623, operates out of the same building as his own commissioner office, and doesn't appear on either of his last two disclosure forms.",
    url: "weber-housing-authority.html",
    tags: ["Gage Froerer", "Weber Housing Authority", "conflict of interest", "real estate"]
  },
  {
    tag: "Case 05",
    title: "The Payment That Disappeared",
    dek: "A $62,500 check to a company managed by MIDA's own director appears in one report and is missing from the next",
    summary: "Utah Workforce Housing Advocacy's interim report to the state shows two checks, $62,500 total, paid to BizDevOps Consulting, LLC — a company whose only registered principal is managed by Daniel Hemmert, now MIDA's Executive Director. UWHA's year-end final report, covering the same money and the same period, includes neither check. Separately, the nonprofit's own state corporate filing lists a set of officers and directors that largely doesn't match the board shown on its public website.",
    url: "the-payment-that-disappeared.html",
    tags: ["UWHA", "MIDA", "Dan Hemmert", "BizDevOps Consulting", "nonprofit", "disappearing filing"]
  },
  {
    tag: "Case 06",
    title: "The Biggest Donors, So Far",
    dek: "A running, sourced ranking of the largest single donors documented across this investigation to date.",
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
  },
];
