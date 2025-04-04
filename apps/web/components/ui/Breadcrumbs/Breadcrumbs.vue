<template>
  <nav data-testid="breadcrumbs" class="inline-flex items-center text-sm font-normal">
    <ol class="flex w-auto leading-none group md:flex-wrap">
      <li class="flex items-center sm:hidden text-white z-10">
        <NuxtLazyHydrate :on-interaction="['click', 'touchstart']">
          <SfDropdown v-model="dropdownOpened" strategy="absolute" placement="bottom-start" @update:model-value="close">
            <template #trigger>
              <UiButton
                class="relative w-5 h-5 !p-0 rounded-sm outline-secondary-600 hover:bg-transparent active:bg-transparent"
                :aria-label="$t('breadcrumbsDropdownText')"
                variant="tertiary"
                square
                @click="toggle"
                data-testid="breadcrumbs-dropdown-button"
              >
                <template #prefix>
                  <SfIconMoreHoriz
                    size="sm"
                    class="text-white hover:text-secondary-500 active:text-secondary-800 active:bg-transparent"
                  />
                </template>
              </UiButton>
            </template>
            <ol
              class="px-4 py-2 rounded-md text-primary-900 shadow-md border-neutral-100 bg-white"
              data-testid="breadcrumbs-dropdown"
            >
              <li v-for="item in breadcrumbs" :key="item.name" class="py-2 last-of-type:hidden">
                <SfLink
                  :tag="NuxtLink"
                  :to="localePath(item.link)"
                  variant="secondary"
                  class="leading-5 no-underline text-inherit hover:underline active:underline whitespace-nowrap outline-secondary-600"
                >
                  {{ item.name }}
                </SfLink>
              </li>
            </ol>
          </SfDropdown>
        </NuxtLazyHydrate>
      </li>
      <li
        v-for="(item, index) in breadcrumbs"
        :key="item.name"
        class="peer hidden sm:flex items-center peer-[:nth-of-type(even)]:before:content-['/'] peer-[:nth-of-type(even)]:before:px-2 peer-[:nth-of-type(even)]:before:leading-5 last-of-type:flex last-of-type:before:font-normal last-of-type:before:text-secondary-500 text-white last-of-type:text-secondary-500 last-of-type:font-medium"
      >
        <SfLink
          v-if="index < breadcrumbs.length - 1"
          :tag="NuxtLink"
          :to="localePath(item.link)"
          variant="secondary"
          class="leading-5 no-underline hover:underline hover:text-secondary-500 active:underline whitespace-nowrap text-inherit"
        >
          {{ item.name }}
        </SfLink>
        <span v-else>
          {{ item.name }}
        </span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { SfDropdown, SfLink, SfIconMoreHoriz } from '@storefront-ui/vue';
import type { BreadcrumbsProps } from '~/components/ui/Breadcrumbs/types';

defineProps<BreadcrumbsProps>();

const localePath = useLocalePath();

const dropdownOpened = ref(false);
const close = () => {
  dropdownOpened.value = false;
};
const toggle = () => {
  dropdownOpened.value = !dropdownOpened.value;
};

const NuxtLink = resolveComponent('NuxtLink');
const route = useRoute();
const items = route.path.split('/');
let itemListElement = [] as Array<any>;
let name = '';
items.forEach((item, index) => {
  name += item;
  if (index === 0) {
    itemListElement.push({
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': '/',
        name: 'Home',
      },
    });
  } else {
    itemListElement.push({
      '@type': 'ListItem',
      position: index,
      item: {
        '@id': `/${name}/`,
        name: `${item}`,
      },
    });
  }
});

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement,
};
useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(structuredData),
    },
  ],
});
</script>
