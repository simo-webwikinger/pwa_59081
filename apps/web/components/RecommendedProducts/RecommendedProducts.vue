<template>
  <p
    v-if="headline"
    data-testid="recommended-products-headline"
    class="mt-2 typography-headline-3 md:typography-headline-2 text-center text-white"
  >
    {{ headline }}
  </p>
  <ProductSlider v-if="products?.length" :items="products" />
</template>

<script setup lang="ts">
import type { RecommendedProductsProps } from '~/components/RecommendedProducts/types';

defineProps<RecommendedProductsProps>();
</script>
