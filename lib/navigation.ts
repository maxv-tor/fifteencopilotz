import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  SquarePen,
  Palette,
  CodeXml,
  Sparkles,
  ShieldCheck
} from "lucide-react";

export type NavigationItem = {
  name: string;
  href: string;
  soon?: boolean;
};

export type NavigationSection = {
  title: string;
  icon: LucideIcon;
  items: NavigationItem[];
};

export const navigationSections: NavigationSection[] = [
  {
    title: "Agentic Tools",
    icon: LayoutDashboard,
    items: [
      {
        name: "Competitor Products Brief",
        href: "/competitor-products-brief"
      },
      {
        name: "Market Insight Briefs",
        href: "#",
        soon: true
      },
      {
        name: "Client Intake to Brief",
        href: "#",
        soon: true
      }
    ]
  },
  {
    title: "Content Creation Copilots",
    icon: SquarePen,
    items: [
      {
        name: "Content Creation Copilot",
        href: "/copilot-page-template"
      },
      {
        name: "Lead Nurture Email",
        href: "#",
        soon: true
      },
      {
        name: "Re-engagement Email",
        href: "#",
        soon: true
      },
      {
        name: "Sales Email",
        href: "#",
        soon: true
      }
    ]
  },
  {
    title: "Ads & Campaigns",
    icon: Palette,
    items: [
      { name: "Facebook Ads", href: "#", soon: true },
      { name: "Instagram Ads", href: "#", soon: true },
      { name: "Google Ads", href: "#", soon: true },
      { name: "LinkedIn Ads", href: "#", soon: true },
      { name: "TikTok Ads", href: "#", soon: true },
      { name: "YouTube Ads", href: "#", soon: true }
    ]
  },
  {
    title: "Funnels & Pages",
    icon: CodeXml,
    items: [
      { name: "Lead Capture Page", href: "#", soon: true },
      { name: "Webinar Signup Page", href: "#", soon: true },
      { name: "Advertorial Page", href: "#", soon: true }
    ]
  },
  {
    title: "Idea Generation",
    icon: Sparkles,
    items: [
      { name: "Campaign Concepts", href: "#", soon: true },
      { name: "Content Calendar", href: "#", soon: true }
    ]
  },
  {
    title: "Resources",
    icon: ShieldCheck,
    items: [
      { name: "FAQ", href: "/faq" },
      { name: "Support", href: "/support" }
    ]
  }
];

export const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "Competitor Products Brief", href: "/competitor-products-brief" },
      { label: "Content Creation Copilot", href: "/copilot-page-template" },
      { label: "Market Insight Briefs", href: "#", soon: true },
      { label: "Client Intake to Brief", href: "#", soon: true }
    ]
  },
  {
    title: "Campaigns",
    links: [
      { label: "Email Sequences", href: "#", soon: true },
      { label: "Social Ads Suite", href: "#", soon: true },
      { label: "Performance Funnels", href: "#", soon: true }
    ]
  },
  {
    title: "Resources",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: "Support", href: "/support" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms-of-service" }
    ]
  }
];
