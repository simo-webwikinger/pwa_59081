<template>
  <div class="w-full md:max-w-[376px]" data-testid="category-sorting">
    <h6
      class="bg-secondary-500 mb-4 px-4 py-2 rounded uppercase typography-headline-6 font-bold tracking-widest select-none"
    >
      {{ $t('sortBy') }}
    </h6>
    <div class="px-4">
      <SfSelect
        v-model="selected"
        :aria-label="$t('sortBy')"
        id="sortBy"
        @change="sortingChanged"
        class="text-white [&>option]:!bg-primary-100 [&>option:hover]:!bg-primary-500 ring-primary-500 focus:ring-primary-500 focus:border-primary-500 hover:!ring-primary-300"
      >
        <option
          v-for="{ value, label } in options"
          :key="value"
          :value="value"
          class="!text-black !bg-primary-100 hover:!bg-primary-500 active:!bg-primary-500 focus:!bg-primary-500"
        >
          {{ $t(`sortType.${label}`) }}
        </option>
      </SfSelect>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';
import { SfSelect } from '@storefront-ui/vue';

const { getFacetsFromURL, updateSorting } = useCategoryFilter();
const route = useRoute();
const options = ref([
  {
    label: 'nameA-Z',
    value: 'texts.name1_asc',
  },
  {
    label: 'nameZ-A',
    value: 'texts.name1_desc',
  },
  {
    label: 'priceUp',
    value: 'sorting.price.avg_asc',
  },
  {
    label: 'priceDown',
    value: 'sorting.price.avg_desc',
  },
  {
    label: 'reviewsUp',
    value: 'item.feedbackDecimal_asc',
  },
  {
    label: 'reviewsDown',
    value: 'item.feedbackDecimal_desc',
  },
]);
const selected = ref(options.value[0].value);

function sortingChanged() {
  updateSorting(selected.value);
}

function sortQueryChanged() {
  const facets = getFacetsFromURL();
  selected.value = facets.sort ?? options.value[0].value;
}

sortQueryChanged();

watch(
  () => route.query.sort,
  () => {
    sortQueryChanged();
  },
);
</script>
