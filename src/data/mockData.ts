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

export const mockAIProjects = [
  { id: 'p1', name: 'BIO 181 | Chat', icon: 'message' },
  { id: 'p2', name: 'PSY 101 - Syllabot', icon: 'message' },
  { id: 'p3', name: 'Reflections on BIO 181', icon: 'message' },
  { id: 'p4', name: 'PSY 101 - Midterm Prep', icon: 'message' },
]

export const mockChatHistory = [
  { id: 'h1', title: 'Discussing atomic weights' },
  { id: 'h2', title: 'Understanding covalent b...' },
]

export const mockEmailDraft = {
  subject: 'Anyone want to attend the Life in Crisis event at 3:30?',
  body: `Hi everyone,

I just saw that there's an event today called "Life in Crisis: Biopolitics and Haunted Ecologies" from 3:30–5:30 p.m., and it looks really interesting (and relevant to what we've been discussing lately).

I'm thinking about going and wanted to see if anyone else from our study group would like to attend together. It could be a good opportunity to hear different perspectives and maybe even use some of it in our upcoming discussions or assignments.

Let me know if you're interested!`,
}

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
