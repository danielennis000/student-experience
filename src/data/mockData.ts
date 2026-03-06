export const mockProfile = {
  id: '12345',
  name: 'Alex Rodriguez',
  email: 'arodri45@asu.edu',
  major: 'Computer Science',
  year: 'Junior',
  interests: ['AI', 'Robotics', 'Entrepreneurship'],
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  studyGroups: [
    { id: 'sg1', name: 'CS 101 Study Group', members: 5, channel: '#cs101-study-group' },
    { id: 'sg2', name: 'AI Research Team', members: 3, channel: '#ai-research' },
  ],
}

export const mockEvents = [
  {
    id: 'evt1',
    title: 'AI Research Symposium',
    date: 'Today',
    time: '2:00 PM – 4:00 PM',
    location: 'Computing Commons 105',
    description:
      'Join faculty and students for presentations on cutting-edge AI research including large language models, computer vision, and reinforcement learning.',
    category: 'academic' as const,
    relevance: ['AI', 'Computer Science'],
    organizer: 'School of Computing & AI',
  },
  {
    id: 'evt2',
    title: 'Robotics Club Showcase',
    date: 'Today',
    time: '5:00 PM – 7:00 PM',
    location: 'Student Pavilion',
    description:
      "See the latest projects from ASU's robotics club members, including autonomous drones and humanoid robots.",
    category: 'social' as const,
    relevance: ['Robotics'],
    organizer: 'ASU Robotics Club',
  },
  {
    id: 'evt3',
    title: 'Innovation Challenge Kickoff',
    date: 'Today',
    time: '6:00 PM – 8:00 PM',
    location: 'Brickyard Entrepreneurship Center',
    description:
      "Kick off the semester's biggest startup competition. Form teams, brainstorm ideas, and compete for $10,000 in prizes.",
    category: 'social' as const,
    relevance: ['Entrepreneurship'],
    organizer: 'ASU Entrepreneurship Club',
  },
]

export const mockEmailDraft = {
  to: 'CS 101 Study Group',
  subject: 'Join me for AI Research Symposium today!',
  body: `Hey everyone,

I just found out about the AI Research Symposium happening today from 2:00 PM to 4:00 PM at Computing Commons 105!

They'll have presentations on cutting-edge AI research including large language models, computer vision, and reinforcement learning. Sounds right up our alley!

Would anyone like to come with me?

Best,
Alex`,
}

export const mockSlackMessage = {
  channel: '#cs101-study-group',
  message: `Hey team! 👋
Check out this event: *AI Research Symposium*
• When: Today, 2:00 PM – 4:00 PM
• Where: Computing Commons 105

> They'll have presentations on cutting-edge AI research including LLMs, computer vision, and reinforcement learning.

_No schedule conflicts found with our CS 101 assignments!_ ✅

Who's interested? 🙋`,
}
