import type { LucideIcon } from "lucide-react";
import {
  FileBarChart2,
  PenSquare,
  Target,
  Users,
  RefreshCcw,
  Handshake,
  Megaphone,
  Images,
  LayoutTemplate,
  MousePointerClick,
  Video,
  Wand2,
  Lightbulb,
  PhoneCall,
  Rocket
} from "lucide-react";

export type ToolStatus = "available" | "coming-soon";

export type ToolCategory =
  | "all"
  | "agentic"
  | "copilot"
  | "email"
  | "ads"
  | "funnels"
  | "research";

export type Tool = {
  name: string;
  description: string;
  href: string;
  icon: LucideIcon;
  categories: ToolCategory[];
  status: ToolStatus;
  cta?: string;
};

export const toolFilters: { value: ToolCategory; label: string }[] = [
  { value: "all", label: "All" },
  { value: "agentic", label: "Agentic Tools" },
  { value: "research", label: "Research" },
  { value: "copilot", label: "Copilots" },
  { value: "email", label: "Email" },
  { value: "ads", label: "Ads" },
  { value: "funnels", label: "Funnels" }
];

export const tools: Tool[] = [
  {
    name: "Competitor Products Brief",
    description:
      "Deep AI analysis of the competitive landscape with insights on positioning, pricing, and hidden opportunities.",
    href: "/competitor-products-brief",
    icon: FileBarChart2,
    categories: ["agentic", "research"],
    status: "available",
    cta: "Open"
  },
  {
    name: "Content Creation Copilot",
    description:
      "Collaborative generation of publication-ready copy, pitches, and scripts for your channels.",
    href: "/copilot-page-template",
    icon: PenSquare,
    categories: ["copilot"],
    status: "available",
    cta: "Launch"
  },
  {
    name: "Market Insight Briefs",
    description:
      "Overview of trends, demand signals, and niche forecasts compiled from public sources and AI panels.",
    href: "#",
    icon: Target,
    categories: ["agentic", "research"],
    status: "coming-soon"
  },
  {
    name: "Client Intake to Brief",
    description:
      "Transform client forms and calls into structured briefs for creative and project teams.",
    href: "#",
    icon: Users,
    categories: ["agentic"],
    status: "coming-soon"
  },
  {
    name: "Lead Nurture Email Copilot",
    description:
      "Create personalized nurture sequences tailored to segments and funnel stages.",
    href: "#",
    icon: RefreshCcw,
    categories: ["copilot", "email"],
    status: "coming-soon"
  },
  {
    name: "Re-engagement Email Copilot",
    description:
      "Bring back dormant subscribers with sequences featuring relevant offers and propositions.",
    href: "#",
    icon: Handshake,
    categories: ["copilot", "email"],
    status: "coming-soon"
  },
  {
    name: "Sales Email Copilot",
    description:
      "Targeted emails for deals: offers, follow-ups, and personalization based on ICP.",
    href: "#",
    icon: PhoneCall,
    categories: ["copilot", "email"],
    status: "coming-soon"
  },
  {
    name: "Facebook Ads Studio",
    description:
      "Generate creatives, headlines, and segments for paid social based on campaign briefs.",
    href: "#",
    icon: Megaphone,
    categories: ["ads"],
    status: "coming-soon"
  },
  {
    name: "Instagram Ads Toolkit",
    description:
      "Scripts, captions, and visual references for stories and reels with high engagement.",
    href: "#",
    icon: Images,
    categories: ["ads"],
    status: "coming-soon"
  },
  {
    name: "Google Ads Copilot",
    description:
      "Build keyword semantics, RSA copy, and extensions based on product data.",
    href: "#",
    icon: MousePointerClick,
    categories: ["ads"],
    status: "coming-soon"
  },
  {
    name: "LinkedIn Ads Copilot",
    description:
      "B2B creatives, targeting, and CTAs for ads focused on decision-makers.",
    href: "#",
    icon: Lightbulb,
    categories: ["ads"],
    status: "coming-soon"
  },
  {
    name: "TikTok Ads Generator",
    description:
      "Viral scripts, hooks, and storyboards adapted for native presentation.",
    href: "#",
    icon: Wand2,
    categories: ["ads"],
    status: "coming-soon"
  },
  {
    name: "YouTube Ads Generator",
    description:
      "Selling scripts for pre-roll and mid-roll based on AIDA/PAS/Jobs-to-be-done frameworks.",
    href: "#",
    icon: Video,
    categories: ["ads"],
    status: "coming-soon"
  },
  {
    name: "Lead Capture Page Builder",
    description:
      "Ready-made blocks and copy for landing pages optimized for lead/demo conversion.",
    href: "#",
    icon: LayoutTemplate,
    categories: ["funnels"],
    status: "coming-soon"
  },
  {
    name: "Webinar Signup Page Builder",
    description:
      "Registration pages with trigger-based proof elements and schedules.",
    href: "#",
    icon: Rocket,
    categories: ["funnels"],
    status: "coming-soon"
  },
  {
    name: "Advertorial Page Generator",
    description:
      "Native format for paid placements: storytelling, social proof, CTAs.",
    href: "#",
    icon: LayoutTemplate,
    categories: ["funnels", "ads"],
    status: "coming-soon"
  }
];
