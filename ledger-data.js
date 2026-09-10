// ===== WEBER COUNTY HIVE — MONEY-FLOW LEDGER REPO DATA =====
// One entry per visualization/piece. To add a new one, add one object here.
// "date" (YYYY-MM-DD) is the original publish date. "updated" (YYYY-MM-DD) is
// optional — add it whenever a piece's data changes after publishing, so
// readers can see it's been revised. "total" (a number) is the headline
// dollar figure for the piece, shown prominently on its card — set
// "totalPlus: true" alongside it if the figure is a floor, not a final
// count. All of these are optional and the index page just skips entries
// that don't have them yet. "tags" is also optional.
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
    total: 730000,
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
    total: 19623,
    tags: ["Gage Froerer", "Weber Housing Authority", "conflict of interest", "real estate"]
  },
  {
    tag: "Case 05",
    title: "The Payment That Disappeared",
    dek: "A $62,500 check to a company managed by MIDA's own director appears in one report and is missing from the next",
    summary: "Utah Workforce Housing Advocacy's interim report to the state shows two checks, $62,500 total, paid to BizDevOps Consulting, LLC — a company whose only registered principal is managed by Daniel Hemmert, now MIDA's Executive Director. UWHA's year-end final report, covering the same money and the same period, includes neither check. Separately, the nonprofit's own state corporate filing lists a set of officers and directors that largely doesn't match the board shown on its public website.",
    url: "the-payment-that-disappeared.html",
    total: 62500,
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
  {
    tag: "Case 07",
    title: "Energy Money",
    dek: "The energy sector's slice of the donor ledger — utilities, oil, rail, and energy PACs, ranked by documented giving.",
    summary: "PacifiCorp, Union Pacific Railroad, EnergySolutions, Torus, Big West Oil, Chevron, rPlus Energies, Edison Electric Institute, Dominion Energy PAC, and Utah Petroleum Association PAC — ten energy-sector donors, split out from the full donor ledger, with each donor's officeholder recipients separated from PACs, committees, and non-officeholders.",
    url: "energy.html",
    total: 1245235,
    totalPlus: true,
    date: "2026-09-04",
    updated: "2026-09-10",
    tags: [
      "PacifiCorp", "Union Pacific Railroad", "EnergySolutions", "Torus",
      "Big West Oil", "Chevron", "rPlus Energies", "Edison Electric Institute",
      "Dominion Energy PAC", "Utah Petroleum Association PAC",
      "Spencer Cox", "Operation Gigawatt", "energy policy", "nuclear",
      "campaign finance", "donor ledger"
    ]
  },
  {
    tag: "Case 08",
    title: "Real Estate Money",
    dek: "The real estate industry's slice of the donor ledger — Realtor association PACs and the people who run them.",
    summary: "RPAC, Salt Lake Board of Realtors, NWAOR, National Association of REALTORS Fund, and Northern Wasatch HBA PAC — five real-estate-industry PACs, split out from the full donor ledger, plus a \"Who these people are\" section on Mike Ostermiller, Chris Kyler, Mike Schultz, Mark Shepherd, J. Stuart Adams, Jed Nilson, and Gage Froerer.",
    url: "realestate.html",
    total: 11212459,
    totalPlus: true,
    date: "2026-09-04",
    updated: "2026-09-10",
    tags: [
      "RPAC", "Salt Lake Board of Realtors", "NWAOR", "Northern Wasatch HBA PAC",
      "National Association of REALTORS Fund", "Mike Ostermiller", "Chris Kyler",
      "Mike Schultz", "Mark Shepherd", "J. Stuart Adams", "Jed Nilson",
      "Gage Froerer", "MIDA", "KKOS Lawyers", "campaign finance", "donor ledger"
    ]
  },
  {
    tag: "Case 09",
    title: "Everything Else",
    dek: "The major donors that don't fit a single industry bucket — an auto/real-estate conglomerate, a banking trade association, a metal recycler, two more PACs, and the largest individual donor in this whole investigation.",
    summary: "Larry H. Miller Company, Utah Bankers Association, Utah Metal Works, Utah Chamber PAC, Zions Bancorporation PAC, and Gershon Barnett — six donors split out from the full donor ledger because they don't fit any single industry. Includes a corrected Utah Bankers Association total (a full DEX export found roughly $225,000 more than an earlier manual estimate), Utah Chamber PAC's sudden $60,000 single-day push after years of dormancy, and Zions Bancorporation PAC giving the Utah Democratic Party four times what it gave the Republican Party.",
    url: "everythingelse.html",
    total: 1608944,
    totalPlus: true,
    date: "2026-09-10",
    tags: [
      "Larry H. Miller Company", "Utah Bankers Association", "Utah Metal Works",
      "Utah Chamber PAC", "Zions Bancorporation PAC", "Gershon Barnett",
      "Utahns for Balanced Government", "Spencer Cox", "campaign finance",
      "donor ledger"
    ]
  },
  {
    tag: "Case 10",
    title: "Tech Money",
    dek: "The tech sector's slice of the donor ledger — telecom, semiconductors, national tech PACs, and Utah's own tech-industry trade groups.",
    summary: "Meta's Forge the Future Project ($270,000 to two candidates in a single day), Lumen Technologies, Micron Technology, Dell Technologies PAC, and the full Silicon Slopes Commons → Slopes PAC → Utah Tech Leads money chain — eight tech-sector donors split out from the full donor ledger. Includes an unresolved conflict between two research passes over whether \"Utah Tech PAC\" was ever active.",
    url: "tech.html",
    total: 649501,
    totalPlus: true,
    date: "2026-09-10",
    tags: [
      "Meta", "Forge the Future Project", "Lumen Technologies", "Micron Technology",
      "IM Flash Technologies", "Dell Technologies PAC", "Silicon Slopes Commons",
      "Slopes PAC", "Utah Tech Leads", "Utah Tech PAC", "Tami Tran", "Logan Monson",
      "Spencer Cox", "campaign finance", "donor ledger"
    ]
  },
  {
    tag: "Case 11",
    title: "Money By Industry",
    dek: "The full donor ledger, split by industry — Real Estate, Energy, Everything Else, and Tech, each its own page.",
    summary: "An index tying together every industry-specific donor ledger page built so far — 29 donors and PACs researched and organized by sector, with a running total for each industry. Numbers are marked as a floor, not a final count, since most entities are still partially researched.",
    url: "industries.html",
    total: 14716139,
    totalPlus: true,
    date: "2026-09-10",
    tags: [
      "Real Estate", "Energy", "Everything Else", "Tech", "campaign finance",
      "donor ledger"
    ]
  },
];
