export const mockProfile = {
  id: '12345',
  name: 'Alex Rodriguez',
  email: 'dennis4@asu.edu',
  major: 'Computer Science',
  year: 'Junior',
  interests: ['AI', 'Robotics', 'Entrepreneurship'],
  studyGroups: [
    { id: 'sg1', name: 'CS 101 Study Group', members: 5, channel: '#cs101-study-group' },
    { id: 'sg2', name: 'AI Research Team', members: 3, channel: '#ai-research' },
  ],
}

export const mockEvents = [
  {
    id: 'evt1',
    title: 'A Talk with Chris Brooks',
    details: [
      'An academic/lecture event (details like exact time may vary; likely online or on campus).',
    ],
    source: 'thecollege.asu.edu',
  },
  {
    id: 'evt2',
    title: 'Life in Crisis: Biopolitics and Haunted Ecologies',
    details: [
      'A themed academic talk/discussion.',
      '**Time:** ~3:30 p.m.–5:30 p.m. MST',
      '**Location:** Tempe campus / Online',
    ],
    source: 'thecollege.asu.edu',
  },
  {
    id: 'evt3',
    title: 'The College Graduate Expo',
    details: [
      'A career/graduate opportunities event for current students thinking about future studies.',
      '**Time:** 4 p.m.–6 p.m. MST',
      '**Location:** Armstrong Hall, Tempe campus',
      '**Cost:** Free',
    ],
    source: 'asuevents.asu.edu',
  },
]

export interface MockAIProject {
  id: string
  name: string
  icon: string
  active?: boolean
}

export const mockAIProjects: MockAIProject[] = [
  { id: 'p1', name: 'BIO 181 | Chat', icon: 'message', active: true },
  { id: 'p2', name: 'PSY 101 - Syllabot', icon: 'message', active: false },
  { id: 'p3', name: 'Reflections on BIO 181', icon: 'message', active: false },
  { id: 'p4', name: 'PSY 101 - Midterm Prep', icon: 'message', active: false },
]

export interface MockChat {
  id: string
  title: string
  messages: { role: 'user' | 'assistant'; text: string }[]
}

export const mockChatHistory: MockChat[] = [
  {
    id: 'h1',
    title: 'BIO Assessment',
    messages: [
      { role: 'user', text: 'Can you do an assessment of my skills to see where I need help?' },
      { role: 'assistant', text: "Perfect — let's do this 🧠📋\nI'll give you a **short diagnostic** (about 6–8 questions total). Answer honestly; this is about spotting patterns, not being perfect.\n\n**Question 1: Experimental Design**\nA researcher grows bacteria at three temperatures: 20°C, 30°C, and 40°C. She measures growth rate after 24 hours.\n\n**Which of the following is the dependent variable?**\n  A. Temperature\n  B. Type of bacteria\n  C. Growth rate\n  D. Time (24 hours)\n\nReply with just the letter, and I'll give you the next question." },
      { role: 'user', text: 'A' },
      { role: 'assistant', text: "Thanks — good start. Let's unpack that one quickly, then move on.\n\n**Question 1 – Correct answer: C (Growth rate)**\n\n• **Independent variable** = what the researcher changes → **temperature**\n• **Dependent variable** = what is measured → **growth rate**\n\nSo this tells me you may need a bit of reinforcement on **experimental design terminology**, which is very common in BIO 181 exams. Totally fixable.\n\n**Question 2: Data Interpretation (Graphs)**\nA graph shows enzyme activity vs. temperature.\nActivity increases from 10°C to 37°C, then rapidly decreases above 40°C.\n\n**What is the best explanation for the decrease in activity above 40°C?**\n\nA. The enzyme's active site changes shape (denaturation)\n  B. The substrate concentration decreases\n  C. The enzyme is used up by the reaction\n  D. The pH becomes neutral\n\nReply with the letter only." },
    ],
  },
  {
    id: 'h2',
    title: 'Discussing atomic weights',
    messages: [
      { role: 'user', text: 'Can you explain how atomic weights are calculated?' },
      { role: 'assistant', text: "Atomic weight (also called relative atomic mass) is the weighted average of the masses of all naturally occurring isotopes of an element.\n\nFor example, chlorine has two stable isotopes:\n• ³⁵Cl (75.77% abundance, mass 34.97 amu)\n• ³⁷Cl (24.23% abundance, mass 36.97 amu)\n\n**Calculation:**\n(0.7577 × 34.97) + (0.2423 × 36.97) = **35.45 amu**\n\nThis is why chlorine's atomic weight on the periodic table is 35.45, not a whole number — it reflects the natural mixture of isotopes." },
    ],
  },
  {
    id: 'h3',
    title: 'Understanding covalent b...',
    messages: [
      { role: 'user', text: "What's the difference between covalent and ionic bonds?" },
      { role: 'assistant', text: "Great question! Here's the key difference:\n\n**Covalent bonds** — atoms **share** electrons\n• Typically between two nonmetals\n• Example: H₂O (water) — oxygen shares electrons with hydrogen\n\n**Ionic bonds** — one atom **transfers** electrons to another\n• Typically between a metal and a nonmetal\n• Example: NaCl (table salt) — sodium gives an electron to chlorine\n\n**Quick rule of thumb:** If the electronegativity difference is > 1.7, it's ionic. Below that, it's covalent.\n\nWant me to go deeper into polar vs nonpolar covalent bonds?" },
    ],
  },
]

export const projectDescriptions: Record<string, { title: string; subtitle: string; info?: string }> = {
  'CreateAI Chat': {
    title: 'Hi Maria, what can I help you with?',
    subtitle: 'I’m able to answer questions about pretty much anything. Just ask me!',
    info: 'AI Acceleration Team @ ASU',
  },
  'BIO 181 | Chat': {
    title: 'How can I help you today?',
    subtitle: 'This project answers questions about BIO 181. Just ask me!',
    info: 'name123@asu.edu',
  },
  'PSY 101 - Syllabot': {
    title: 'What can I help you with?',
    subtitle: 'This project answers questions about your PSY 101 syllabus. Just ask me!',
    info: 'name123@asu.edu',
  },
  'Reflections on BIO 181': {
    title: 'What can I help you with?',
    subtitle: 'This project helps you write reflections for BIO 181. Just ask me!',
    info: 'name123@asu.edu',
  },
  'PSY 101 - Midterm Prep': {
    title: 'What can I help you with?',
    subtitle: 'This project helps you prepare for your PSY 101 midterm. Just ask me!',
    info: 'name123@asu.edu',
  },
}

export const mockEmailDraft = {
  subject: 'Anyone want to attend the Life in Crisis event at 3:30?',
  body: `Hi everyone,

I just saw that there's an event today called "Life in Crisis: Biopolitics and Haunted Ecologies" from 3:30–5:30 p.m., and it looks really interesting (and relevant to what we've been discussing lately).

I'm thinking about going and wanted to see if anyone else from our study group would like to attend together. It could be a good opportunity to hear different perspectives and maybe even use some of it in our upcoming discussions or assignments.

Let me know if you're interested!`,
}

export const mockBioEmailDraft = {
  subject: 'Request for Midterm Exam Rescheduling - Medical Appointment',
  body: `Dear Professor [Last Name],

I hope this email finds you well. I am writing to inform you that I have an urgent medical appointment scheduled on March 18th at 10:00 AM, which conflicts with our BIO 181 midterm exam.

This appointment was scheduled by my healthcare provider and cannot be rescheduled due to the urgency of the matter. I understand the importance of the midterm exam and would greatly appreciate the opportunity to take it at an alternative time.

I am available to take the exam earlier that week or later that day if that would be convenient. I am also happy to provide documentation from my healthcare provider if needed.

Thank you for your understanding and consideration. I look forward to hearing from you about possible alternative arrangements.

Best regards,
Alex Rodriguez
Student ID: [Your ID]
BIO 181`,
}

export interface MockSource {
  id: string
  name: string
  url: string
  title?: string
  description?: string
  favicon?: string
}

export const mockSources: MockSource[] = [
  {
    id: 's1',
    name: 'thecollege.asu.edu',
    url: 'https://thecollege.asu.edu',
    title: 'Events at The College | The College of Liberal Arts and Sciences',
    description: 'Here you will discover a vibrant and varied array of exciting happenings taking place within The College.',
  },
  {
    id: 's2',
    name: 'asuevents.asu.edu',
    url: 'https://asuevents.asu.edu',
    title: 'The College Graduate Expo | ASU Events',
    description: "As a graduate student in The College of Liberal Arts and Sciences at Arizona State University, you'll have access to career and graduate opportunities.",
  },
  {
    id: 's3',
    name: 'CreateAI Documentation',
    url: 'https://createai.example.com/docs',
    title: 'CreateAI Documentation',
    description: 'Official documentation for CreateAI projects and APIs.',
  },
]

export const mockSlackMessage = {
  channel: '#cs101-study-group',
  message: `Hey team! 👋
Check out this event: *Life in Crisis: Biopolitics and Haunted Ecologies*
• When: Today, 3:30–5:30 p.m. MST
• Where: Tempe campus / Online

> A themed academic talk/discussion that's relevant to what we've been covering.

_No schedule conflicts found with our CS 101 assignments!_ ✅

Who's interested? 🙋`,
}
