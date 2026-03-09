// ---------------------------------------------------------------------------
// TMS Industry Verticals
// Four key manufacturing sectors served by The Manufacturing Suite.
// ---------------------------------------------------------------------------

export interface IndustryChallenge {
  title: string;
  description: string;
}

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  challenges: IndustryChallenge[];
  relevantModules: string[];
  stats: IndustryStat[];
}

export const industries: IndustryData[] = [
  // -----------------------------------------------------------------------
  // 1. Kunststof (Plastics)
  // -----------------------------------------------------------------------
  {
    slug: 'kunststof',
    title: 'Plastics & Rubber',
    tagline: 'Precision moulding meets digital production control.',
    description:
      'Plastics manufacturers face unique challenges: multi-cavity tooling, rapid cycle times, colour and material changeovers, and strict traceability requirements driven by automotive and medical OEMs. TMS provides the real-time monitoring, quality control, and scheduling intelligence that injection moulding, extrusion, and blow moulding operations demand.',
    challenges: [
      {
        title: 'Cycle Time Optimisation',
        description:
          'Injection moulding cycle times are measured in seconds. Even small deviations in cooling, pressure, or temperature cascade into scrap and lost output. MES captures process parameters in real time for continuous optimisation.',
      },
      {
        title: 'Multi-Cavity Tool Management',
        description:
          'Managing dozens of multi-cavity moulds across multiple presses requires precise scheduling. PPS and APS account for tool availability, preventive maintenance windows, and changeover sequences.',
      },
      {
        title: 'Material & Colour Changeovers',
        description:
          'Frequent resin and masterbatch changes generate purge waste and downtime. The scheduling engine groups orders by material and colour to minimise changeovers and scrap.',
      },
      {
        title: 'OEM Traceability Requirements',
        description:
          'Automotive and medical customers demand full batch traceability from raw material lot to finished part. QM provides multi-level forward and backward tracing with a single click.',
      },
    ],
    relevantModules: ['pps', 'aps', 'mes', 'pdc', 'qm', 'bi'],
    stats: [
      { value: '35%', label: 'Less Changeover Time' },
      { value: '99.2%', label: 'Traceability Coverage' },
      { value: '22%', label: 'Scrap Reduction' },
      { value: '<5s', label: 'Data Capture per Cycle' },
    ],
  },

  // -----------------------------------------------------------------------
  // 2. Automotive
  // -----------------------------------------------------------------------
  {
    slug: 'automotive',
    title: 'Automotive & Tier Suppliers',
    tagline: 'Meet IATF 16949 demands with integrated quality and production.',
    description:
      'Automotive tier suppliers operate under intense pressure: IATF 16949 compliance, PPAP submissions, just-in-time delivery schedules, and zero-defect expectations. TMS delivers the quality management rigour, precise production scheduling, and complete traceability that the automotive supply chain requires, all within SAP Business One.',
    challenges: [
      {
        title: 'IATF 16949 Compliance',
        description:
          'Maintaining IATF 16949 certification requires controlled processes, documented procedures, and continuous improvement. QM provides SPC, FMEA tracking, control plans, and audit management in a single system.',
      },
      {
        title: 'Just-In-Time Delivery',
        description:
          'OEM delivery windows are measured in hours, not days. APS optimises schedules against customer call-off requirements, ensuring on-time shipment without excessive finished goods inventory.',
      },
      {
        title: 'PPAP & Sample Management',
        description:
          'Production Part Approval Process documentation requires coordination between engineering, quality, and production. DMS and PDM manage all PPAP elements with version control and approval workflows.',
      },
      {
        title: 'Variant Complexity',
        description:
          'Automotive components come in hundreds of variants defined by customer specifications. VC handles complex configuration rules and generates variant-specific BOMs and routings automatically.',
      },
    ],
    relevantModules: ['pps', 'aps', 'mes', 'qm', 'pdm', 'vc', 'dms'],
    stats: [
      { value: '0 PPM', label: 'Defect Target Support' },
      { value: '98.5%', label: 'On-Time Delivery' },
      { value: '100%', label: 'PPAP Documentation' },
      { value: '40%', label: 'Faster Audit Prep' },
    ],
  },

  // -----------------------------------------------------------------------
  // 3. Metaalbewerking (Metal Working)
  // -----------------------------------------------------------------------
  {
    slug: 'metaalbewerking',
    title: 'Metal Working & Machining',
    tagline: 'From raw stock to precision parts with full shop-floor control.',
    description:
      'Metal working companies -- from CNC machining shops to sheet metal fabricators and welding operations -- need tight control over machine utilisation, tool life, and material yields. TMS connects CNC machines directly to SAP Business One, captures production data at the spindle, and provides the scheduling intelligence to maximise throughput on high-value capital equipment.',
    challenges: [
      {
        title: 'Machine Utilisation',
        description:
          'CNC machines and laser cutters represent significant capital investment. MES monitors OEE in real time, while APS schedules jobs to maximise spindle hours and minimise idle time between setups.',
      },
      {
        title: 'Tool Life Management',
        description:
          'Worn or broken tooling causes scrap, rework, and machine damage. PDC tracks tool usage counts and MES monitors cutting parameters to trigger preventive tool changes before quality degrades.',
      },
      {
        title: 'Material Yield Optimisation',
        description:
          'Raw material costs in metal working can exceed 50% of part cost. PPS considers material nesting, remnant tracking, and cut optimisation to maximise yield from bar stock, plate, and sheet.',
      },
      {
        title: 'Complex Routing & Subcontracting',
        description:
          'Many metal parts require multiple operations across different machines and may include external processes like heat treatment or surface coating. PPS manages multi-step routings with subcontracting integration.',
      },
    ],
    relevantModules: ['pps', 'aps', 'mes', 'pdc', 'pdm', 'bi'],
    stats: [
      { value: '85%+', label: 'Machine Utilisation' },
      { value: '15%', label: 'Material Waste Reduction' },
      { value: '25%', label: 'Setup Time Improvement' },
      { value: 'Real-Time', label: 'OEE Monitoring' },
    ],
  },

  // -----------------------------------------------------------------------
  // 4. Elektronica (Electronics)
  // -----------------------------------------------------------------------
  {
    slug: 'elektronica',
    title: 'Electronics & Assembly',
    tagline: 'Manage complex BOMs, component traceability, and rapid product lifecycles.',
    description:
      'Electronics manufacturers deal with deep, multi-level BOMs, component obsolescence, strict RoHS/REACH compliance, and rapid product iteration cycles. TMS brings engineering, procurement, and production together with seamless BOM synchronisation, component traceability, and variant management tailored to electronics assembly within SAP Business One.',
    challenges: [
      {
        title: 'Deep Multi-Level BOMs',
        description:
          'Electronic assemblies contain hundreds of components across multiple sub-assembly levels. PDM synchronises BOMs from EPLAN and other ECAD tools directly into SAP Business One production structures.',
      },
      {
        title: 'Component Obsolescence',
        description:
          'Semiconductor shortages and end-of-life notices require rapid BOM revisions. PDM engineering change management ensures alternative components are qualified, approved, and rolled out systematically.',
      },
      {
        title: 'RoHS & REACH Compliance',
        description:
          'Regulatory compliance requires tracking substance content at the component level. QM maintains material declarations and links compliance certificates to items and batches via DMS.',
      },
      {
        title: 'Serial Number Traceability',
        description:
          'Every assembled PCB and finished unit must be traceable by serial number to its individual component batches. PDC captures serial-to-batch links during assembly for full genealogy reporting.',
      },
    ],
    relevantModules: ['pps', 'mes', 'pdm', 'qm', 'vc', 'dms', 'pdc'],
    stats: [
      { value: '500+', label: 'BOM Levels Supported' },
      { value: '100%', label: 'Serial Traceability' },
      { value: '60%', label: 'Faster ECN Processing' },
      { value: 'Zero', label: 'Compliance Gaps' },
    ],
  },
];

/** Retrieve a single industry by its URL slug. */
export function getIndustryBySlug(slug: string): IndustryData | undefined {
  return industries.find((i) => i.slug === slug);
}
