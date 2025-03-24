<template>
  <div>
    <UiToolbar v-if="isPreview" />
    <UiHeader :hasHero="hasHero">
      <slot name="hero"></slot>
    </UiHeader>
    <NarrowContainer v-if="breadcrumbs?.length" class="p-4 md:pb-7 md:px-0 bg-primary-900">
      <LazyUiBreadcrumbs :breadcrumbs="breadcrumbs" />
    </NarrowContainer>
    <main class="bg-primary-900">
      <slot />
    </main>
    <UiNavbarBottom v-if="viewport.isLessThan('lg')" class="z-20" />
    <Cookiebar />
    <PreviewMode />
    <NuxtLazyHydrate when-visible>
      <UiFooter />
    </NuxtLazyHydrate>

    <QuickCheckout v-if="isOpen" :product="product" />
  </div>
</template>

<script setup lang="ts">
import { DefaultLayoutProps } from '~/layouts/types';
defineProps<DefaultLayoutProps>();
const { setLogoMeta } = useStructuredData();
const { isOpen, product } = useQuickCheckout();
const viewport = useViewport();
setLogoMeta();
const isPreview = ref(false);
onMounted(() => {
  const config = useRuntimeConfig().public;
  const showConfigurationDrawer = config.showConfigurationDrawer;

  const pwaCookie = useCookie('pwa');
  isPreview.value = !!pwaCookie.value || (showConfigurationDrawer as boolean);
});
</script>
