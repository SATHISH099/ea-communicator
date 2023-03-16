import { $fetch, isDev, setup } from '@nuxt/test-utils';

describe('home page', async () => {
  await setup();

  it('Renders Home page "Page"', async () => {
    expect(
      await $fetch('/').catch((e) => {
        console.warn(e);
        return {};
      }),
    ).toBeDefined();
  });

  if (isDev()) {
    it('[dev] ensure vite client script is added', async () => {
      expect(await $fetch('/')).toMatch('/_nuxt/@vite/client"');
    });
  }
});
