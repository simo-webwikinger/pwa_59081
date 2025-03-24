<template>
  <NuxtLayout name="default" :hasHero="false">
    <template v-slot:hero>
      <!-- title -->
      <div class="relative flex flex-col justify-center min-h-[24rem] p-4 lg:p-8 text-white">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl xl:text-10xl font-black text-white uppercase after:block after:w-[2em] after:h-[0.1em] after:mt-4 after:ml-1.5 after:bg-secondary-500 [hyphens:auto]"
        >
          Impressum
        </h1>
        <p class="py-4">Angaben nach §6 Teledienstgesetz und Medienstaatsvertrag</p>
      </div>
    </template>
    <section class="relative overflow-hidden text-white">
      <div class="relative container mx-auto px-4">
        <h2 class="rich-text uppercase">Geschäftsstelle</h2>
        <div>
          <div>
            <div class="*:py-2">
              <p><strong>American&nbsp;Sports Club Kiel e.V.</strong><br />Hasseldieksdammer Weg 165<br />24114 Kiel</p>
              <p>Tel: +49 (0) 431 - 979 976 12&nbsp;<br />Fax: +49 (0) 431 - 5303 9760</p>
              <p>
                Vereinsregister:&nbsp;VR3280KI<br />USt. Ident Nr.: DE167312522<br />Vorstand: Irene Nagel, Marc
                Lötzerich, Oliver Riemer, Michael Frey Jr.
              </p>
              <p>
                Kontakt Geschäftsstelle:
                <a href="javascript:linkTo_UnCryptMailto('diajUwvgodx2cpmmdxvizn3yz', -21)"
                  >info (at) baltic-hurricanes.de</a
                >
              </p>
              <p>
                <br /><strong>Webmaster</strong><br />E-Mail:
                <a href="javascript:linkTo_UnCryptMailto('tbyqbxjWyxiqfz4eroofzxkbp5ab', -23)"
                  >webteam (at) baltic-hurricanes.de</a
                >
              </p>
            </div>
          </div>
        </div>
        <div class="mt-8 px-4 text-right"></div>
      </div>
    </section>

    <section class="relative overflow-hidden z-10 my-8 text-white">
      <div class="relative container mx-auto px-4">
        <h2 class="rich-text uppercase">Design, Neos-Administration &amp; Hosting</h2>
        <div>
          <div class="*:p-2">
            <p><strong>networkteam GmbH</strong></p>
            <p>
              Email:
              <a href="javascript:linkTo_UnCryptMailto('bgyhSgxmphkdmxtf1vhf', -19)">info (at) networkteam.com</a
              ><br />Internet:
              <a
                rel="noopener"
                href="https://networkteam.com"
                target="_blank"
                title="TYPO3 Webprojekte in Kiel und Hamburg"
                >https://networkteam.com</a
              >
            </p>
          </div>
        </div>
        <div class="mt-8 px-4 text-right"></div>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: 'Impressum',
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
