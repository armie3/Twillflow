import { EmailDSL, DEFAULT_THEME } from './schema';

export const EXAMPLE_WELCOME_EMAIL: EmailDSL = {
  type: 'Email',
  theme: DEFAULT_THEME,
  body: [
    {
      type: 'Section',
      attrs: { paddingY: 24, bg: 'bg' },
      children: [
        {
          type: 'Container',
          attrs: { maxWidth: 600 },
          children: [
            { type: 'Text', attrs: { html: '<strong>Brand Logo</strong>', align: 'left' } },
            { type: 'Heading', attrs: { level: 1, text: 'Welcome to {{brand.name}}', align: 'left' } },
            { type: 'Text', attrs: { html: 'We\'re excited to have you on board. Get started below.', align: 'left' } },
            { type: 'Button', attrs: { text: 'Get started', url: '{{cta.url}}', align: 'left' } }
          ]
        }
      ]
    }
  ]
} as any;
