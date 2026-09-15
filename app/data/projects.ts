export type Project = {
  index: string;
  title: string;
  category: string;
  stack: string[];
  description: string;
  role: string;
};

export const projects: Project[] = [
  {
    index: "01",
    title: "KindMateCare",
    category: "WEB",
    stack: ["Laravel", "Sanctum", "Reverb"],
    description:
      "A health-service platform built with Laravel. I focused on the backend, working with migrations, models, controllers, authentication, and real-time communication.",
    role: "Backend development",
  },
  {
    index: "02",
    title: "Sellora",
    category: "MOBILE",
    stack: ["Flutter", "Golang", "Gin", "MySQL"],
    description:
      "A full-stack business tracking app built to explore practical mobile and backend development, from the Flutter interface to the Go API and database layer.",
    role: "Full-stack development",
  },
  {
    index: "03",
    title: "Our Journey Gallery",
    category: "WEB",
    stack: ["Next.js", "Prisma", "Better Auth", "Cloudinary"],
    description:
      "A private memory gallery that brings photos, locations, and personal journeys into one space, with an interactive map and media storage.",
    role: "Web development",
  },
  {
    index: "04",
    title: "FiltraLens",
    category: "WEB",
    stack: ["HTML", "CSS", "JavaScript", "Canvas API"],
    description:
      "A browser-based photo filter studio built to explore image processing, Canvas API, and pixel-level manipulation through the web.",
    role: "Frontend development",
  },
  {
    index: "05",
    title: "IoT Monitoring Dashboard",
    category: "IOT",
    stack: ["Golang", "MQTT", "WebSocket", "MySQL"],
    description:
      "A real-time IoT monitoring dashboard built during my internship at Telkom Corporate University Center, connecting device telemetry with a live monitoring interface.",
    role: "IoT & backend development",
  },
];
