<template>
  <div class="text-sm py-1">
    <span class="mr-2 text-secondary-500 font-bold font-headings text-2xl" data-testid="price">
      {{ $n(price, 'currency') }}
      <span v-if="showNetPrices">{{ $t('asterisk') }} </span>
    </span>
    <span v-if="crossedPrice" class="text-base font-normal text-neutral-500 line-through">
      {{ $n(crossedPrice, 'currency') }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { PriceProps } from '~/components/Price/types';

defineProps<PriceProps>();

const { showNetPrices } = useCustomer();
</script>
