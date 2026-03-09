// ---------------------------------------------------------------------------
// TMS Client Companies
// Fictional company names for the logo carousel / trust bar.
// These do not represent real organisations.
// ---------------------------------------------------------------------------

export interface ClientData {
  name: string;
  /** Industry tag for optional filtering. */
  industry: string;
}

export const clients: ClientData[] = [
  {
    name: 'Kuijpers Precision Parts',
    industry: 'Metal Working',
  },
  {
    name: 'Van Doorn Automotive',
    industry: 'Automotive',
  },
  {
    name: 'PolyForm Industries',
    industry: 'Plastics',
  },
  {
    name: 'TechAssembly Europe',
    industry: 'Electronics',
  },
  {
    name: 'Rijnstaal Machinebouw',
    industry: 'Metal Working',
  },
  {
    name: 'Brabant Electronics Group',
    industry: 'Electronics',
  },
  {
    name: 'Kempen Kunststoftechniek',
    industry: 'Plastics',
  },
  {
    name: 'Maas Automotive Systems',
    industry: 'Automotive',
  },
  {
    name: 'Holland Sheet Metal',
    industry: 'Metal Working',
  },
  {
    name: 'Deltaflow Extrusions',
    industry: 'Plastics',
  },
];
