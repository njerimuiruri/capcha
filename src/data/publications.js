import {
  FileText,
  ScrollText,
  Newspaper,
  GraduationCap,
  Users,
  BookOpen,
  Lightbulb,
} from "lucide-react";

// ─── Publication data ──────────────────────────────────────────────────────────
// Add real publications here. categories: 'journal' | 'policy' | 'working' | 'report' | 'conference' | 'case-study'
// Add new uploads at the bottom with a `dateAdded` ("YYYY-MM-DD") so they show first.
export const publications = [
  // ── Journal Articles ──────────────────────────────────────────────────────
  {
    id: "j1",
    category: "journal",
    title:
      "Climate-Health Data Sovereignty in Sub-Saharan Africa: A Framework Analysis",
    authors: ["Dr. Etse Yawo Dzakpa", "Dr. Vijendra Ingole"],
    year: 2026,
    journal: "Climate and Health Research",
    volume: "Vol. 3, No. 1",
    tags: ["Data Sovereignty", "Climate-Health", "Africa", "SOSCHI"],
    abstract:
      "This paper examines the conceptual and operational dimensions of climate-health data sovereignty in sub-Saharan Africa, introducing the SOSCHI framework as a tool for embedding climate-health surveillance into national health information systems.",
    pdfUrl: null,
    doiUrl: null,
  },
  // ── Policy Briefs ─────────────────────────────────────────────────────────
  {
    id: "p1",
    category: "policy",
    title: "Who Owns the Data That Could Save African Lives?",
    authors: ["CAPCHA Research Team"],
    year: 2026,
    journal: "CAPCHA Evidence Brief",
    volume: "Issue 1",
    tags: ["Data Governance", "Policy", "Africa"],
    abstract:
      "This evidence brief explores questions of data ownership and governance in climate-health contexts across Africa, drawing on the findings of the first CAPCHA Spotlight Series session.",
    pdfUrl: "/document/CAPCHA Evidence brief.pdf",
    doiUrl: null,
  },
  {
    id: "p2",
    category: "policy",
    title: "When Evidence Exists but Policy Doesn’t Move.",
    authors: ["CAPCHA Research Team"],
    year: 2026,
    journal: "CAPCHA Evidence Brief",
    volume: "Issue 2",
    tags: ["Data Governance", "Policy", "Africa"],
    abstract:
      "Africa  has  no  shortage  of  climate–health  evidence.  Research  institutions, practitioners, and regional initiatives continue to generate knowledge that can inform policy, while continental bodies are strengthening climate and health  action.  Yet  despite  this  growing  evidence  base,  policy  uptake  and implementation remain slow. The challenge is no longer producing more evidence, but understanding why existing evidence so often fails to reach and  influence  policy  and  decision-making.  The  bottleneck  lies  in governance:  the  systems,  institutions,  and  processes  that  determine  how evidence moves into decisions, financing, and implementation.",
    pdfUrl: "/document/CAPCHAEvidencebriefNo.2.pdf",
    doiUrl: null,
  },
  {
    id: "p3",
    category: "policy",
    title: "Financing Climate Health Without the Traditional Donor Funding",
    authors: ["CAPCHA Research Team"],
    year: 2026,
    journal: "CAPCHA Evidence Brief",
    volume: "Issue 3",
    tags: ["Data Governance", "Policy", "Africa"],
    abstract:
      "Climate  change  is  increasingly  straining  Africas  health  systems,  yet financing  for  climate-health  action  remains  heavily  dependent  on traditional donors. As climate shocks disrupt health services, infrastructure, and supply chains, there is an urgent need to explore sustainable, locally driven financing mechanisms that can strengthen health system resilience beyond conventional donor funding.",
    pdfUrl: "/document/finance.pdf",
    doiUrl: null,
  },
  // ── Working Papers ────────────────────────────────────────────────────────

  // ── Reports ───────────────────────────────────────────────────────────────

  // ── Conference Papers ─────────────────────────────────────────────────────

  // ── Case Studies ─────────────────────────────────s─────────────────────────
  {
    id: "cs1",
    category: "case-study",
    title:
      "How Restoring Boreholes is Transforming Health, Communities and Climate Resilience in Uganda",
    authors: ["Ann Irungu", "Virginia Wamboi", "Maria Nailantei"],
    year: 2026,
    journal: "CAPCHA Case Study Collection",
    volume: "Case Study",
    tags: [
      "Water Security",
      "Climate Resilience",
      "Uganda",
      "Community Health",
      "SCIF",
    ],
    abstract:
      "Across Lyantonde, Kabarole and Kalungu districts in Uganda, the Sustainable Climate Impact Fund rehabilitated over 70 non-functional boreholes and installed three solar-powered water systems, training Water User Committees and hand pump mechanics to keep them running. The initiative now reaches more than 200,000 people and has helped avoid an estimated 79,000 tonnes of CO2e by cutting firewood use for boiling water, showing how restoring basic water infrastructure strengthens health, gender equity and climate resilience together.",
    image: "/img/howtorestoreboreholes.jpg",
    pdfUrl:
      "/document/How Restoring Boreholes is Transforming Health, Communities and Climate Resilience in Uganda (1).pdf",
    doiUrl: null,
  },
  {
    id: "cs2",
    category: "case-study",
    title:
      "Rethinking Digital Climate Innovation for Mothers Living Through Extreme Heat",
    authors: ["Ann Irungu", "Virginia Wamboi", "Maria Nailantei"],
    year: 2026,
    journal: "CAPCHA Case Study Collection",
    volume: "Case Study",
    tags: [
      "Extreme Heat",
      "Maternal Health",
      "Digital Health",
      "Early Warning Systems",
      "South Africa",
    ],
    abstract:
      "The HIGH Horizons project built MotherHeat Alert, a smartphone-based heat early warning system for pregnant and postpartum women, piloted in Sweden, South Africa and Zimbabwe. Testing with 200 women in Mamelodi, South Africa showed that connectivity and device gaps, and trusted support from nurses and community health workers, mattered as much as the technology itself in helping mothers act on heat warnings.",
    image: "/img/rethinkingdigital.jpg",
    pdfUrl:
      "/document/Rethinking Digital Climate Innovation for Mothers Living Through Extreme Heat (1).pdf",
    doiUrl: null,
  },
  {
    id: "cs3",
    category: "case-study",
    title:
      "From Voice to Action: What Nigeria's Young Climate-Health Leaders Taught Us",
    authors: [
      "Chris Bassey",
      "Ann Irungu",
      "Virginia Wamboi",
      "Maria Nailantei",
    ],
    year: 2026,
    journal: "CAPCHA Case Study Collection",
    volume: "Blog Post",
    tags: [
      "Youth Engagement",
      "Climate-Health Policy",
      "Nigeria",
      "Advocacy",
      "Youths4Action",
    ],
    abstract:
      "The Amplifying Youth Voices for Climate-Health Action Youth Pre-Conference, convened in Abuja by Nigeria Health Watch, reached 357 participants and produced the Green Print Manifesto and the Youths4Action advocacy platform. The experience showed that young people need more than a seat at the table: they need funding, mentorship and clear pathways that turn their ideas into lasting climate-health action.",
    image: "/img/capcha-a.png",
    dateAdded: "2026-10-02",
    pdfUrl: "/document/Chris Basey Blog.pdf",
    doiUrl: null,
  },
  {
    id: "cs4",
    category: "case-study",
    title:
      "How Theatre is Changing the Conversation on Plastic Pollution in Lake Victoria, Kisumu, Kenya",
    authors: ["Edwin Koga", "Ann Irungu", "Virginia Wamboi", "Maria Nailantei"],
    year: 2026,
    journal: "CAPCHA Case Study Collection",
    volume: "Blog Post",
    tags: [
      "Plastic Pollution",
      "Community Engagement",
      "Lake Victoria",
      "Kenya",
      "Theatre for Change",
    ],
    abstract:
      "Amazon Theatrix Ensemble's 'Voice of Sango' initiative used spoken word and community theatre to help fisherfolk communities around Lake Victoria link plastic pollution and untreated waste to declining fish stocks, a decline many had attributed to divine punishment. The experience shows how participatory, inclusive communication can make climate and environmental risks tangible and locally owned.",
    image: "/img/capcha-b.png",
    dateAdded: "2026-10-02",
    pdfUrl:
      "/document/HOW THEATRE IS CHANGING THE CONVERSATION ON PLASTIC POLLUTION IN LAKE VICTORIA, KISUMU, KENYA.pdf",
    doiUrl: null,
  },
];

// ─── Categories config ────────────────────────────────────────────────────────
export const PUBLICATION_CATEGORIES = [
  {
    id: "all",
    label: "All Publications",
    icon: BookOpen,
    color: "bg-[#021d49]",
  },
  {
    id: "journal",
    label: "Journal Articles",
    icon: GraduationCap,
    color: "bg-[#0e8601]",
  },
  {
    id: "policy",
    label: "Policy Briefs",
    icon: ScrollText,
    color: "bg-[#ff9500]",
  },
  {
    id: "working",
    label: "Working Papers",
    icon: FileText,
    color: "bg-indigo-600",
  },
  { id: "report", label: "Reports", icon: Newspaper, color: "bg-rose-600" },
  {
    id: "conference",
    label: "Conference Papers",
    icon: Users,
    color: "bg-teal-600",
  },
  {
    id: "case-study",
    label: "Case Studies",
    icon: Lightbulb,
    color: "bg-cyan-600",
  },
];

export const publicationCategoryMap = Object.fromEntries(
  PUBLICATION_CATEGORIES.map((c) => [c.id, c]),
);

// Newest first. `dateAdded` ("YYYY-MM-DD", the day the document was uploaded)
// gives an exact position; entries without it fall back to 1 Jan of their
// year. Ties put the later entry in the list first, so newer uploads lead.
const parseDateAdded = (s) => {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
};

export const publicationSortDate = (pub) =>
  pub.dateAdded ? parseDateAdded(pub.dateAdded) : new Date(pub.year, 0, 1);

export const publicationDisplayDate = (pub) =>
  pub.dateAdded
    ? parseDateAdded(pub.dateAdded).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : String(pub.year);

export const publicationsByRecency = publications
  .map((pub, index) => ({ pub, index }))
  .sort(
    (a, b) =>
      publicationSortDate(b.pub) - publicationSortDate(a.pub) ||
      b.index - a.index,
  )
  .map(({ pub }) => pub);
