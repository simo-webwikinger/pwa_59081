// terms of use
<template>
  <NuxtLayout name="default" :hasHero="false">
    <template v-slot:hero>
      <!-- title -->
      <div class="relative flex flex-col justify-center min-h-[24rem] p-4 lg:p-8 text-white">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl xl:text-10xl font-black text-white uppercase after:block after:w-[2em] after:h-[0.1em] after:mt-4 after:ml-1.5 after:bg-secondary-500 [hyphens:auto]"
        >
          Nutzungsbedingungen
        </h1>
        <div class="max-w-5xl mt-8">
          Alle Rechte, insbesondere das Recht der Vervielfältigung und Verbreitung sowie der Übersetzung, sind
          vorbehalten.<br /><br />Kein Teil des Werks darf in irgendeiner Form (durch Fotokopie, Mikrofilm oder ein
          anderes Verfahren) ohne schriftliche Genehmigung der Autoren reproduziert oder unter Verwendung elektronischer
          Medien verarbeitet, vervielfältigt oder verbreitet werden.
        </div>
      </div>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: 'Nutzungsbedingungen',
});
</script>
<style scoped>
a {
  color: #f47d30;
  font-weight: bold;
}
a:hover {
  color: white;
}
</style>
