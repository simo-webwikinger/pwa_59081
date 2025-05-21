<template>
  <div>
    <label :for="'attribute-' + productAttributeGetters.getAttributeId(attribute)" class="leading-5 text-sm text-white">
      {{ productAttributeGetters.getAttributeName(attribute) }}
    </label>
    <div class="relative mb-4" ref="dropdownContainer">
      <!-- Custom select trigger -->
      <div
        class="bg-secondary-500 rounded-lg flex justify-between items-center px-4 py-3 cursor-pointer"
        :class="{ 'ring-2 ring-secondary-300': isOpen }"
        @click="toggleDropdown"
      >
        <span class="text-white">
          {{ selectedLabel || t('pleaseSelect') }}
        </span>
        <SfIconChevronRight
          class="text-white transition-transform duration-200"
          :class="isOpen ? 'rotate-[270deg]' : 'rotate-90'"
        />
      </div>

      <!-- Custom dropdown options -->
      <div
        v-if="isOpen"
        class="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto custom-dropdown"
      >
        <SfListItem
          v-for="item in productAttributeGetters.getAttributeValues(attribute)"
          :key="productAttributeGetters.getAttributeValueId(item)"
          :disabled="productAttributeGetters.isAttributeValueDisabled(item)"
          class="!py-3 !px-4 cursor-pointer text-black"
          :class="{
            'bg-secondary-500 text-white': productAttributeGetters.getAttributeValueId(item) === Number(value),
            'hover:bg-secondary-300': !productAttributeGetters.isAttributeValueDisabled(item),
          }"
          @click="
            selectOption(
              productAttributeGetters.getAttributeValueId(item),
              productAttributeGetters.getAttributeValueName(item),
            )
          "
        >
          {{ productAttributeGetters.getAttributeValueName(item) }}
        </SfListItem>
      </div>
    </div>
    <ErrorMessage as="span" name="selectedValue" class="flex text-negative-700 text-sm mt-2" />
  </div>
</template>

<script setup lang="ts">
import { SfListItem, SfIconChevronRight } from '@storefront-ui/vue';
import type { AttributeSelectProps } from '../types';
import { productAttributeGetters } from '@plentymarkets/shop-api';
import { number, object } from 'yup';
import { useForm, ErrorMessage } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/yup';
import { onClickOutside } from '@vueuse/core';

const { t } = useI18n();
const { attribute } = defineProps<AttributeSelectProps>();
const { updateValue, getValue } = useProductAttributes();
const { registerValidator, registerInvalidFields } = useValidatorAggregator('attributes');
const value = ref<string | undefined>(
  getValue(productAttributeGetters.getAttributeId(attribute))?.toString() ?? undefined,
);

// Custom dropdown functionality
const isOpen = ref(false);
const dropdownContainer = ref(null);
const selectedLabel = ref('');

// Close dropdown when clicking outside
onClickOutside(dropdownContainer, () => {
  isOpen.value = false;
});

// Toggle dropdown open/close
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Handle option selection
const selectOption = (optionValue: number, optionLabel: string) => {
  value.value = optionValue.toString();
  selectedLabel.value = optionLabel;
  isOpen.value = false;
  doUpdateValue(optionValue);
};

watch(
  () => getValue(productAttributeGetters.getAttributeId(attribute)),
  () => {
    const newValue = getValue(productAttributeGetters.getAttributeId(attribute));
    value.value = newValue?.toString() ?? undefined;

    // Update the selected label when value changes externally
    if (newValue !== undefined) {
      const selectedItem = productAttributeGetters
        .getAttributeValues(attribute)
        .find((item) => productAttributeGetters.getAttributeValueId(item) === newValue);
      if (selectedItem) {
        selectedLabel.value = productAttributeGetters.getAttributeValueName(selectedItem);
      }
    } else {
      selectedLabel.value = '';
    }
  },
  { immediate: true },
);

const validationSchema = toTypedSchema(
  object({
    selectedValue: number().required(t('errorMessages.requiredField')),
  }),
);

const { errors, defineField, validate, meta } = useForm({
  validationSchema: validationSchema,
});

registerValidator(validate);

const [selectedValue] = defineField('selectedValue');

const doUpdateValue = (value: number) => {
  updateValue(attribute.attributeId, value);
  selectedValue.value = getValue(attribute.attributeId);
};

const setValue = (value: string | undefined) => {
  selectedValue.value = value ? Number(value) : undefined;
};

setValue(value.value);

watch(
  () => value.value,
  () => {
    setValue(value.value);
  },
);

watch(
  () => meta.value,
  () => {
    registerInvalidFields(
      meta.value.valid,
      `prop-${productAttributeGetters.getAttributeId(attribute)}`,
      productAttributeGetters.getAttributeName(attribute),
    );
  },
);
</script>

<style scoped>
.custom-dropdown {
  animation: fadeDown 0.2s ease-out;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.custom-dropdown :deep(.sf-list-item:hover:not([aria-disabled='true'])) {
  background-color: #f8f8f8;
}

.custom-dropdown :deep(.sf-list-item.bg-secondary-500) {
  color: white;
}

.custom-dropdown :deep(.sf-list-item:hover:not([aria-disabled='true']).hover\:bg-secondary-100) {
  background-color: var(--tw-color-secondary-400);
}

/* Disabled item styling */
.custom-dropdown :deep(.sf-list-item[aria-disabled='true']) {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes fadeDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
