// https://nuxt.com/docs/api/configuration/nuxt-config
import type { UnocssNuxtOptions } from '@unocss/nuxt';

const unocssConfig: UnocssNuxtOptions = {
  components: true,
  attributify: true,
  icons: true,
  webFonts: { provider: 'google', fonts: { sans: 'Lato' } },
  shortcuts: {
    'bg-primary': 'bg-[#B42424]',
    'text-primary': 'text-[#B42424]',
    'text-carbon': 'text-[#2D2D2E]',
    'text-stone': 'text-[#555555]',
    'text-silver': 'text-[#A3A3A3]',
  },
};

export default unocssConfig;
