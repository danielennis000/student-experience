ASU Campus Connect: Frontend Prototype PRD
Title & One-Liner
ASU Campus Connect: A personalized campus event discovery and sharing tool for ASU students.
Problem Statement

ASU students struggle to discover campus events that align with their academic interests and personal preferences
Students need efficient ways to share event information with study groups across different communication channels
The current process of finding relevant events and coordinating with peers is fragmented and time-consuming

Assumptions

This is a frontend-only prototype for demonstration purposes
All backend functionality will be mocked with static JSON data
User authentication will be simulated (no actual auth implementation)
Student profile data (major, interests) will be hardcoded for the demo
Web search results will be mocked with predetermined responses
Email and Slack integrations will be simulated (no actual sending)
GitHub Pages will be used for deployment

Goals & Non-Goals
Goals

Create a functional frontend prototype that demonstrates the core user experience
Showcase the AI-powered personalization of event recommendations
Demonstrate the workflow of discovering events and sharing them via different channels
Implement realistic loading states with Mirage animations to simulate backend processing
Provide a visually appealing UI that follows ASU's design system

Non-Goals

Implementing actual backend services or APIs
Creating real authentication flows
Building actual integrations with email or Slack
Developing a production-ready application
Optimizing for performance or scalability

Target Users & Primary Use Cases
Student Persona
Name: Alex Rodriguez
Role: Junior Computer Science major at ASU
Needs: Wants to find relevant academic and social events on campus that match their interests in AI, robotics, and entrepreneurship. Needs to coordinate with study groups efficiently.
Primary Use Cases

Discover personalized campus events based on academic major and interests
Search for specific types of events happening on campus today
Draft and edit emails to share event information with study groups
Switch communication channels (from email to Slack) to share event details

User Stories (with Acceptance Criteria)


As a student, I want to search for campus events happening today so I can plan my schedule.

Given I am on the main search page
When I enter "ASU events on campus today" in the search box
Then I see a "Searching the web..." loading animation
And I receive personalized event results based on my major and interests



As a student, I want to see personalized event recommendations that match my interests so I can find relevant activities.

Given I have searched for campus events
When the search results load
Then I see events filtered by my major (Computer Science) and interests (AI, robotics, entrepreneurship)
And each event shows relevant details (time, location, description)



As a student, I want to draft an email about an event to my study group so we can attend together.

Given I have found an interesting event
When I click "Share with study group"
Then I see a "Crafting email..." loading animation
And a pre-populated email draft appears with event details
And I can edit the email content before sending



As a student, I want to switch from email to Slack for sharing event details so I can use my preferred communication channel.

Given I have a draft email ready
When I click "Share via Slack instead"
Then I see the content transform into a Slack message format
And I can edit the Slack message before sending



As a student, I want to see visual feedback during processing so I know the system is working.

Given I am performing any action that requires processing
When the system is working on my request
Then I see a Mirage animation with descriptive text about what's happening



As a student, I want to see my profile information so I know what data is being used for personalization.

Given I am logged in to the application
When I view my profile section
Then I see my major, interests, and other relevant information



As a student, I want to navigate between different sections of the app so I can access all features.

Given I am on any page in the application
When I use the navigation menu
Then I can access search, profile, and messaging features



As a student, I want to view my message history so I can reference past communications.

Given I have sent messages about events
When I visit the message history section
Then I see a list of previously drafted emails and Slack messages



Functional Requirements
Search Functionality

Provide a search input field with placeholder text "Search for campus events..."
Display a "Searching the web..." Mirage animation when search is initiated
Show mock search results based on predefined responses for "ASU events on campus today"
Personalize results based on the mocked student profile (major, interests)
Allow filtering of search results by event type (academic, social, athletic)

Event Display

Show event cards with:

Event title
Date and time
Location
Brief description
Relevance indicator (why this event matches the student's interests)


Provide a "Share" button on each event card

Messaging Features

Generate draft emails with:

Pre-populated subject line with event name
Body text including event details, time, and location
Editable content area
"Send" and "Cancel" buttons (mocked functionality)


Support switching from email to Slack with:

Content transformation to Slack format
Channel selection dropdown (mocked)
Preview of how the message will appear
"Send to Slack" button (mocked functionality)



Loading States

Implement Mirage animations for:

"Searching the web..." during search operations
"Crafting email..." when generating email drafts
"Parsing syllabus dates..." when checking for schedule conflicts
"Sending to Slack..." when simulating message sending



Profile Section (Prototype)

Display mocked student information:

Name and profile picture
Major (Computer Science)
Academic year (Junior)
Interests (AI, robotics, entrepreneurship)
Study groups (CS 101 Study Group, AI Research Team)



UX / UI Requirements (AntD + ASU Theme)
Theme Requirements

Primary color (ASU Maroon): #8C1D40
Secondary color (ASU Gold): #FFC627
Gray variants: #E8E8E8, #D0D0D0, #747474
Buttons must be fully rounded (pill style)
Cards and containers must have square corners (NO border radius)
No drop shadows anywhere

Key Screens/Pages


Home/Search Page

Search input using AntD Input component (centered, prominent)
Recent searches section using AntD List
Quick filters using AntD Radio.Group with pill-style buttons



Search Results Page

Loading state with AntD Spin and custom Mirage animation
Results displayed in AntD Card components (square corners, no shadows)
Filter sidebar using AntD Collapse and Checkbox components
"Share" buttons using AntD Button (pill style)



Email Composition Page

Form layout using AntD Form components
Rich text editor using AntD Input.TextArea
Preview section using AntD Card (square corners)
Action buttons (Send, Cancel, Switch to Slack) using AntD Button (pill style)



Slack Message Page

Channel selector using AntD Select
Message preview using AntD Card (square corners)
Emoji selector using AntD Popover
Send button using AntD Button (pill style, primary color)



Profile Page

User info displayed in AntD Descriptions component
Interests shown as AntD Tag components
Study groups listed in AntD List component
Settings section using AntD Collapse



Component-Level Guidance


Navigation

Use AntD Menu for main navigation
Implement AntD Breadcrumb for page hierarchy
Mobile: Use AntD Drawer for slide-out navigation



Search Components

AntD Input.Search with custom styling
AntD Empty for no results state
AntD Pagination for multiple result pages



Event Cards

AntD Card with custom header and no border radius
AntD Tag for event categories
AntD Avatar for event organizer
AntD Button (pill style) for actions



Loading States

Custom Mirage animation integrated with AntD Spin
AntD Progress for operation progress
AntD Alert for success/error messages



Forms

AntD Form with FormItem components
AntD Input and TextArea for text entry
AntD DatePicker for date selection
AntD Select for dropdown options



Accessibility Requirements

Ensure all interactive elements are keyboard navigable
Maintain color contrast ratio of at least 4.5:1 for text
Include proper ARIA labels for custom components
Implement form validation with clear error messages
Support screen readers with appropriate alt text and ARIA roles

System Architecture
GitHub Pages Prototype Architecture
ASU Campus Connect (Frontend-Only Prototype)
┌─────────────────────────────────────────────┐
│ React SPA (Static Site on GitHub Pages)     │
├─────────────────────────────────────────────┤
│ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│ │ React       │ │ React       │ │ Mocked  │ │
│ │ Components  │ │ Router      │ │ Data    │ │
│ │ (AntD)      │ │ (Hash-based)│ │ (JSON)  │ │
│ └─────────────┘ └─────────────┘ └─────────┘ │
│ ┌─────────────┐ ┌─────────────┐ ┌─────────┐ │
│ │ State       │ │ Mirage      │ │ Mock    │ │
│ │ Management  │ │ Animations  │ │ API     │ │
│ │ (Context)   │ │             │ │ Layer   │ │
│ └─────────────┘ └─────────────┘ └─────────┘ │
└─────────────────────────────────────────────┘

Frontend Components

Single Page Application built with React
Hash-based routing for GitHub Pages compatibility
Context API for state management
AntD component library with custom ASU theming
Mirage animation library for loading states

Mock Data Strategy

Static JSON files for:

User profile data
Event listings
Search results
Study group information


localStorage for:

Saving draft messages
Tracking search history
Storing user preferences



Future API Contracts (Not Implemented in Prototype)

/api/events - Get campus events
/api/user/profile - Get user profile information
/api/search - Search for events
/api/messages - Send/receive messages

Data Model (Temporary for Prototype)
Mock Data Structures

User Profile

json{
  "id": "12345",
  "name": "Alex Rodriguez",
  "major": "Computer Science",
  "year": "Junior",
  "interests": ["AI", "Robotics", "Entrepreneurship"],
  "studyGroups": [
    {
      "id": "sg1",
      "name": "CS 101 Study Group",
      "members": 5
    },
    {
      "id": "sg2",
      "name": "AI Research Team",
      "members": 3
    }
  ]
}

Events

json[
  {
    "id": "evt1",
    "title": "AI Research Symposium",
    "date": "2023-11-15",
    "time": "14:00-16:00",
    "location": "Computing Commons 105",
    "description": "Join faculty and students for presentations on cutting-edge AI research.",
    "category": "academic",
    "relevance": ["AI", "Computer Science"]
  },
  {
    "id": "evt2",
    "title": "Robotics Club Showcase",
    "date": "2023-11-15",
    "time": "17:00-19:00",
    "location": "Student Pavilion",
    "description": "See the latest projects from ASU's robotics club members.",
    "category": "social",
    "relevance": ["Robotics"]
  }
]

Message Templates

json{
  "email": {
    "subject": "Join me for {eventName}",
    "body": "Hey everyone,\n\nI found this interesting event: {eventName} happening on {eventDate} at {eventTime} in {eventLocation}.\n\n{eventDescription}\n\nWould anyone like to join me?\n\nBest,\n{userName}"
  },
  "slack": {
    "message": "Hey team! :wave:\nCheck out this event: *{eventName}*\n• When: {eventDate} at {eventTime}\n• Where: {eventLocation}\n\n>{eventDescription}\n\nWho's interested? :raised_hand:"
  }
}
API Design
Future API Contracts (Mocked in Prototype)


Get Events API

Endpoint: /api/events
Method: GET
Query Parameters:

date: Filter by date (YYYY-MM-DD)
category: Filter by category (academic, social, athletic)
relevance: Filter by user interests


Response:
json{
  "events": [
    {
      "id": "evt1",
      "title": "AI Research Symposium",
      "date": "2023-11-15",
      "time": "14:00-16:00",
      "location": "Computing Commons 105",
      "description": "Join faculty and students for presentations on cutting-edge AI research.",
      "category": "academic",
      "relevance": ["AI", "Computer Science"]
    }
  ],
  "totalCount": 1
}




Search API

Endpoint: /api/search
Method: POST
Request:
json{
  "query": "ASU events on campus today",
  "filters": {
    "date": "2023-11-15",
    "categories": ["academic", "social"]
  }
}

Response:
json{
  "results": [
    {
      "id": "evt1",
      "title": "AI Research Symposium",
      "date": "2023-11-15",
      "time": "14:00-16:00",
      "location": "Computing Commons 105",
      "description": "Join faculty and students for presentations on cutting-edge AI research.",
      "category": "academic",
      "relevance": ["AI", "Computer Science"]
    }
  ],
  "totalCount": 1,
  "processingTime": "0.5s"
}




CreateAI API (Mocked)

Note: In a real implementation, users would need to request an API key from: https://docs.google.com/forms/d/e/1FAIpQLSemTOMROmX11XLLDZcUjmeP-T8gSgtaIb9EWEbqyufFbLxIOQ/viewform
For the prototype, we'll mock the API responses



Non-Functional Requirements
Performance

Initial page load under 2 seconds
Simulated search response time of 1-2 seconds (with animation)
Smooth transitions between screens (no jank)
Responsive design for all screen sizes (mobile, tablet, desktop)

Accessibility

WCAG 2.1 AA compliance
Keyboard navigation support
Screen reader compatibility
Sufficient color
