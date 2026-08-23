/*
 * The Farm — Progress Dashboard :: seed content
 * Verbatim copy of the data layer from the HTML design reference.
 * Every string, number, and hex here is the exact content the design was built with.
 * Treat this as the shape of your database tables + the fixture data to seed them.
 */

const NAV = [
  { id: 'now', label: "What's new", num: '01' },
  { id: 'been', label: "Where we've been", num: '02' },
  { id: 'are', label: 'Where we are', num: '03' },
  { id: 'going', label: "Where we're going", num: '04' },
  { id: 'calendar', label: 'Content Calendar', num: '05' },
  { id: 'library', label: 'Content Library', num: '06' },
  { id: 'toolkit', label: 'Your Toolkit', num: '07' }
];

const FEED = [
  { date: 'Aug 22', kind: 'Numbers', title: 'Reach 273/day — 11× baseline', link: 'Scoreboard', view: 'are' },
  { date: 'Aug 20', kind: 'Shipped', title: 'Italian Night page live — tickets selling', link: 'Open', view: 'been' },
  { date: 'Aug 19', kind: 'Call', title: 'Sales process deep dive', link: 'Recap', view: 'been' },
  { date: 'Aug 18', kind: 'Asset', title: 'Campaign kit — 2 sliders, flyer, QR', link: 'Open', view: 'library' },
  { date: 'Aug 14', kind: 'Numbers', title: 'First-ever Reel — 723 reached, beats 12-mo median', link: 'Scoreboard', view: 'are' },
  { date: 'Aug 12', kind: 'Call', title: 'Italian Night build', link: 'Recap', view: 'been' },
  { date: 'Aug 8', kind: 'Shoot', title: 'Food & Beverage shoot locked — Aug 26', link: 'Plan', view: 'library' },
  { date: 'Aug 5', kind: 'Call', title: 'Content review — first week live', link: 'Recap', view: 'been' },
  { date: 'Jul 31', kind: 'Shipped', title: 'Monday recap automated in Slack', link: 'Cadence', view: 'going' },
  { date: 'Jul 29', kind: 'Call', title: 'Team meeting — Italian Night & the road ahead', link: 'Recap', view: 'been' },
  { date: 'Jul 21', kind: 'Shipped', title: 'Marketing brain live on Kristie’s desktop', link: 'Toolkit', view: 'toolkit' },
  { date: 'Jul 15', kind: 'Shipped', title: 'Planable approval workflow live', link: 'Toolkit', view: 'toolkit' }
];

const PEOPLE = [
  { id: 'kristie', name: 'Kristie', initials: 'KR', color: '#6C1E27' },
  { id: 'melissa', name: 'Melissa', initials: 'ME', color: '#6F7355' },
  { id: 'brenda', name: 'Brenda', initials: 'BR', color: '#A06D28' },
  { id: 'myron', name: 'Myron', initials: 'MY', color: '#2E2622' },
  { id: 'jjg', name: 'JJG', initials: 'JJ', color: '#8B7F73' },
  { id: 'elizabeth', name: 'Elizabeth', initials: 'EM', color: '#4E141B' }
];

const TASKS = [
  { key: 'jjg', title: 'Introduction to JJG', who: 'kristie', due: 'Aug 25' },
  { key: 'ac', title: 'Claude ↔ ActiveCampaign connector — admin access', who: 'jjg', due: 'Aug 27' },
  { key: 'shotlist', title: 'Food & Beverage shot list sign-off', who: 'melissa', due: 'Aug 24' },
  { key: 'sept', title: 'Approve the September shoot plan', who: 'kristie', due: 'Aug 29' }
];

const KIND_COLOR = { Numbers: '#2E2622', Shipped: '#6F7355', Call: '#6C1E27', Shoot: '#A06D28', Asset: '#8B7F73' };

const DAYS = [
  { label: 'Mon', v: 118 }, { label: 'Tue', v: 196 }, { label: 'Wed', v: 342 },
  { label: 'Thu', v: 288 }, { label: 'Fri', v: 251 }, { label: 'Sat', v: 397 }, { label: 'Sun', v: 319 }
];

const HERO = [
  { label: 'Views', value: '6,460', unit: '', week: '+180% w/w', base: '2.8× baseline', why: 'Up from 2,311 the prior week.' },
  { label: 'Accounts reached', value: '~1,900', unit: '', week: '26× prior week', base: '11× baseline', why: 'Cold reach — not existing followers.' },
  { label: 'Interactions', value: '123', unit: '', week: '9× prior week', base: '9× baseline', why: 'Likes, saves, shares, comments.' },
  { label: 'Reel reach', value: '723', unit: '', week: 'First ever', base: 'Beats 12-mo median (615)', why: 'Reels keep earning for weeks.' },
  { label: 'Followers', value: '4,694', unit: '', week: '+9 this week', base: '+9 since baseline', why: 'Follows trail visibility by weeks.' }
];

const IG_POSTS = {
  Grid: [
    { img: 'assets/pasture-horses.jpg', badge: '▶', metric: '723' },
    { img: 'assets/pizza-oven.jpg', badge: '', metric: '412' },
    { img: 'assets/chapel-interior.jpg', badge: '', metric: '388' },
    { img: 'assets/firepit.jpg', badge: '▶', metric: '355' },
    { img: 'assets/gathering-place.jpg', badge: '▣', metric: '341' },
    { img: 'assets/chef-plating.jpg', badge: '', metric: '318' },
    { img: 'assets/pavilion-night.jpg', badge: '▶', metric: '296' },
    { img: 'assets/golden-hour-dip.jpg', badge: '', metric: '271' },
    { img: 'assets/autumn-centerpiece.png', badge: '▣', metric: '244' }
  ],
  Reels: [
    { img: 'assets/pasture-horses.jpg', badge: '▶', metric: '1.2k' },
    { img: 'assets/firepit.jpg', badge: '▶', metric: '640' },
    { img: 'assets/pavilion-night.jpg', badge: '▶', metric: '512' },
    { img: 'assets/pizza-oven.jpg', badge: '▶', metric: '498' },
    { img: 'assets/gathering-place.jpg', badge: '▶', metric: '333' },
    { img: 'assets/chef-plating.jpg', badge: '▶', metric: '287' }
  ],
  Tagged: [
    { img: 'assets/golden-hour-dip.jpg', badge: '', metric: '204' },
    { img: 'assets/pavilion-autumn.jpg', badge: '', metric: '188' },
    { img: 'assets/chapel-interior.jpg', badge: '', metric: '141' }
  ]
};

const SCOREBOARD = [
  { label: 'First-ever Reel', value: '723', unit: 'reach', chip: 'Beats 12-mo median (615)' },
  { label: 'Total interactions', value: '123', unit: '', chip: '9× prior week' },
  { label: 'Shares', value: '21', unit: '', chip: 'The strongest signal' },
  { label: 'Engagement rate', value: '3.3', unit: '%', chip: 'Holding as volume scales' }
];

const DONUT = [
  { label: 'likes', value: 73, color: '#6C1E27' },
  { label: 'comments & other', value: 24, color: '#D8CBBE' },
  { label: 'shares', value: 21, color: '#6F7355' },
  { label: 'saves', value: 5, color: '#2E2622' }
];

const BASELINE = [
  { label: 'Posts in 90 days', value: '1', unit: '', chip: 'Effectively silent' },
  { label: 'Reels in 12 months', value: '0', unit: '', chip: 'Biggest untapped lever' },
  { label: 'Avg daily reach', value: '25', unit: '/day', chip: '−84% from active pace' },
  { label: 'Followers at baseline', value: '4,685', unit: '', chip: '+43 with zero posts' }
];

const MONTHS = {
  July: {
    note: 'Month one was the foundation. Access unlocked, systems built, the brand loaded into every tool — and the first new content in months went live before the month was out.',
    calls: [
      { day: '3', mon: 'JUL', title: 'Kickoff — Brand, Story & Business', who: 'Kristie · Brenda · Myron', recap: 'The place, the people, and what the account has never done. Access list started.' },
      { day: '8', mon: 'JUL', title: 'Marketing Deep Dive — Strategy & Access', who: 'Kristie · Brenda · Melissa', recap: 'Two-week content plan agreed, 30-day story system drafted, platform access resolved.' },
      { day: '15', mon: 'JUL', title: 'Systems & Team Alignment', who: 'Kristie · Melissa · Myron', recap: 'Approval workflow in Planable, one Slack channel for everything, roles named.' },
      { day: '21', mon: 'JUL', title: "The Business Brain — Claude on Kristie's Desk", who: 'Kristie · Melissa', recap: 'Brand voice, story, and standards loaded into a project on her own machine.' },
      { day: '29', mon: 'JUL', title: 'Team Meeting — Italian Night & the Road Ahead', who: 'Kristie · Melissa · Brenda · Myron', recap: 'Italian Night scoped end to end: page, tickets, flyer, Reels. Shipping in August.' }
    ],
    shipped: [
      { title: 'Foundation documents', items: ['Instagram baseline + benchmark snapshot', 'Competitive briefing — Asheville', 'Two-week content plan → 30-day story system', 'Claude brand brain, live on the desktop'] },
      { title: 'Cameras on the property', items: ['Italian Night — photo + video', 'Sunrise shoot — Hickory Cabin', 'Cooking competition — photo + video', 'Canva brand templates'] },
      { title: 'The rails we run on', items: ['Instagram & Facebook access resolved', 'Planable approval workflow live', 'Slack team channel', 'Weekly Monday analysis automated'] }
    ]
  },
  August: {
    note: 'Month two shipped a full campaign. Italian Night is live and selling on The Farm’s own site — marketing, design, and tickets, weeks ahead of October 1.',
    calls: [
      { day: '5', mon: 'AUG', title: 'Content Review — First Week Live', who: 'Kristie · Melissa', recap: 'Reach up 11× against baseline. Reels approved through the end of the month.' },
      { day: '12', mon: 'AUG', title: 'Italian Night Build', who: 'Kristie · Brenda', recap: 'Event page, ticketing, print flyer, and QR code — all on The Farm’s own website.' },
      { day: '19', mon: 'AUG', title: 'Sales Process Deep Dive', who: 'Kristie · Melissa', recap: 'Lead attribution mapped. ActiveCampaign automations are next once access lands.' }
    ],
    shipped: [
      { title: 'Live & selling', items: ['Event website — tickets on sale', 'Reel — “Welcome to… Italian Night”', 'Reel — “Reservations are open”', 'Reel — “The magic of Italian Night”'] },
      { title: 'The campaign kit', items: ['Two Canva sliders', 'Single-image post', 'Print-ready flyer', 'QR code for the property'] },
      { title: 'Running quietly', items: ['Stories loaded through end of month', 'Content running 45–60 days ahead', 'Monday recap landing in Slack', 'Website heat-mapping research'] }
    ]
  },
  September: {
    note: 'Not written yet. The accommodations shoot and the first ActiveCampaign automations are the headlines we expect.',
    calls: [],
    shipped: []
  }
};

const HORIZONS = {
  '30 Days': {
    title: '30 Days', when: 'September 22, 2026', question: 'Is the rhythm holding?',
    goals: [
      { t: 'Three posts a week, unbroken', d: 'Four weeks straight, at least one Reel each.', now: 4, goal: 4, unit: 'wks' },
      { t: 'Reach past 300/day', d: 'The projection says 318 — hold the pace and it lands.', now: 273, goal: 318, unit: '/day' },
      { t: 'Accommodations shoot in the can', d: 'September shoot done, edited, and in the library.', now: 1, goal: 3, unit: 'steps' }
    ]
  },
  '90 Days': {
    title: '90 Days', when: 'Early November 2026', question: 'Does the engine run?',
    goals: [
      { t: 'Zero dark weeks', d: 'Three posts a week, every week, with at least one Reel.', now: 4, goal: 13, unit: 'wks' },
      { t: 'Reach above 150/day', d: 'The account’s best-ever pace becomes the floor.', now: 273, goal: 400, unit: '/day' },
      { t: 'Italian Night sells out early', d: 'Marketed weeks ahead, not days.', now: 40, goal: 100, unit: '% sold' }
    ]
  },
  '6 Months': {
    title: '6 Months', when: 'January 2027', question: 'Does it run on systems?',
    goals: [
      { t: 'Automations working the pipeline', d: 'Follow-ups and handoffs inside ActiveCampaign.', now: 0, goal: 6, unit: 'flows' },
      { t: 'The Community Night Playbook', d: 'A named, repeatable SOP for any event.', now: 1, goal: 5, unit: 'sections' },
      { t: '5,200+ followers, 20+ Reels', d: 'With a growing out-of-state share.', now: 4694, goal: 5200, unit: 'followers' }
    ]
  },
  '12 Months': {
    title: '12 Months', when: 'July 2027', question: 'Does the business feel different?',
    goals: [
      { t: 'Kristie leads, not chases', d: 'Decisions made from dashboards, not from building posts.', now: 2, goal: 10, unit: 'hrs/wk saved' },
      { t: 'The weight is off Melissa', d: 'Qualified, source-tagged leads arriving warm.', now: 0, goal: 100, unit: '% tagged' },
      { t: 'Pipeline measurably attributed', d: 'The 2027/28 wedding pipeline traced to the engine.', now: 0, goal: 12, unit: 'bookings' }
    ]
  }
};

const IN_MOTION = [
  { label: 'Follower automations + auto-responders', pct: 35 },
  { label: 'Content 45–60 days ahead', pct: 80 },
  { label: 'Website heat-mapping', pct: 45 },
  { label: 'Italian Night Reels', pct: 60 }
];

const TRAJECTORY = [
  { label: 'Baseline', when: 'Jul 23', value: 25, kind: 'actual' },
  { label: 'Today', when: 'Aug 22', value: 273, kind: 'actual' },
  { label: '30 Days', when: 'Sep 22', value: 318, kind: 'projection' },
  { label: '90 Days', when: 'Nov 2026', value: 400, kind: 'target' },
  { label: '6 Months', when: 'Jan 2027', value: 620, kind: 'target' },
  { label: '12 Months', when: 'Jul 2027', value: 900, kind: 'target' }
];

const GANTT = [
  { what: 'Italian Night campaign', start: 0, span: 2, kind: 'campaign' },
  { what: 'Food & Beverage shoot', start: 0, span: 1, kind: 'shoot' },
  { what: 'Accommodations shoot', start: 1, span: 1, kind: 'shoot' },
  { what: 'ActiveCampaign automations', start: 1, span: 4, kind: 'system' },
  { what: 'Community Night Playbook', start: 3, span: 4, kind: 'system' },
  { what: 'Holiday + winter events push', start: 3, span: 3, kind: 'campaign' },
  { what: 'Spring 2027 wedding pipeline', start: 6, span: 6, kind: 'campaign' },
  { what: 'Attribution reporting live', start: 8, span: 4, kind: 'system' }
];

const TYPE_COLOR = { Reel: '#6C1E27', Carousel: '#A06D28', Story: '#2E2622', Feed: '#6F7355' };
const STATUS_COLOR = { Scheduled: '#6F7355', 'In review': '#A06D28', 'Shoot locked': '#6C1E27', 'In Planable': '#8B7F73' };

const POSTS = [
  { date: 'Aug 19', time: '9:00 AM', caption: "Some couples walk in already knowing. They don't need convincing — they need the place that matches the picture in their head.\n\nThat's the ones we build for. Tours open for 2027 — link in bio.", type: 'Reel', title: 'For the one who knows what they want', angle: 'Identity', owner: 'Melissa', status: 'Scheduled', img: 'assets/golden-hour-dip.jpg' },
  { date: 'Aug 21', time: '11:30 AM', caption: "Nobody remembers the linens. They remember the toast that ran long, the cousins on the dance floor, the quiet minute behind the barn.\n\nSwipe for four moments from this month.", type: 'Carousel', title: 'Couples remember the moments', angle: 'Story', owner: 'Kristie', status: 'In review', img: 'assets/pavilion-autumn.jpg' },
  { date: 'Aug 22', time: '4:00 PM', caption: "Italian Night — Oct 1. Early access opens today for our list. Long tables, the pizza oven going all evening, and the pavilion lit up.\n\nLink in bio.", type: 'Story', title: 'Italian Night early access', angle: 'Proof', owner: 'Melissa', status: 'Scheduled', img: 'assets/pizza-oven.jpg' },
  { date: 'Aug 24', time: '10:00 AM', caption: "A perfect venue photographs well. A gathering place makes people stay late.\n\nWe optimized for the second one.", type: 'Feed', title: 'Why gatherings beat perfect venues', angle: 'Contrarian', owner: 'Kristie', status: 'In review', img: 'assets/gathering-place.jpg' },
  { date: 'Aug 26', time: '12:00 PM', caption: "Chef Mike plates 180 covers without raising his voice once. Two minutes inside The Farm Kitchen before service.", type: 'Reel', title: 'The Farm Kitchen magic behind-the-scenes', angle: 'Authority', owner: 'Chef Mike', status: 'Shoot locked', img: 'assets/chef-plating.jpg' },
  { date: 'Aug 28', time: '9:30 AM', caption: "Part two of what's actually included — the pavilion, the chapel, the grounds, and the team that runs them.", type: 'Carousel', title: "What's included at The Farm (part 2)", angle: 'Authority', owner: 'Melissa', status: 'Scheduled', img: 'assets/pavilion-autumn.jpg' },
  { date: 'Aug 29', time: '5:00 PM', caption: "Final call for Italian Night. A handful of seats left at the long tables.", type: 'Story', title: 'Italian Night final push', angle: 'Offer', owner: 'Melissa', status: 'Scheduled', img: 'assets/firepit.jpg' },
  { date: 'Aug 30', time: '10:00 AM', caption: "Stay on the property. Cabins for the couple, the parents, the friends who drove seven hours.", type: 'Feed', title: 'Lodging: your private retreat awaits', angle: 'Story', owner: 'Kristie', status: 'In review', img: 'assets/pavilion-night.jpg' },
  { date: 'Sep 2', time: '9:00 AM', caption: "The pavilion at blue hour, in sixty seconds. Timber, string lights, and the mountains behind it.", type: 'Reel', title: 'The Pavilion story (short form)', angle: 'Story', owner: 'Melissa', status: 'In Planable', img: 'assets/pavilion-night.jpg' },
  { date: 'Sep 4', time: '11:00 AM', caption: "The food is the part guests text you about afterward. Here's what a tasting looks like.", type: 'Carousel', title: "Taste of The Farm: couples' faces tell the story", angle: 'Proof', owner: 'Kristie', status: 'In review', img: 'assets/golden-hour-dip.jpg' },
  { date: 'Sep 6', time: '3:00 PM', caption: "The team sets 200 chairs before anyone arrives, then disappears for the rest of the day. That is the job.", type: 'Story', title: 'Behind the scenes: staff care', angle: 'Identity', owner: 'Melissa', status: 'Scheduled', img: 'assets/chapel-interior.jpg' },
  { date: 'Sep 8', time: '10:00 AM', caption: "A hotel ballroom gives your team a room. We give them a hundred acres and a fire pit.", type: 'Feed', title: 'Corporate groups: not hotels anymore', angle: 'Contrarian', owner: 'Kristie', status: 'In review', img: 'assets/autumn-centerpiece.png' }
];

const GANTT_COLOR = { campaign: '#6C1E27', shoot: '#A06D28', system: '#6F7355' };

const CADENCE = [
  { every: 'Every Monday', title: 'Morning recap in Slack', body: 'Reach, engagement, wins, and what it means for the week ahead.' },
  { every: 'Every month', title: 'Review — dashboard + video', body: 'A new chapter here, plus a walkthrough emailed and shared in Slack.' },
  { every: 'Every month', title: 'Strategy call', body: 'Ninety minutes on priorities and the decisions worth a conversation.' }
];

const LIB = [
  { img: 'assets/gathering-place.jpg', title: 'The Gathering Place', tag: 'Photo', month: 'July 2026' },
  { img: 'assets/pasture-horses.jpg', title: 'The horse fence', tag: 'Reel', month: 'July 2026' },
  { img: 'assets/pizza-oven.jpg', title: 'Italian Night', tag: 'Photo', month: 'July 2026' },
  { img: 'assets/chapel-interior.jpg', title: 'Chapel, string lights', tag: 'Photo', month: 'July 2026' },
  { img: 'assets/firepit.jpg', title: 'Firepit at blue hour', tag: 'Video', month: 'July 2026' },
  { img: 'assets/chef-plating.jpg', title: 'The Farm Kitchen', tag: 'Photo', month: 'August 2026' },
  { img: 'assets/pavilion-night.jpg', title: 'Pavilion after dark', tag: 'Video', month: 'August 2026' },
  { img: 'assets/golden-hour-dip.jpg', title: 'Golden hour', tag: 'Photo', month: 'August 2026' },
  { img: 'assets/pavilion-autumn.jpg', title: 'Autumn pavilion', tag: 'Photo', month: 'September 2026' },
  { img: 'assets/autumn-centerpiece.png', title: 'Styling details', tag: 'Photo', month: 'September 2026' },
  { img: 'assets/gathering-place.jpg', title: 'Cooking competition', tag: 'Reel', month: 'July 2026' },
  { img: 'assets/chef-plating.jpg', title: 'Plating, close', tag: 'Video', month: 'August 2026' }
];

const TOOLKIT = [
  { num: 'i.', title: 'The Farm Marketing Brain', body: 'A Claude project on Kristie’s own desktop, loaded with everything that makes The Farm sound like The Farm. Ask it for a caption, an email, or a gut-check.', cta: 'Open the project files ↗', status: 'Installed & in use', items: ['Brand story & voice files', 'Editorial style guide', 'Competitive analysis', 'Conversion-audit skill', 'Plain .md — portable forever'] },
  { num: 'ii.', title: 'The Farm Design System', body: 'The complete visual language in one living document, so anything made by anyone still looks like The Farm.', cta: 'View the design system ↗', status: 'Living document', items: ['Voice, tone, and standards', 'Color palette & typography', 'Slider & post templates', 'Logo usage & photo direction'] },
  { num: 'iii.', title: 'The Content Library', body: 'Every photo and video from every shoot on the property — organized by month, downloadable anytime.', cta: 'Open the library ↗', status: 'Growing after every shoot', items: ['Organized month by month', 'Photo, video, and Reel cuts', 'Free for web, print, and email'] }
];
