import { describe, expect, it } from 'vitest';
import { $fetch, isDev, setup } from '@nuxt/test-utils';

describe('home page', async () => {
  await setup({
    // test context options
  });

  it('Renders Home page "Page"', async () => {
    expect(await $fetch('/')).toMatch('Page');
  });

  if (isDev()) {
    it('[dev] ensure vite client script is added', async () => {
      expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"');
    });
  }
});
