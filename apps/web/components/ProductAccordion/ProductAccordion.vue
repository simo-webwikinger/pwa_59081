<template>
  <div data-testid="product-accordion">
    <UiAccordionItem
      v-if="productGetters.getDescription(product)?.length"
      summary-class="md:rounded-md w-full hover:bg-primary-500 py-2 pl-4 pr-3 flex justify-between items-center select-none"
      v-model="productDetailsOpen"
    >
      <template #summary>
        <h2 class="font-bold font-headings text-lg leading-6 md:text-2xl">
          {{ $t('productDetails') }}
        </h2>
      </template>
      <div class="no-preflight" v-html="productGetters.getDescription(product)"></div>
    </UiAccordionItem>
    <UiDivider v-if="productDetailsOpen && productGetters.getDescription(product)?.length" class="mb-2 mt-2" />
    <UiAccordionItem
      v-if="productGetters.getTechnicalData(product)?.length"
      summary-class="md:rounded-md w-full hover:bg-primary-500 py-2 pl-4 pr-3 flex justify-between items-center select-none"
      v-model="technicalDataOpen"
    >
      <template #summary>
        <h2 class="font-bold font-headings text-lg leading-6 md:text-2xl">
          {{ $t('technicalData') }}
        </h2>
      </template>
      <div class="no-preflight" v-html="productGetters.getTechnicalData(product)"></div>
    </UiAccordionItem>
    <UiDivider v-if="technicalDataOpen && productGetters.getTechnicalData(product)?.length" class="mb-2 mt-2" />
  </div>
</template>

<script setup lang="ts">
import { productGetters } from '@plentymarkets/shop-api';
import type { ProductAccordionPropsType } from '~/components/ProductAccordion/types';

const props = defineProps<ProductAccordionPropsType>();

const { product } = toRefs(props);

const productDetailsOpen = ref(true);
const technicalDataOpen = ref(false);
</script>
