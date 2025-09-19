import { z } from 'zod';

export const ThemeSchema = z.object({
  colors: z.object({
    primary: z.string().default('#3B82F6'),
    bg: z.string().default('#ffffff'),
    text: z.string().default('#0f172a'),
  }),
  font: z.object({
    family: z.string().default('Inter, Arial, Helvetica, sans-serif'),
    baseSize: z.number().int().min(12).max(20).default(16)
  })
});

export const AttrsSchema = z.record(z.any());

const BaseBlock = z.object({
  id: z.string().uuid().optional(),
  type: z.string(),
  attrs: AttrsSchema.optional(),
  children: z.lazy(() => BlockArray).optional()
});

export const EmailBlock = BaseBlock.extend({
  type: z.literal('Email'),
  meta: z.object({ darkMode: z.boolean().default(false), locale: z.string().default('en') }).optional(),
  theme: ThemeSchema
});

export const SectionBlock = BaseBlock.extend({
  type: z.literal('Section'),
});

export const ContainerBlock = BaseBlock.extend({
  type: z.literal('Container'),
});

export const HeadingBlock = BaseBlock.extend({
  type: z.literal('Heading'),
  attrs: z.object({
    level: z.number().int().min(1).max(3).default(1),
    text: z.string().default('Heading'),
    align: z.enum(['left','center','right']).default('left')
  })
});

export const TextBlock = BaseBlock.extend({
  type: z.literal('Text'),
  attrs: z.object({
    html: z.string().default('Your text here'),
    align: z.enum(['left','center','right']).default('left')
  })
});

export const ButtonBlock = BaseBlock.extend({
  type: z.literal('Button'),
  attrs: z.object({
    text: z.string().default('Click me'),
    url: z.string().default('#'),
    align: z.enum(['left','center','right']).default('left')
  })
});

export const ImageBlock = BaseBlock.extend({
  type: z.literal('Image'),
  attrs: z.object({
    src: z.string().default(''),
    width: z.number().int().min(16).max(1200).default(120),
    align: z.enum(['left','center','right']).default('left'),
    alt: z.string().default('')
  })
});

export const Block = z.union([EmailBlock, SectionBlock, ContainerBlock, HeadingBlock, TextBlock, ButtonBlock, ImageBlock]);
export type AnyBlock = z.infer<typeof Block>;

export const BlockArray = z.array(Block);

export const EmailDSL = EmailBlock;
export type EmailDSL = z.infer<typeof EmailDSL>;

export const DEFAULT_THEME: EmailDSL['theme'] = {
  colors: { primary: '#3B82F6', bg: '#ffffff', text: '#0f172a' },
  font: { family: 'Inter, Arial, Helvetica, sans-serif', baseSize: 16 }
};
