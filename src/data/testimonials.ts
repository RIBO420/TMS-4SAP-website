// ---------------------------------------------------------------------------
// TMS Customer Testimonials
// Fictional but realistic quotes from manufacturing decision-makers.
// All company names are invented and do not represent real organisations.
// ---------------------------------------------------------------------------

export interface TestimonialData {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  industry: string;
  /** Optional slug reference to a relevant module. */
  highlightedModule?: string;
}

export const testimonials: TestimonialData[] = [
  {
    id: 'testimonial-1',
    quote:
      'Before TMS, our planners spent half their day in Excel trying to match capacity to demand. With PPS and APS we now run a fully automated overnight schedule that accounts for every constraint on the shop floor. Lead times dropped by 28% in the first quarter.',
    author: 'Martijn de Vries',
    role: 'Operations Director',
    company: 'Kuijpers Precision Parts',
    industry: 'Metal Working',
    highlightedModule: 'aps',
  },
  {
    id: 'testimonial-2',
    quote:
      'Our IATF auditor was impressed by the level of traceability we achieved with QM. Multi-level batch tracing, SPC charts linked to production orders, and 8D workflows all in one system -- it transformed our quality department from reactive to proactive.',
    author: 'Sarah Berkhout',
    role: 'Quality Manager',
    company: 'Van Doorn Automotive Components',
    industry: 'Automotive',
    highlightedModule: 'qm',
  },
  {
    id: 'testimonial-3',
    quote:
      'We run 24 injection moulding machines across three shifts. MES gives us real-time OEE on every press, and PDC captures cycle data without operators touching a keyboard. We identified 340 hours of hidden downtime in the first month alone.',
    author: 'Thomas Bakker',
    role: 'Plant Manager',
    company: 'PolyForm Industries',
    industry: 'Plastics',
    highlightedModule: 'mes',
  },
  {
    id: 'testimonial-4',
    quote:
      'Managing engineering changes between SOLIDWORKS and SAP used to take our team two days per ECN. With PDM the BOM synchronisation is automatic, and the approval workflow ensures nothing reaches the shop floor without sign-off. We process ECNs in under four hours now.',
    author: 'Lieke Jansen',
    role: 'Engineering Manager',
    company: 'TechAssembly Europe',
    industry: 'Electronics',
    highlightedModule: 'pdm',
  },
  {
    id: 'testimonial-5',
    quote:
      'The Variant Configurator changed how we sell. Our sales team can configure complex machine frames with hundreds of options and get an accurate price and delivery date in minutes instead of waiting three days for engineering to quote. Order intake doubled within six months.',
    author: 'Pieter Hendriks',
    role: 'Commercial Director',
    company: 'Rijnstaal Machinebouw',
    industry: 'Metal Working',
    highlightedModule: 'vc',
  },
  {
    id: 'testimonial-6',
    quote:
      'BI dashboards on the management floor show us exactly where we stand every morning -- production output, scrap rates, delivery performance, all live. We no longer wait until month-end to discover problems. The data is there when we need it.',
    author: 'Anneke Vermeulen',
    role: 'Managing Director',
    company: 'Brabant Electronics Group',
    industry: 'Electronics',
    highlightedModule: 'bi',
  },
];
