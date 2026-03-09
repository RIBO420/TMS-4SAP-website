// ---------------------------------------------------------------------------
// TMS Module Data
// Each module represents a core component of The Manufacturing Suite for SAP
// Business One. SVG icon paths are extracted from the original site markup.
// ---------------------------------------------------------------------------

export interface ModuleFeature {
  title: string;
  description: string;
}

export interface ModuleData {
  slug: string;
  abbr: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  featured: boolean;
  order: number;
  features: ModuleFeature[];
  benefits: string[];
  integrations: string[];
  relatedModules: string[];
}

export const modules: ModuleData[] = [
  // -----------------------------------------------------------------------
  // 1. PPS - Production Planning & Scheduling
  // -----------------------------------------------------------------------
  {
    slug: 'pps',
    abbr: 'PPS',
    title: 'Production Planning & Scheduling',
    tagline: 'Digitalize your complete production process in one unified system.',
    description:
      'PPS is the manageable core of The Manufacturing Suite, combining all required planning and scheduling functions into a single, integrated module. From order intake through capacity planning to shop-floor release, PPS provides end-to-end visibility and control over your entire production workflow within SAP Business One.',
    icon: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/>',
    featured: true,
    order: 1,
    features: [
      {
        title: 'Multi-Level Production Orders',
        description:
          'Create and manage complex, multi-level production orders with automatic BOM explosion, routing generation, and sub-assembly scheduling.',
      },
      {
        title: 'Capacity Planning',
        description:
          'Visualise and optimise resource utilisation across work centres with interactive Gantt charts, drag-and-drop rescheduling, and finite capacity loading.',
      },
      {
        title: 'Material Requirements Planning',
        description:
          'Determine net material requirements based on demand, current stock, and lead times. Automatically generate purchase requisitions and planned orders.',
      },
      {
        title: 'Shop-Floor Release',
        description:
          'Release production orders to the shop floor with complete work instructions, material pick lists, and tool requirements. Supports batch and serial number assignment.',
      },
      {
        title: 'Scheduling Engine',
        description:
          'Forward and backward scheduling with finite and infinite capacity modes. Consider shift patterns, maintenance windows, and alternative resources.',
      },
      {
        title: 'Order Progress Tracking',
        description:
          'Monitor real-time order status, completion percentages, and milestone tracking. Automated alerts for delays and bottlenecks.',
      },
    ],
    benefits: [
      'Reduce production lead times by up to 30% through optimised scheduling',
      'Eliminate manual planning spreadsheets with automated MRP runs',
      'Improve on-time delivery rates with real-time capacity visibility',
      'Lower work-in-progress inventory through better order sequencing',
      'Full traceability from sales order to finished goods',
      'Seamless integration with SAP Business One financials',
    ],
    integrations: [
      'SAP Business One Production Module',
      'SAP Business One MRP Wizard',
      'SAP Business One Inventory Management',
      'Microsoft Project (import/export)',
    ],
    relatedModules: ['aps', 'mes', 'pdc', 'pdm'],
  },

  // -----------------------------------------------------------------------
  // 2. APS - Advanced Planning & Scheduling
  // -----------------------------------------------------------------------
  {
    slug: 'aps',
    abbr: 'APS',
    title: 'Advanced Planning & Scheduling',
    tagline: 'Determine future material requirements and optimise stock overnight.',
    description:
      'APS extends the core planning capabilities of PPS with advanced algorithms for constraint-based scheduling, what-if simulation, and overnight batch optimisation. It determines future material requirements, optimises stock levels, and tracks every material movement across your supply chain within SAP Business One.',
    icon: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4"/><path d="M8 2v4"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/>',
    featured: false,
    order: 2,
    features: [
      {
        title: 'Constraint-Based Scheduling',
        description:
          'Schedule production orders against multiple constraints simultaneously: machine capacity, labour availability, tooling, and material supply.',
      },
      {
        title: 'What-If Simulation',
        description:
          'Run planning scenarios without affecting live data. Compare outcomes of different scheduling strategies, rush orders, or resource changes.',
      },
      {
        title: 'Overnight Batch Optimisation',
        description:
          'Automatically optimise the entire production schedule overnight using advanced algorithms that consider setup times, changeovers, and delivery priorities.',
      },
      {
        title: 'Material Tracking',
        description:
          'Track every material movement from goods receipt through consumption to finished goods. Full lot and batch traceability across all production stages.',
      },
      {
        title: 'Demand Forecasting Integration',
        description:
          'Incorporate sales forecasts and historical demand patterns to improve planning accuracy and reduce safety stock requirements.',
      },
    ],
    benefits: [
      'Optimise stock levels to reduce carrying costs by up to 25%',
      'Increase machine utilisation through intelligent sequencing',
      'Respond faster to rush orders with real-time rescheduling',
      'Reduce setup times through optimised changeover grouping',
      'Improve forecast accuracy with historical demand analysis',
    ],
    integrations: [
      'SAP Business One Forecasting',
      'SAP Business One Procurement',
      'SAP Business One Warehouse Management',
    ],
    relatedModules: ['pps', 'mes', 'bi'],
  },

  // -----------------------------------------------------------------------
  // 3. MES - Manufacturing Execution System
  // -----------------------------------------------------------------------
  {
    slug: 'mes',
    abbr: 'MES',
    title: 'Manufacturing Execution System',
    tagline: 'Real-time visibility of production processes on the shop floor.',
    description:
      'MES provides the digital link between your ERP system and the operational level. It delivers real-time visibility of production processes, enabling shop-floor operators and management to monitor, control, and optimise manufacturing operations as they happen. Fully integrated with SAP Business One, MES closes the information gap between planning and execution.',
    icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
    featured: false,
    order: 3,
    features: [
      {
        title: 'Real-Time Production Monitoring',
        description:
          'Dashboards displaying live machine status, order progress, OEE metrics, and yield rates. Drill down from plant overview to individual work centre.',
      },
      {
        title: 'Digital Work Instructions',
        description:
          'Deliver step-by-step work instructions, technical drawings, and quality checklists directly to operator terminals. Version-controlled and always up to date.',
      },
      {
        title: 'Machine Integration',
        description:
          'Connect to CNC machines, PLCs, and IoT sensors via OPC-UA, MQTT, or REST interfaces. Collect cycle times, counters, and process parameters automatically.',
      },
      {
        title: 'Downtime Management',
        description:
          'Capture and categorise machine downtime events with reason codes. Pareto analysis identifies the most impactful causes for targeted improvement.',
      },
      {
        title: 'OEE Calculation',
        description:
          'Automatic Overall Equipment Effectiveness calculation based on availability, performance, and quality. Real-time display and historical trend analysis.',
      },
    ],
    benefits: [
      'Gain real-time visibility into all shop-floor operations',
      'Reduce unplanned downtime with proactive monitoring and alerts',
      'Improve OEE by identifying and eliminating production losses',
      'Eliminate paper-based reporting with digital data capture',
      'Bridge the gap between ERP planning and shop-floor execution',
    ],
    integrations: [
      'OPC-UA compatible machines and PLCs',
      'MQTT broker connections',
      'SAP Business One Production Module',
      'Barcode and RFID hardware',
    ],
    relatedModules: ['pps', 'pdc', 'qm', 'bi'],
  },

  // -----------------------------------------------------------------------
  // 4. PDC - Production Data Capture
  // -----------------------------------------------------------------------
  {
    slug: 'pdc',
    abbr: 'PDC',
    title: 'Production Data Capture',
    tagline: 'Online booking transmission to ERP with touchscreen and barcode support.',
    description:
      'PDC enables fast, accurate data capture directly on the production floor. Optimised for touchscreens, barcode scanners, and RFID readers, it provides online booking transmission to SAP Business One. Operators can clock in/out, report quantities, log scrap, and record material consumption without leaving their work station.',
    icon: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><line x1="7" y1="12" x2="17" y2="12"/>',
    featured: false,
    order: 4,
    features: [
      {
        title: 'Touch-Optimised Interface',
        description:
          'Large, clearly labelled buttons and input fields designed for industrial touchscreen terminals. Glove-friendly operation with minimal keystrokes required.',
      },
      {
        title: 'Barcode & RFID Scanning',
        description:
          'Scan work order barcodes, employee badges, material labels, and tool identifiers. Supports 1D barcodes, QR codes, and passive RFID tags.',
      },
      {
        title: 'Time Registration',
        description:
          'Operator clock-in/out, job start/stop, and break recording. Automatic calculation of setup and run times with split booking across multiple orders.',
      },
      {
        title: 'Quantity Reporting',
        description:
          'Report good quantities, rework, and scrap with mandatory reason codes. Supports partial completions and backflush material consumption.',
      },
      {
        title: 'Material Consumption',
        description:
          'Record actual material consumption against planned BOM quantities. Track batch and serial numbers at the point of use.',
      },
    ],
    benefits: [
      'Capture production data in real time at the point of origin',
      'Eliminate duplicate data entry between shop floor and ERP',
      'Improve data accuracy with barcode and RFID validation',
      'Reduce administrative overhead for production operators',
      'Enable real-time costing with immediate booking transmission',
    ],
    integrations: [
      'Industrial touchscreen terminals',
      'Barcode scanners (Zebra, Honeywell, Datalogic)',
      'RFID readers and tags',
      'SAP Business One Time & Attendance',
    ],
    relatedModules: ['pps', 'mes', 'qm'],
  },

  // -----------------------------------------------------------------------
  // 5. QM - Quality Management
  // -----------------------------------------------------------------------
  {
    slug: 'qm',
    abbr: 'QM',
    title: 'Quality Management',
    tagline: 'Complete quality control from incoming inspection to complaint processing.',
    description:
      'QM delivers complete quality control throughout your manufacturing process. From test equipment management and incoming goods inspection through in-process monitoring to complaint processing with 8D reports, scrap logging, and multi-level batch tracing. Fully integrated with SAP Business One for seamless quality data flow.',
    icon: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    featured: false,
    order: 5,
    features: [
      {
        title: 'Inspection Planning',
        description:
          'Define inspection plans with sampling rules, test characteristics, tolerances, and measurement methods. Assign plans to incoming goods, in-process, and final inspection.',
      },
      {
        title: 'Test Equipment Management',
        description:
          'Track calibration schedules, measurement uncertainty, and certification status for all test equipment. Automated reminders for upcoming calibrations.',
      },
      {
        title: 'Statistical Process Control',
        description:
          'Control charts (X-bar, R, p, c), process capability indices (Cp, Cpk), and trend analysis. Real-time SPC alerts when processes drift out of specification.',
      },
      {
        title: '8D Complaint Processing',
        description:
          'Structured 8D methodology for customer complaints and internal non-conformances. Root cause analysis, corrective actions, and effectiveness verification.',
      },
      {
        title: 'Batch Traceability',
        description:
          'Multi-level forward and backward batch tracing. Identify all affected products from a specific material batch or trace a finished product back to its raw material origins.',
      },
      {
        title: 'Scrap & Rework Management',
        description:
          'Log scrap and rework events with categorised reason codes. Cost tracking per defect category enables targeted quality improvement initiatives.',
      },
    ],
    benefits: [
      'Ensure compliance with ISO 9001, IATF 16949, and industry regulations',
      'Reduce scrap rates through early defect detection with SPC',
      'Accelerate complaint resolution with structured 8D workflow',
      'Full batch traceability for recall readiness',
      'Lower cost of quality through data-driven improvement',
      'Integrated quality data eliminates separate quality databases',
    ],
    integrations: [
      'SAP Business One Quality Control',
      'SAP Business One Batch Management',
      'Measurement instruments via RS-232/USB',
      'CMM (Coordinate Measuring Machines)',
    ],
    relatedModules: ['mes', 'pdc', 'pps', 'bi'],
  },

  // -----------------------------------------------------------------------
  // 6. PDM - Product Data Management
  // -----------------------------------------------------------------------
  {
    slug: 'pdm',
    abbr: 'PDM',
    title: 'Product Data Management',
    tagline: 'Centralise production data with native CAD and engineering adapters.',
    description:
      'PDM centralises all product-related data and bridges the gap between engineering and production. With native adapters for Autodesk Inventor, Vault, SOLIDWORKS, and EPLAN, it synchronises Bills of Materials, drawings, and engineering changes directly into SAP Business One. No more manual data transfer or version mismatches between CAD and ERP.',
    icon: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/><circle cx="12" cy="13" r="2"/><path d="M12 15v5"/>',
    featured: false,
    order: 6,
    features: [
      {
        title: 'CAD Integration',
        description:
          'Native adapters for Autodesk Inventor, Vault, SOLIDWORKS, and EPLAN. Bi-directional synchronisation of BOMs, part numbers, and metadata.',
      },
      {
        title: 'Engineering Change Management',
        description:
          'Structured ECN/ECO workflow with approval routing, effectivity dates, and automatic BOM versioning. Track the full history of every product change.',
      },
      {
        title: 'BOM Synchronisation',
        description:
          'Automatically transfer engineering BOMs from CAD systems into SAP Business One production BOMs. Map engineering attributes to ERP item master fields.',
      },
      {
        title: 'Document Linking',
        description:
          'Associate CAD drawings, specifications, test reports, and certifications with items, BOMs, and production orders. Central access from any module.',
      },
      {
        title: 'Revision Control',
        description:
          'Full revision history with comparison views. Ensure production always uses the correct, released revision of drawings and BOMs.',
      },
    ],
    benefits: [
      'Eliminate manual BOM transfer between CAD and ERP systems',
      'Reduce engineering change cycle time with structured ECN workflow',
      'Ensure production uses the correct revision every time',
      'Single source of truth for all product data',
      'Improve collaboration between engineering and production teams',
    ],
    integrations: [
      'Autodesk Inventor',
      'Autodesk Vault',
      'SOLIDWORKS',
      'EPLAN',
      'SAP Business One Item Master',
    ],
    relatedModules: ['pps', 'dms', 'vc'],
  },

  // -----------------------------------------------------------------------
  // 7. BI - Business Intelligence
  // -----------------------------------------------------------------------
  {
    slug: 'bi',
    abbr: 'BI',
    title: 'Business Intelligence',
    tagline: 'Balanced Scorecard with KPIs at a glance and real-time variance analysis.',
    description:
      'BI provides a powerful Balanced Scorecard dashboard with manufacturing KPIs at a glance. Dynamic formatting, drill-down capabilities, and real-time variance comparisons give management the insights needed to make data-driven decisions. All data is sourced directly from SAP Business One and TMS modules without external ETL.',
    icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>',
    featured: false,
    order: 7,
    features: [
      {
        title: 'Balanced Scorecard',
        description:
          'Pre-built manufacturing scorecard with financial, customer, process, and learning perspectives. Customisable KPI tiles with traffic light status indicators.',
      },
      {
        title: 'Real-Time Dashboards',
        description:
          'Live data visualisation with auto-refresh. Charts, gauges, tables, and trend lines covering production output, quality metrics, delivery performance, and costs.',
      },
      {
        title: 'Variance Analysis',
        description:
          'Compare actual vs. planned values for production costs, cycle times, material consumption, and output. Highlight deviations with dynamic conditional formatting.',
      },
      {
        title: 'Drill-Down Navigation',
        description:
          'Click through from summary KPIs to detailed transaction-level data. Navigate from overall OEE to specific machine downtime events in seconds.',
      },
      {
        title: 'Scheduled Reports',
        description:
          'Automate report generation and distribution via email. Daily production summaries, weekly quality reports, and monthly management packs on schedule.',
      },
    ],
    benefits: [
      'Instant access to manufacturing KPIs without manual reporting',
      'Identify cost variances and quality trends before they become problems',
      'Reduce reporting effort with automated scheduled reports',
      'Data-driven decision making with real-time information',
      'No separate BI tool required; built into the TMS ecosystem',
    ],
    integrations: [
      'SAP Business One HANA Views',
      'SAP Business One Crystal Reports',
      'All TMS modules as data sources',
      'Email distribution (SMTP)',
    ],
    relatedModules: ['mes', 'qm', 'pps', 'aps'],
  },

  // -----------------------------------------------------------------------
  // 8. VC - Variant Configurator
  // -----------------------------------------------------------------------
  {
    slug: 'vc',
    abbr: 'VC',
    title: 'Variant Configurator',
    tagline: 'Formula-based toolset for real-time complex product configuration.',
    description:
      'VC is a formula and characteristic-based toolset for real-time complex product configuration. It handles multi-level BOM logic, pricing calculations, and feasibility checks during the quotation and order entry process. Sales teams can configure made-to-order products directly in SAP Business One without engineering involvement.',
    icon: '<line x1="21" y1="4" x2="14" y2="4"/><line x1="10" y1="4" x2="3" y2="4"/><line x1="21" y1="12" x2="12" y2="12"/><line x1="8" y1="12" x2="3" y2="12"/><line x1="21" y1="20" x2="16" y2="20"/><line x1="12" y1="20" x2="3" y2="20"/><line x1="14" y1="2" x2="14" y2="6"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="16" y1="18" x2="16" y2="22"/>',
    featured: false,
    order: 8,
    features: [
      {
        title: 'Characteristic-Based Configuration',
        description:
          'Define product variants through characteristics (colour, size, material, options) with dependency rules that prevent invalid combinations.',
      },
      {
        title: 'Formula Engine',
        description:
          'Calculate dimensions, weights, prices, and lead times using mathematical formulas based on selected characteristics. Supports conditional logic and lookup tables.',
      },
      {
        title: 'Multi-Level BOM Generation',
        description:
          'Automatically generate variant-specific BOMs and routings based on the configuration. Include or exclude sub-assemblies and operations dynamically.',
      },
      {
        title: 'Guided Selling',
        description:
          'Step-by-step configuration wizard for sales teams and customers. Validates selections in real time and shows price impact immediately.',
      },
      {
        title: 'Quotation Integration',
        description:
          'Configured products flow directly into SAP Business One quotations and sales orders with correct pricing, BOM, and delivery date.',
      },
    ],
    benefits: [
      'Enable sales teams to configure complex products without engineering support',
      'Reduce quotation turnaround time from days to minutes',
      'Eliminate configuration errors with built-in validation rules',
      'Improve margin accuracy with formula-based pricing',
      'Shorten order-to-production handover with automatic BOM generation',
    ],
    integrations: [
      'SAP Business One Sales Quotations',
      'SAP Business One Sales Orders',
      'SAP Business One BOM Management',
      'Web-based customer portals (API)',
    ],
    relatedModules: ['pps', 'pdm', 'bi'],
  },

  // -----------------------------------------------------------------------
  // 9. DMS - Document Management System (NEW)
  // -----------------------------------------------------------------------
  {
    slug: 'dms',
    abbr: 'DMS',
    title: 'Document Management System',
    tagline: 'Manage, version, and archive all manufacturing documents within SAP.',
    description:
      'DMS is the central repository for all manufacturing-related documents within SAP Business One. From technical drawings and work instructions to certificates, quality records, and regulatory filings, DMS provides version control, approval workflows, full-text search, and long-term archiving. It ensures every stakeholder accesses the right document at the right time.',
    icon: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>',
    featured: false,
    order: 9,
    features: [
      {
        title: 'Version Control',
        description:
          'Automatic version numbering with check-in/check-out mechanism. Full revision history with diff comparison and rollback capability.',
      },
      {
        title: 'Approval Workflows',
        description:
          'Configurable multi-step approval workflows for document release. Role-based routing, digital signatures, and audit trail for every approval action.',
      },
      {
        title: 'Full-Text Search',
        description:
          'Index and search across all document content, metadata, and custom attributes. Find documents by keyword, date range, author, or linked business object.',
      },
      {
        title: 'SAP Object Linking',
        description:
          'Link documents to any SAP Business One object: items, business partners, production orders, quality records, and more. Access linked documents from transaction screens.',
      },
      {
        title: 'Long-Term Archiving',
        description:
          'GoBD and GDPR-compliant archiving with retention policies. Automated archival of closed orders, expired certifications, and historical records.',
      },
      {
        title: 'Secure Access Control',
        description:
          'Granular permissions at folder, document type, and individual document level. Integration with SAP Business One user roles and authorisation groups.',
      },
    ],
    benefits: [
      'Single source of truth for all manufacturing documentation',
      'Ensure regulatory compliance with controlled document workflows',
      'Reduce time spent searching for documents by up to 60%',
      'Eliminate paper-based filing and manual version tracking',
      'Audit-ready document trails for ISO and industry certifications',
      'Seamless access to documents from any TMS module',
    ],
    integrations: [
      'SAP Business One Attachments',
      'Microsoft Office (Word, Excel, PowerPoint)',
      'PDF viewers and editors',
      'Email archiving (SMTP/IMAP)',
      'Scanner and OCR integration',
    ],
    relatedModules: ['pdm', 'qm', 'mes', 'pps'],
  },
];

/** Retrieve a single module by its URL slug. */
export function getModuleBySlug(slug: string): ModuleData | undefined {
  return modules.find((m) => m.slug === slug);
}

/** Return only featured modules (for homepage hero cards). */
export function getFeaturedModules(): ModuleData[] {
  return modules.filter((m) => m.featured);
}

/** Return modules sorted by their defined order. */
export function getModulesSorted(): ModuleData[] {
  return [...modules].sort((a, b) => a.order - b.order);
}
