<template>
  <div
    v-if="maintenanceMode"
    class="fixed inset-0 bg-primary-500 w-full h-full z-50 flex items-center justify-center p-4 overflow-hidden"
  >
    <div class="absolute top-6"><UiVsfLogo /></div>
    <div class="bg-white rounded-lg shadow-lg max-w-2xl w-full p-8 text-center">
      <h2 class="text-3xl font-bold text-primary-700 mb-6">Bald geht's los!</h2>

      <div class="mb-8">
        <p class="text-lg mb-4 text-black">
          Unser neuer Online-Shop befindet sich gerade im Aufbau und ist bald für dich da. Wir arbeiten mit Hochdruck an
          den letzten Details, um dir ein tolles Einkaufserlebnis zu bieten.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch } from 'vue';

const config = useRuntimeConfig();
const maintenanceMode = config.public.maintenanceMode;

// Handle body scroll locking
const disableBodyScroll = () => {
  if (maintenanceMode) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

onMounted(() => {
  disableBodyScroll();
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

watch(
  () => maintenanceMode,
  (newVal) => {
    disableBodyScroll();
  },
);
</script>
