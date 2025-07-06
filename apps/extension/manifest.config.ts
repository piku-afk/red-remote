import { defineManifest } from '@crxjs/vite-plugin';

import packageJson from '../../package.json';

export default defineManifest({
  manifest_version: 3,
  name: 'Red Remote',
  version: packageJson.version,
  permissions: ['activeTab', 'storage'],
  icons: {
    32: 'public/icons/inactive-icon-32.png',
  },
  action: {
    default_popup: 'src/popup/index.html',
  },
});
