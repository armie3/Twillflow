export type Industry = 'Software & Media' | 'E-Commerce' | 'Physical Business' | 'Professional Services' | 'Other Businesses';

export interface OrgInput {
  name: string;
  industry: Industry;
}

export interface BrandInput {
  website?: string;
  logo_url?: string;
  primary_color?: string;
  font_family?: string;
}
