// ---------------------------------------------------------------------------
// TMS Stats Bar Data
// Key statistics displayed in the hero section and reusable across pages.
// ---------------------------------------------------------------------------

export interface StatData {
  value: string;
  label: string;
}

/** Primary stats shown in the hero stat bar. */
export const heroStats: StatData[] = [
  { value: '9', label: 'Integrated Modules' },
  { value: 'SAP', label: 'Certified Solution' },
  { value: '24/7', label: 'Enterprise Support' },
  { value: 'Global', label: 'Partner Network' },
];

/** Extended platform stats used on the about or platform overview page. */
export const platformStats: StatData[] = [
  { value: '9', label: 'Integrated Modules' },
  { value: '25+', label: 'Years Experience' },
  { value: '500+', label: 'Implementations' },
  { value: '30+', label: 'Countries Served' },
  { value: '4', label: 'Industry Verticals' },
  { value: '99.9%', label: 'System Uptime' },
];

/** ROI-oriented stats for use in conversion sections. */
export const roiStats: StatData[] = [
  { value: '30%', label: 'Lead Time Reduction' },
  { value: '25%', label: 'Inventory Optimisation' },
  { value: '98%', label: 'On-Time Delivery' },
  { value: '60%', label: 'Less Manual Reporting' },
];
