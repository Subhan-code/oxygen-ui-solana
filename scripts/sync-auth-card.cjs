const fs = require('fs');

const content = fs.readFileSync('components/ui/auth-card.tsx', 'utf8');
const json = {
  $schema: 'https://ui.shadcn.com/schema/registry-item.json',
  name: 'auth-card',
  title: 'Auth Card',
  description: 'Apple-styled sign-in card for Oxygen UI with social and email authentication.',
  dependencies: [],
  registryDependencies: ['utils'],
  files: [
    {
      path: 'components/ui/auth-card.tsx',
      content,
      type: 'registry:ui',
    },
  ],
  type: 'registry:ui',
};

fs.writeFileSync('public/r/auth-card.json', JSON.stringify(json, null, 2));
console.log('Successfully updated public/r/auth-card.json');
