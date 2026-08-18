// src/Info/assessmentData.js

export const assessments = [
  {
    id: 1,
    title: "React Fundamentals Quiz",
    sessionId: 1,
    trainerId: 1,

    description:
      "Assessment covering React components, props, state, and hooks.",

    quizLink: "https://example.com/react-quiz",

    dueDate: "20 Aug 2026",

    totalMarks: 20,

    status: "Open",

    performance: [
      {
        traineeId: 1,
        score: 18,
      },
      {
        traineeId: 2,
        score: 16,
      },
      {
        traineeId: 3,
        score: 19,
      },
      {
        traineeId: 6,
        score: 15,
      },
    ],
  },

  {
    id: 2,
    title: "JavaScript Basics",
    sessionId: 7,
    trainerId: 1,

    description:
      "Assessment covering JavaScript fundamentals and ES6 concepts.",

    quizLink: "https://example.com/javascript-quiz",

    dueDate: "25 Aug 2026",

    totalMarks: 25,

    status: "Upcoming",

    performance: [
      {
        traineeId: 1,
        score: null,
      },
      {
        traineeId: 2,
        score: null,
      },
      {
        traineeId: 3,
        score: null,
      },
      {
        traineeId: 4,
        score: null,
      },
    ],
  },
];
