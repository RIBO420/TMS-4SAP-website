// ---------------------------------------------------------------------------
// TMS Feature Lists
// Reusable feature grids for the homepage and landing pages.
// ---------------------------------------------------------------------------

export interface FeatureItem {
  title: string;
  description: string;
  /** Lucide icon name (used by the component to render the correct icon). */
  icon: string;
}

// -------------------------------------------------------------------------
// Homepage: Platform Capabilities Grid
// -------------------------------------------------------------------------

export const platformFeatures: FeatureItem[] = [
  {
    title: 'Native SAP Integration',
    description:
      'Built directly on SAP Business One — no middleware, no external databases. Every transaction writes back to SAP in real time for a single source of truth.',
    icon: 'database',
  },
  {
    title: 'Modular Architecture',
    description:
      'Start with the modules you need and expand as your operation grows. Each module works independently yet integrates seamlessly with the rest of the suite.',
    icon: 'blocks',
  },
  {
    title: 'Real-Time Shop Floor',
    description:
      'Connect machines, operators, and sensors to your ERP. MES and PDC deliver live production data directly into SAP Business One without delay.',
    icon: 'activity',
  },
  {
    title: 'End-to-End Traceability',
    description:
      'Track every material batch, serial number, and production step from goods receipt to final shipment. One-click forward and backward tracing for recall readiness.',
    icon: 'scan-search',
  },
  {
    title: 'Quality Built In',
    description:
      'SPC, inspection plans, 8D workflows, and batch traceability are integrated into the production process — not bolted on as an afterthought.',
    icon: 'shield-check',
  },
  {
    title: 'Intelligent Scheduling',
    description:
      'Constraint-based algorithms optimise your production schedule against capacity, materials, tooling, and delivery dates simultaneously.',
    icon: 'brain',
  },
];

// -------------------------------------------------------------------------
// Homepage: Why TMS (Differentiators)
// -------------------------------------------------------------------------

export const differentiators: FeatureItem[] = [
  {
    title: 'No Middleware Required',
    description:
      'TMS operates within the SAP Business One environment. There are no separate servers, databases, or integration layers to maintain.',
    icon: 'plug-zap',
  },
  {
    title: 'Single User Interface',
    description:
      'Operators, planners, quality engineers, and management all work in the same system with role-based views tailored to their needs.',
    icon: 'layout-dashboard',
  },
  {
    title: 'Rapid Implementation',
    description:
      'Pre-configured industry templates and a modular rollout approach mean you can go live with your first module in weeks, not months.',
    icon: 'rocket',
  },
  {
    title: 'Global Partner Network',
    description:
      'Certified implementation partners on every continent ensure local language support, time-zone coverage, and industry-specific expertise.',
    icon: 'globe',
  },
];

// -------------------------------------------------------------------------
// Homepage: Integration Highlights
// -------------------------------------------------------------------------

export const integrationHighlights: FeatureItem[] = [
  {
    title: 'SAP Business One',
    description:
      'Deep, bi-directional integration covering production, inventory, procurement, sales, and financials.',
    icon: 'server',
  },
  {
    title: 'CAD Systems',
    description:
      'Native adapters for Autodesk Inventor, Vault, SOLIDWORKS, and EPLAN enable automatic BOM synchronisation.',
    icon: 'pen-tool',
  },
  {
    title: 'Machine Connectivity',
    description:
      'OPC-UA, MQTT, and REST interfaces connect CNC machines, PLCs, and IoT sensors to the TMS platform.',
    icon: 'cpu',
  },
  {
    title: 'Barcode & RFID',
    description:
      'Seamless integration with leading barcode scanners and RFID readers from Zebra, Honeywell, and Datalogic.',
    icon: 'scan-barcode',
  },
];

// -------------------------------------------------------------------------
// Module Overview: Shared Capabilities
// -------------------------------------------------------------------------

export const sharedCapabilities: FeatureItem[] = [
  {
    title: 'Role-Based Access',
    description:
      'Granular permissions aligned with SAP Business One authorisation groups. Every user sees only what they need.',
    icon: 'lock',
  },
  {
    title: 'Multi-Language Support',
    description:
      'Interface available in English, German, Dutch, French, Spanish, and more. Language follows the SAP user setting.',
    icon: 'languages',
  },
  {
    title: 'Audit Trail',
    description:
      'Every data change is logged with timestamp, user, and previous value. Complete audit readiness for ISO and automotive certifications.',
    icon: 'file-clock',
  },
  {
    title: 'API & Extensibility',
    description:
      'REST API endpoints allow external systems, customer portals, and mobile apps to interact with TMS data securely.',
    icon: 'webhook',
  },
];
