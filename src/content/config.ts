// ---------------------------------------------------------------------------
// Astro Content Collection Schemas
// Defines the frontmatter shape for markdown/MDX content in src/content/.
// ---------------------------------------------------------------------------

import { defineCollection, z } from 'astro:content';

// -------------------------------------------------------------------------
// Modules Collection
// Location: src/content/modules/*.mdx
// -------------------------------------------------------------------------
const modules = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    abbr: z.string(),
    tagline: z.string(),
    description: z.string(),
    icon: z.string(),
    featured: z.boolean().default(false),
    order: z.number(),
    ogImage: z.string().optional(),
    publishDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    relatedModules: z.array(z.string()).default([]),
  }),
});

// -------------------------------------------------------------------------
// Industries Collection
// Location: src/content/industries/*.mdx
// -------------------------------------------------------------------------
const industries = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    ogImage: z.string().optional(),
    relevantModules: z.array(z.string()).default([]),
    stats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .default([]),
  }),
});

// -------------------------------------------------------------------------
// Blog Collection
// Location: src/content/blog/*.mdx
// -------------------------------------------------------------------------
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    author: z.string(),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    ogImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    category: z
      .enum([
        'Product Update',
        'Industry Insight',
        'Best Practice',
        'Case Study',
        'Company News',
      ])
      .default('Industry Insight'),
    draft: z.boolean().default(false),
  }),
});

// -------------------------------------------------------------------------
// Cases (Customer Stories) Collection
// Location: src/content/cases/*.mdx
// -------------------------------------------------------------------------
const cases = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    company: z.string(),
    industry: z.string(),
    modules: z.array(z.string()).default([]),
    publishDate: z.coerce.date(),
    ogImage: z.string().optional(),
    stats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
        }),
      )
      .default([]),
    testimonialQuote: z.string().optional(),
    testimonialAuthor: z.string().optional(),
    testimonialRole: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

// -------------------------------------------------------------------------
// Export all collections
// -------------------------------------------------------------------------
export const collections = { modules, industries, blog, cases };
