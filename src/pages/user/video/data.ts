import type { VideoItem } from "./types";

// TODO: Replace with data from the API.
export const initialVideos: VideoItem[] = [
  {
    id: "1",
    title: "My Portfolio Introduction",
    description: "A short introduction to my portfolio.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=400",
    videoUrl: "https://example.com/video-1",
    duration: "02:35",
    category: "Introduction",
    status: "Published",
    createdAt: "2026-10-01",
    views: 1250
  },
  {
    id: "2",
    title: "Project Showcase 2026",
    description: "Showcase of my latest development projects.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
    videoUrl: "https://example.com/video-2",
    duration: "04:20",
    category: "Project",
    status: "Published",
    createdAt: "2026-09-25",
    views: 860
  },
  {
    id: "3",
    title: "Behind the Scenes",
    description: "A look at my creative workflow.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=400",
    videoUrl: "https://example.com/video-3",
    duration: "01:45",
    category: "Behind the Scenes",
    status: "Draft",
    createdAt: "2026-09-20",
    views: 0
  },
  {
    id: "4",
    title: "Building a Design System from Scratch",
    description: "How I structure tokens, components and documentation.",
    videoUrl: "https://example.com/video-4",
    duration: "08:12",
    category: "Tutorial",
    status: "Published",
    createdAt: "2026-09-14",
    views: 2310
  },
  {
    id: "5",
    title: "Client Case Study: Online Store Redesign",
    description: "From research to launch, and the results after 3 months.",
    videoUrl: "https://example.com/video-5",
    duration: "05:48",
    category: "Project",
    status: "Published",
    createdAt: "2026-09-02",
    views: 940
  },
  {
    id: "6",
    title: "My Developer Setup",
    description: "Tools, editor config and daily workflow.",
    videoUrl: "https://example.com/video-6",
    duration: "03:30",
    category: "Behind the Scenes",
    status: "Draft",
    createdAt: "2026-08-28",
    views: 0
  },
  {
    id: "7",
    title: "Animating Interfaces with CSS",
    description: "Practical motion patterns you can reuse in any project.",
    videoUrl: "https://example.com/video-7",
    duration: "06:05",
    category: "Tutorial",
    status: "Published",
    createdAt: "2026-08-15",
    views: 1780
  }
];
