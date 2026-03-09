// ---------------------------------------------------------------------------
// TMS Navigation Structure
// Defines the mega-menu layout, footer links, and mobile navigation.
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  /** If groups are present this nav item opens a mega-menu dropdown. */
  groups?: NavGroup[];
}

// -------------------------------------------------------------------------
// Main Navigation (header)
// -------------------------------------------------------------------------

export const mainNav: NavItem[] = [
  {
    label: 'Modules',
    href: '/modules',
    groups: [
      {
        title: 'Planning',
        links: [
          {
            label: 'PPS - Production Planning & Scheduling',
            href: '/modules/pps',
            description: 'Core planning and scheduling for SAP Business One.',
          },
          {
            label: 'APS - Advanced Planning & Scheduling',
            href: '/modules/aps',
            description: 'Constraint-based scheduling and overnight optimisation.',
          },
        ],
      },
      {
        title: 'Execution',
        links: [
          {
            label: 'MES - Manufacturing Execution System',
            href: '/modules/mes',
            description: 'Real-time shop-floor monitoring and control.',
          },
          {
            label: 'PDC - Production Data Capture',
            href: '/modules/pdc',
            description: 'Touchscreen and barcode-based data capture.',
          },
        ],
      },
      {
        title: 'Quality & Data',
        links: [
          {
            label: 'QM - Quality Management',
            href: '/modules/qm',
            description: 'Inspection, SPC, 8D, and batch traceability.',
          },
          {
            label: 'PDM - Product Data Management',
            href: '/modules/pdm',
            description: 'CAD integration and engineering change management.',
          },
          {
            label: 'DMS - Document Management System',
            href: '/modules/dms',
            description: 'Versioning, archiving, and approval workflows.',
          },
        ],
      },
      {
        title: 'Intelligence & Configuration',
        links: [
          {
            label: 'BI - Business Intelligence',
            href: '/modules/bi',
            description: 'KPI dashboards and real-time variance analysis.',
          },
          {
            label: 'VC - Variant Configurator',
            href: '/modules/vc',
            description: 'Formula-based product configuration.',
          },
        ],
      },
    ],
  },
  {
    label: 'Industries',
    href: '/industries',
    groups: [
      {
        title: 'Sectors',
        links: [
          {
            label: 'Plastics & Rubber',
            href: '/industries/kunststof',
            description: 'Injection moulding, extrusion, and blow moulding.',
          },
          {
            label: 'Automotive & Tier Suppliers',
            href: '/industries/automotive',
            description: 'IATF 16949 compliance and JIT production.',
          },
          {
            label: 'Metal Working & Machining',
            href: '/industries/metaalbewerking',
            description: 'CNC machining, sheet metal, and welding.',
          },
          {
            label: 'Electronics & Assembly',
            href: '/industries/elektronica',
            description: 'PCB assembly and complex BOM management.',
          },
        ],
      },
    ],
  },
  {
    label: 'Partners',
    href: '/partners',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

// -------------------------------------------------------------------------
// Footer Navigation
// -------------------------------------------------------------------------

export interface FooterColumn {
  title: string;
  links: NavLink[];
}

export const footerNav: FooterColumn[] = [
  {
    title: 'Platform',
    links: [
      { label: 'All Modules', href: '/modules' },
      { label: 'Production Planning', href: '/modules/pps' },
      { label: 'Advanced Scheduling', href: '/modules/aps' },
      { label: 'Shop Floor (MES)', href: '/modules/mes' },
      { label: 'Data Capture (PDC)', href: '/modules/pdc' },
      { label: 'Quality (QM)', href: '/modules/qm' },
    ],
  },
  {
    title: 'Solutions',
    links: [
      { label: 'Product Data (PDM)', href: '/modules/pdm' },
      { label: 'Documents (DMS)', href: '/modules/dms' },
      { label: 'Business Intelligence', href: '/modules/bi' },
      { label: 'Variant Configurator', href: '/modules/vc' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { label: 'Plastics & Rubber', href: '/industries/kunststof' },
      { label: 'Automotive', href: '/industries/automotive' },
      { label: 'Metal Working', href: '/industries/metaalbewerking' },
      { label: 'Electronics', href: '/industries/elektronica' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Partner Network', href: '/partners' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '/legal/privacy' },
      { label: 'Terms of Service', href: '/legal/terms' },
    ],
  },
];

// -------------------------------------------------------------------------
// Call-to-Action button shown in the navigation bar
// -------------------------------------------------------------------------

export const navCta: NavLink = {
  label: 'Get Started',
  href: '/contact',
};
