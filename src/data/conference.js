export const conferences = [
  {
    id: 1,
    title: "Global Business Forum 2025",
    description:
      "Global Business Forum 2025 unites leaders to explore trends, share ideas, and shape the future of business.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with actual YouTube embed URL
    date: "November 20, 2025",
    time: "All Day",
    location: "The Plaza Hotel – New York",
    price: "$199.00",
    category: "business",
    organizer: "Global Events Inc.",
    organizerImage: "/img/organizer1.jpg",
    callForSideEvent:
      "Join our networking dinner on November 19th for additional networking opportunities.",
    callForAbstract:
      "Submit your research abstracts by October 15th, 2025. Selected abstracts will be presented during the conference.",
    featured: true,
    tags: ["business", "networking", "innovation", "leadership"],
    agenda: [
      { time: "09:00 AM", activity: "Registration & Welcome Coffee" },
      {
        time: "10:00 AM",
        activity: "Opening Keynote: Future of Global Business",
      },
      {
        time: "11:30 AM",
        activity: "Panel Discussion: Digital Transformation",
      },
      { time: "01:00 PM", activity: "Networking Lunch" },
      { time: "02:30 PM", activity: "Workshop: Leadership in the Digital Age" },
      { time: "04:00 PM", activity: "Closing Remarks & Awards" },
    ],
    speakers: [
      {
        name: "John Smith",
        title: "CEO, Tech Innovations",
        image: "/img/speaker1.jpg",
      },
      {
        name: "Sarah Johnson",
        title: "Global Business Strategist",
        image: "/img/speaker2.jpg",
      },
      {
        name: "Michael Chen",
        title: "Digital Transformation Expert",
        image: "/img/speaker3.jpg",
      },
    ],
  },
  {
    id: 2,
    title: "Climate Action Summit 2025",
    description:
      "A comprehensive summit focusing on climate change solutions, sustainable development, and environmental innovation.",
    videoUrl: "https://www.youtube.com/embed/example2",
    date: "December 15, 2025",
    time: "09:00 AM - 06:00 PM",
    location: "Green Convention Center – San Francisco",
    price: "$150.00",
    category: "climate",
    organizer: "Climate Action Network",
    organizerImage: "/img/organizer2.jpg",
    callForSideEvent:
      "Attend our climate innovation showcase on December 14th featuring cutting-edge green technologies.",
    callForAbstract:
      "Share your climate research and solutions. Abstract submissions due November 30th, 2025.",
    featured: false,
    tags: ["climate", "sustainability", "environment", "innovation"],
    agenda: [
      { time: "09:00 AM", activity: "Registration & Sustainable Breakfast" },
      { time: "10:00 AM", activity: "Keynote: The Climate Crisis Imperative" },
      { time: "11:30 AM", activity: "Panel: Renewable Energy Solutions" },
      { time: "01:00 PM", activity: "Eco-Friendly Lunch" },
      { time: "02:30 PM", activity: "Workshop: Carbon Footprint Reduction" },
      { time: "04:00 PM", activity: "Action Planning Session" },
    ],
    speakers: [
      {
        name: "Dr. Emily Green",
        title: "Climate Scientist",
        image: "/img/speaker4.jpg",
      },
      {
        name: "Robert Martinez",
        title: "Renewable Energy Advocate",
        image: "/img/speaker5.jpg",
      },
    ],
  },
  {
    id: 3,
    title: "Healthcare Innovation Conference",
    description:
      "Exploring the latest advancements in healthcare technology, digital health solutions, and patient care innovations.",
    videoUrl: "https://www.youtube.com/embed/example3",
    date: "January 22, 2026",
    time: "08:30 AM - 05:30 PM",
    location: "Medical Center Auditorium – Boston",
    price: "$225.00",
    category: "health",
    organizer: "Healthcare Innovation Alliance",
    organizerImage: "/img/organizer3.jpg",
    callForSideEvent:
      "Join our medical device exhibition on January 21st showcasing the latest healthcare technologies.",
    callForAbstract:
      "Present your healthcare research findings. Abstract deadline: December 20th, 2025.",
    featured: false,
    tags: ["healthcare", "medical", "technology", "innovation"],
    agenda: [
      { time: "08:30 AM", activity: "Registration & Health Screening" },
      { time: "09:30 AM", activity: "Opening: Future of Healthcare" },
      { time: "11:00 AM", activity: "Digital Health Solutions Panel" },
      { time: "12:30 PM", activity: "Networking Lunch" },
      { time: "02:00 PM", activity: "AI in Healthcare Workshop" },
      { time: "03:30 PM", activity: "Patient Care Innovation Session" },
    ],
    speakers: [
      {
        name: "Dr. Lisa Wang",
        title: "Chief Medical Officer",
        image: "/img/speaker6.jpg",
      },
      {
        name: "James Thompson",
        title: "Health Tech Entrepreneur",
        image: "/img/speaker7.jpg",
      },
    ],
  },
  {
    id: 4,
    title: "Tech Startup Showcase 2025",
    description:
      "A premier event for emerging technology startups to pitch their innovative solutions to investors and industry leaders.",
    videoUrl: "https://www.youtube.com/embed/example4",
    date: "March 10, 2026",
    time: "10:00 AM - 08:00 PM",
    location: "Innovation Hub – Austin, Texas",
    price: "$99.00",
    category: "technology",
    organizer: "Startup Accelerator Network",
    organizerImage: "/img/organizer4.jpg",
    callForSideEvent:
      "Participate in our investor meetup on March 9th for one-on-one funding discussions.",
    callForAbstract:
      "Pitch your startup idea. Applications due February 15th, 2026.",
    featured: true,
    tags: ["technology", "startups", "innovation", "entrepreneurship"],
    agenda: [
      { time: "10:00 AM", activity: "Registration & Startup Expo" },
      { time: "11:00 AM", activity: "Investor Panel Discussion" },
      { time: "12:30 PM", activity: "Networking Lunch" },
      { time: "02:00 PM", activity: "Startup Pitch Competition" },
      { time: "05:00 PM", activity: "Awards Ceremony" },
      { time: "06:00 PM", activity: "Closing Reception" },
    ],
    speakers: [
      {
        name: "Alex Rivera",
        title: "Venture Capitalist",
        image: "/img/speaker8.jpg",
      },
      {
        name: "Jennifer Kim",
        title: "Serial Entrepreneur",
        image: "/img/speaker9.jpg",
      },
    ],
  },
];

export const recentConferences = [
  {
    id: 1,
    title: "Global Business Forum 2025",
    date: "November 20, 2025",
    image: "/img/conference1.jpg",
  },
  {
    id: 2,
    title: "Climate Action Summit 2025",
    date: "December 15, 2025",
    image: "/img/conference2.jpg",
  },
  {
    id: 3,
    title: "Healthcare Innovation Conference",
    date: "January 22, 2026",
    image: "/img/conference3.jpg",
  },
];

export const popularConferenceTags = [
  "Business",
  "Technology",
  "Healthcare",
  "Climate",
  "Innovation",
  "Leadership",
  "Networking",
  "Startups",
  "Digital",
  "Sustainability",
];
