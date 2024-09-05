import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    define: {
      'process.env': JSON.stringify(process.env),
    },
  },
});
