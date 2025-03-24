<template>
  <SfAccordionItem v-model="internalModelValue" :summary-class="summaryClass" data-testid="accordion-item">
    <template #summary class="hover:bg-primary-500">
      <slot name="summary">
        <p>{{ summary }}</p>
      </slot>
      <SfIconChevronLeft :class="['text-primary-500', modelValue ? 'rotate-90' : '-rotate-90']" />
    </template>
    <div class="py-2 px-4">
      <slot />
    </div>
  </SfAccordionItem>
</template>

<script setup lang="ts">
import { SfAccordionItem, SfIconChevronLeft } from '@storefront-ui/vue';
import { useVModel } from '@vueuse/core';
import type { AccordionItemProps } from '~/components/ui/AccordionItem/types';

const props = defineProps<AccordionItemProps>();
const { modelValue = false, summary = '', summaryClass = '' } = props;
const emit = defineEmits(['update:modelValue']);

const internalModelValue = useVModel(props, 'modelValue', emit, { passive: true });
</script>
