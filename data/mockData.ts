export const quickStats = [
  { label: "Active Tasks", value: "32", icon: "✓", tint: "#eaf4ff" },
  { label: "Upcoming Deadlines", value: "8", icon: "↗", tint: "#edf8f2" },
  { label: "Meetings", value: "8", icon: "◔", tint: "#fff3d9" },
  { label: "Open Items", value: "3", icon: "!", tint: "#ffe9eb" },
];

export const teamMembers = [
  { name: "Alicia Johnson", role: "Product Lead", color: "#4d8cff" },
  { name: "Harold Lee", role: "Design Lead", color: "#26b98a" },
  { name: "Mila Chen", role: "PM", color: "#f28e2b" },
  { name: "Sam Patel", role: "Developer", color: "#9b62ff" },
];

export const tasks = [
  {
    id: 1,
    title: "Landing page redesign",
    description:
      "<p>Finalize homepage hero labels and product copy for launch.</p><p><strong>Key note:</strong> need final approval from design.</p>",
    status: "Open",
    project: "Website Redesign",
    assignee: "Alicia Johnson",
    assignees: ["Alicia Johnson", "Harold Lee"],
    assigneeColor: "#4d8cff",
    priority: "High",
    deadline: "Nov 20",
    startDate: "2026-11-06",
    dueDate: "2026-11-20",
    done: false,
    progress: 28,
    comments: [{ id: 1, author: "Alicia Johnson", text: "Need final copy check before publishing." }],
    relatedTaskIds: [2],
  },
  {
    id: 2,
    title: "Prototype validation",
    description: "Collect testing notes from beta users and update flows.",
    status: "Open",
    project: "Website Redesign",
    assignee: "Harold Lee",
    assignees: ["Harold Lee", "Mila Chen"],
    assigneeColor: "#26b98a",
    priority: "Medium",
    deadline: "Nov 18",
    startDate: "2026-11-08",
    dueDate: "2026-11-18",
    done: false,
    progress: 64,
    comments: [{ id: 1, author: "Harold Lee", text: "Feedback from the test group is ready." }],
    relatedTaskIds: [1],
  },
  {
    id: 3,
    title: "Launch checklist",
    description: "Review approval list across marketing and support teams.",
    status: "Open",
    project: "Marketing Launch",
    assignee: "Mila Chen",
    assignees: ["Mila Chen", "Sam Patel"],
    assigneeColor: "#f28e2b",
    priority: "High",
    deadline: "Nov 22",
    startDate: "2026-11-10",
    dueDate: "2026-11-22",
    done: false,
    progress: 82,
    comments: [{ id: 1, author: "Mila Chen", text: "Marketing sign-off is scheduled for Thursday." }],
    relatedTaskIds: [6],
  },
  {
    id: 4,
    title: "Bug triage",
    description: "Resolve payment flow issues and prepare deployment notes.",
    status: "Done",
    project: "Operations",
    assignee: "Sam Patel",
    assignees: ["Sam Patel"],
    assigneeColor: "#9b62ff",
    priority: "Low",
    deadline: "Nov 16",
    startDate: "2026-11-01",
    dueDate: "2026-11-16",
    done: true,
    progress: 100,
    comments: [{ id: 1, author: "Sam Patel", text: "Fixed and deployed to production." }],
    relatedTaskIds: [],
  },
  {
    id: 5,
    title: "CRM sync",
    description: "Connect account and contact sync across all projects.",
    status: "Open",
    project: "Operations",
    assignee: "Sam Patel",
    assignees: ["Sam Patel", "Alicia Johnson"],
    assigneeColor: "#9b62ff",
    priority: "Medium",
    deadline: "Nov 21",
    startDate: "2026-11-05",
    dueDate: "2026-11-21",
    done: false,
    progress: 55,
    comments: [{ id: 1, author: "Sam Patel", text: "Waiting on account mapping input from sales." }],
    relatedTaskIds: [4],
  },
  {
    id: 6,
    title: "Ad campaign review",
    description: "Approve creative assets for outreach sequence and retargeting.",
    status: "Open",
    project: "Marketing Launch",
    assignee: "Mila Chen",
    assignees: ["Mila Chen"],
    assigneeColor: "#f28e2b",
    priority: "High",
    deadline: "Nov 23",
    startDate: "2026-11-12",
    dueDate: "2026-11-23",
    done: false,
    progress: 18,
    comments: [{ id: 1, author: "Mila Chen", text: "Awaiting creative review from the agency." }],
    relatedTaskIds: [3],
  },
  {
    id: 7,
    title: "Support macros",
    description: "Draft a quicker troubleshooting workflow for the Q&A team.",
    status: "Open",
    project: "Operations",
    assignee: "Alicia Johnson",
    assignees: ["Alicia Johnson", "Sam Patel"],
    assigneeColor: "#4d8cff",
    priority: "Medium",
    deadline: "Nov 19",
    startDate: "2026-11-07",
    dueDate: "2026-11-19",
    done: false,
    progress: 72,
    comments: [{ id: 1, author: "Alicia Johnson", text: "Most macros are already drafted by support team." }],
    relatedTaskIds: [],
  },
  {
    id: 8,
    title: "Roadmap refresh",
    description: "Finalize quarter plan and shared milestone updates for all teams.",
    status: "Done",
    project: "Website Redesign",
    assignee: "Harold Lee",
    assignees: ["Harold Lee"],
    assigneeColor: "#26b98a",
    priority: "Low",
    deadline: "Nov 17",
    startDate: "2026-11-03",
    dueDate: "2026-11-17",
    done: true,
    progress: 100,
    comments: [{ id: 1, author: "Harold Lee", text: "Roadmap was finalized and shared with stakeholders." }],
    relatedTaskIds: [],
  },
];

export const calendarEvents = [
  { title: "Sprint Review", type: "Meeting", time: "09:00" },
  { title: "Design QA", type: "Checkin", time: "11:30" },
  { title: "Launch Sync", type: "Planning", time: "14:00" },
  { title: "Milestone Check", type: "Status", time: "16:15" },
];

export const milestones = [
  { name: "Beta release", date: "Nov 22" },
  { name: "Campaign launch", date: "Nov 25" },
  { name: "Team planning", date: "Nov 30" },
];

export const getTaskStatus = (task: (typeof tasks)[number]) => {
  if (task.done) {
    return "Done";
  }

  const today = new Date();
  const startDate = new Date(task.startDate);
  const dueDate = new Date(task.dueDate);

  if (today < startDate) {
    return "Missed";
  }

  if (today > dueDate) {
    return "Overdue";
  }

  return "Open";
};

export const getTaskStatusClass = (task: (typeof tasks)[number]) => {
  const status = getTaskStatus(task).toLowerCase();
  return status.replace(/\s+/g, "-");
};

export const getTaskProgress = (task: (typeof tasks)[number]) => {
  if (task.done) {
    return 100;
  }

  const today = new Date();
  const startDate = new Date(task.startDate);
  const dueDate = new Date(task.dueDate);

  if (today < startDate) {
    return 0;
  }

  if (today > dueDate) {
    return 100;
  }

  const total = dueDate.getTime() - startDate.getTime();
  const elapsed = today.getTime() - startDate.getTime();

  if (total <= 0) {
    return 100;
  }

  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
};

export const getCurrentUser = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = window.localStorage.getItem("teamflow-user");
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as { name: string; email: string };
  } catch {
    return null;
  }
};

export const setCurrentUser = (user: { name: string; email: string }) => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem("teamflow-user", JSON.stringify(user));
};

export const clearCurrentUser = () => {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem("teamflow-user");
};

export const formatDateLabel = (value?: string) => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

export const createTaskPlaceholder = (baseTitle: string, project: string, assignee: string) => ({
  id: Date.now(),
  title: baseTitle,
  description: "<p>Follow-up task created from the current item.</p>",
  status: "Open",
  project,
  assignee,
  assignees: [assignee],
  assigneeColor: "#4d8cff",
  priority: "Medium",
  deadline: "Next week",
  startDate: new Date().toISOString().slice(0, 10),
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  done: false,
  progress: 0,
  comments: [],
  relatedTaskIds: [],
});

export const formatStatusLabel = (task: (typeof tasks)[number]) => getTaskStatus(task);

export const getStatusStyle = (status: string) => {
  switch (status.toLowerCase()) {
    case "done":
      return "done";
    case "missed":
      return "missed";
    case "overdue":
      return "overdue";
    default:
      return "open";
  }
};

export const calendarDayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
;

export const monthDays = (monthIndex: number, year: number) => {
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const totalDays = lastDay.getDate();
  const cells: Array<{ day: number; inMonth: boolean; date: string }> = [];

  for (let i = 0; i < startOffset; i += 1) {
    const prevDate = new Date(year, monthIndex, i - startOffset + 1);
    cells.push({ day: prevDate.getDate(), inMonth: false, date: prevDate.toISOString().slice(0, 10) });
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const current = new Date(year, monthIndex, day);
    cells.push({ day, inMonth: true, date: current.toISOString().slice(0, 10) });
  }

  while (cells.length % 7 !== 0) {
    const nextDay = cells.length - (startOffset + totalDays) + 1;
    const nextDate = new Date(year, monthIndex + 1, nextDay);
    cells.push({ day: nextDate.getDate(), inMonth: false, date: nextDate.toISOString().slice(0, 10) });
  }

  return cells;
};
