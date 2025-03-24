<template>
  <div
    v-if="showComponent"
    :class="[
      'flex flex-col md:flex-row items-center justify-center !bg-[#e5e5e5] lg:px-22 md:px-14 md:py-8',
      positionClass,
    ]"
  >
    <div v-if="image && image.trim() !== ''" :class="['w-full h-[400px]', 'md:w-1/3', { 'mb-4': text }]">
      <img :src="image" :alt="alt" width="400" height="400" class="w-full h-[400px] object-contain !brightness-90" />
    </div>

    <div v-if="text && text.trim() !== ''" :class="['w-full no-preflight p-5', textWidthClass]" v-html="text"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  image: {
    type: String,
    default: null,
  },
  alt: {
    type: String,
    default: null,
  },
  text: {
    type: String,
    default: null,
  },
  alignment: {
    type: String,
    default: 'left',
    validator: (value: string) => ['left', 'right'].includes(value),
  },
});

const showComponent = computed(() => {
  return (props.image && props.image.trim() !== '') || (props.text && props.text.trim() !== '');
});

const textWidthClass = computed(() => {
  return !props.image || props.image.trim() === '' ? 'w-full' : 'md:w-1/2';
});

const positionClass = computed(() => (props.alignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'));
</script>
