// biome-ignore-all lint: <explanation of why you are ignoring this file>
// @ts-nocheck
// biome-ignore-all lint: ignoring for testing purposes

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const ALL_SIDEBAR_POSTS = Array.from({ length: 40 }, (_, i) => {
  const titles = [
    "Why Does My Bissell Carpet Cleaner Start Smoking?",
    "How to Clean Vacuum Filter?",
    "Why Does Persil Smell Like Vomit?",
    "Advantages and Disadvantages of Wet and Dry Vacuum Cleaner",
    "Best Carpet Cleaners for Pet Hair 2024",
    "How to Remove Stubborn Carpet Stains",
    "Dyson vs Bissell: Which Is Better?",
    "Steam Cleaning vs Dry Cleaning Carpets",
    "How Often Should You Vacuum Your Home?",
    "Top Robot Vacuums Reviewed",
  ];
  const slugs = [
    "why-does-my-bissell-carpet-cleaner-start-smoking",
    "how-to-clean-vacuum-filter",
    "why-does-persil-smell-like-vomit",
    "advantages-disadvantages-wet-dry-vacuum-cleaner",
    "best-carpet-cleaners-for-pet-hair",
    "how-to-remove-stubborn-carpet-stains",
    "dyson-vs-bissell",
    "steam-cleaning-vs-dry-cleaning",
    "how-often-should-you-vacuum",
    "top-robot-vacuums-reviewed",
  ];
  return {
    id: i + 1,
    title: titles[i % 10],
    slug: `https://cleaningtuts.com/${slugs[i % 10]}/`,
  };
});

export async function fetchSidebarPage({ pageParam = 1 }) {
  await sleep(700);
  const PER_PAGE = 8;
  const start = (pageParam - 1) * PER_PAGE;
  const items = ALL_SIDEBAR_POSTS.slice(start, start + PER_PAGE);
  const nextPage = start + PER_PAGE < ALL_SIDEBAR_POSTS.length ? pageParam + 1 : undefined;
  return { items, nextPage };
}

export async function fetchLinkResults(url) {
  await sleep(1200);
  return [
    {
      id: "1",
      title: "Why Does My Bissell Carpet Cleaner Keep Catching On Carpet",
      slug: "/why-does-my-bissell-carpet-cleaner-keep-catching-on-carpet/",
      score: 76,
      clicks: 0,
      impressions: 271,
      position: 4.0,
    },
    {
      id: "2",
      title: "How to Deep Clean Your Bissell ProHeat 2X",
      slug: "/how-to-deep-clean-bissell-proheat-2x/",
      score: 68,
      clicks: 12,
      impressions: 540,
      position: 6.2,
    },
    {
      id: "3",
      title: "Bissell CrossWave vs Symphony: Full Comparison",
      slug: "/bissell-crosswave-vs-symphony/",
      score: 59,
      clicks: 34,
      impressions: 820,
      position: 8.1,
    },
    {
      id: "4",
      title: "Why Is My Carpet Cleaner Leaving Residue?",
      slug: "/why-is-my-carpet-cleaner-leaving-residue/",
      score: 51,
      clicks: 5,
      impressions: 312,
      position: 11.4,
    },
  ];
}

export async function fetchSentences(postId) {
  await sleep(800);
  const map = {
    "1": [
      "We've outlined some of the most common reasons why your Bissell cleaner might be catching on your carpet and ways to prevent it from happening.",
      "Let's start with the common reasons concerning the machine why your Bissell carpet cleaner might catch on your carpet.",
      "If your Bissell carpet cleaner keeps catching on the carpet, it is likely due to the roller not being placed properly.",
      "There are a few things that you can do to prevent your Bissell carpet cleaner from catching on the carpet.",
      "If you're using ultra-plush or ultra-soft carpets, that may be why your Bissell vacuum is failing to clean smoothly.",
    ],
    "2": [
      "Regular maintenance of your ProHeat 2X extends its lifespan significantly.",
      "The brush roll is the most commonly clogged component and should be checked monthly.",
      "After every use, empty the dirty water tank to prevent odors and bacterial growth.",
    ],
    "3": [
      "The CrossWave handles hard floors and area rugs while the Symphony focuses purely on steam cleaning.",
      "If you have pets, the CrossWave's dual-action brush roll gives it a notable edge.",
      "Both models are priced similarly, making the decision come down to your floor type.",
    ],
    "4": [
      "Residue is often caused by using too much cleaning solution in the water tank.",
      "Always dilute cleaning formulas according to the manufacturer's instructions.",
      "Running a clean water pass after cleaning helps remove any leftover soap residue.",
    ],
  };
  return map[postId] ?? [];
}
