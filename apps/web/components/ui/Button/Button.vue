<template>
  <component
    :is="tagWithDefaults"
    :type="type"
    :disabled="disabled"
    :class="[
      'inline-flex items-center justify-center font-medium text-base focus-visible:outline focus-visible:outline-offset rounded-md disabled:text-slate-400 disabled:bg-disabled-300 disabled:shadow-none disabled:ring-0 disabled:cursor-not-allowed',
      sizeClasses,
      variantClasses[variant],
    ]"
    data-testid="button"
  >
    <slot v-if="$slots.prefix" name="prefix" />
    <slot />
    <slot v-if="$slots.suffix" name="suffix" />
  </component>
</template>

<script lang="ts" setup>
import { type ConcreteComponent } from 'vue';
import { useAttrsRef, SfButtonSize, SfButtonVariant } from '@storefront-ui/vue';

const props = defineProps({
  size: {
    type: String as PropType<`${SfButtonSize}`>,
    default: SfButtonSize.base,
  },
  variant: {
    type: String as PropType<`${SfButtonVariant}`>,
    default: SfButtonVariant.primary,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false,
  },
  tag: {
    type: [String, Object] as PropType<string | ConcreteComponent>,
    default: undefined,
  },
});

const { size, tag, square } = toRefs(props);

const sizeClasses = computed(() => {
  switch (size.value) {
    case SfButtonSize.sm: {
      return [square.value ? 'p-1.5' : 'leading-5 text-sm py-1.5 px-3', 'gap-1.5'];
    }
    case SfButtonSize.lg: {
      return [square.value ? 'p-4' : 'py-3 leading-6 px-6', 'gap-3'];
    }
    default: {
      return [square.value ? 'p-2' : 'py-2 leading-6 px-4', 'gap-2'];
    }
  }
});
const tagWithDefaults = computed(() => tag?.value || 'button');

const attrs = useAttrsRef();
const type = computed(
  () =>
    attrs.value.type ??
    (typeof tagWithDefaults.value === 'string' && tagWithDefaults.value.toLowerCase() === 'button'
      ? 'button'
      : undefined),
);
</script>
<script lang="ts">
export const variantClasses = {
  [SfButtonVariant.primary]:
    'text-white shadow hover:shadow-md active:shadow bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700 disabled:bg-disabled-300',
  [SfButtonVariant.secondary]:
    'text-white shadow hover:shadow-md active:shadow bg-secondary-600 hover:bg-secondary-700 active:bg-secondary-800 ring-1 ring-inset ring-secondary-400 hover:ring-secondary-500 active:ring-secondary-700 disabled:ring-1 disabled:ring-disabled-300 disabled:bg-disabled-300',
  [SfButtonVariant.tertiary]:
    'text-secondary-200 hover:bg-secondary-100 hover:text-secondary-800 active:bg-secondary-200 active:text-secondary-900 disabled:bg-transparent',
};
</script>
