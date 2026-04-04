// types/navigation.ts
// Navigation-related types.

export interface NavLink {
  label: string;
  href: string;
  description?: string;
  children?: NavLink[];
}

export interface FooterColumn {
  heading: string;
  links: Pick<NavLink, "label" | "href">[];
}
