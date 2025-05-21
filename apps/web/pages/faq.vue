<template>
  <NuxtLayout name="default" :hasHero="false">
    <template v-slot:hero>
      <!-- title -->
      <div class="relative flex flex-col justify-center min-h-[24rem] p-4 lg:p-8 text-white">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl xl:text-10xl font-black text-white uppercase after:block after:w-[2em] after:h-[0.1em] after:mt-4 after:ml-1.5 after:bg-secondary-500 [hyphens:auto]"
        >
          FAQ – Retoure
        </h1>
      </div>
    </template>

    <NarrowContainer class="py-12 bg-primary-900 text-white">
      <div class="max-w-4xl mx-auto px-4 lg:px-0">
        <div class="space-y-10">
          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">Kann ich Artikel retournieren?</h2>
            <div class="pl-8">
              <p class="mb-4 flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span
                  >Ja, grundsätzlich ist eine Retoure möglich. Bitte beachten Sie, dass die Rücksendekosten vom Kunden
                  zu tragen sind. Die retournierten Artikel müssen an folgende Adresse gesendet werden:</span
                >
              </p>
              <div class="pl-4 border-l-4 border-secondary-500 py-2 mb-6">
                <p>Skills Sports</p>
                <p>Buchenweg 31</p>
                <p>83544 Aalbaching</p>
              </div>
            </div>
          </div>

          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">Wohin schicke ich meine Retoure?</h2>
            <div class="pl-8">
              <p class="mb-4 flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span>Bitte senden Sie Ihre Rücksendung an:</span>
              </p>
              <div class="pl-4 border-l-4 border-secondary-500 py-2 mb-6">
                <p>Skills Sports</p>
                <p>Buchenweg 31</p>
                <p>83544 Aalbaching</p>
              </div>
              <p class="flex items-start">
                <span
                  >Achte bitte darauf, dass die Artikel unbenutzt, originalverpackt und innerhalb der Widerrufsfrist bei
                  uns eingehen.</span
                >
              </p>
            </div>
          </div>

          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">Wie kann ich im Fanshop bezahlen?</h2>
            <div class="pl-8">
              <p class="flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span>(z. B. PayPal, Kreditkarte, Klarna etc.) -> folgt</span>
              </p>
            </div>
          </div>

          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">Wie lange dauert der Versand?</h2>
            <div class="pl-8">
              <p class="flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span
                  >Ihre Bestellung wird innerhalb von 3 Werktagen bearbeitet und verpackt. Anschließend wird das Paket
                  an den Versanddienstleister übergeben. Die Versanddauer richtet sich nach dem jeweiligen Zusteller und
                  dem Lieferort.</span
                >
              </p>
            </div>
          </div>

          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">Mit welchem Dienstleister wird versendet?</h2>
            <div class="pl-8">
              <p class="flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span
                  >Wir versenden unsere Pakete mit verschiedenen Versanddienstleistern, darunter DHL, Hermes und
                  weitere. Der Versanddienstleister wird abhängig von der Versandadresse und Paketgröße automatisch
                  gewählt.</span
                >
              </p>
            </div>
          </div>

          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">Liefern Sie auch ins Ausland?</h2>
            <div class="pl-8">
              <p class="flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span
                  >Ja, eine Lieferung nach Österreich ist problemlos möglich. Die Versandkosten hierfür betragen 10 €.
                  Lieferungen in andere Länder sind auf Anfrage möglich – bitte kontaktieren Sie hierzu unseren
                  Kundenservice.</span
                >
              </p>
            </div>
          </div>

          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">
              Kann ich Trikots mit Wunschnummer bedrucken lassen?
            </h2>
            <div class="pl-8">
              <p class="flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span
                  >Individuelle Fanjersey-Bestellungen mit Wunschnummer bieten wir einmal jährlich an. Die nächste
                  Möglichkeit zur Bestellung besteht wieder im Jahr 2026.</span
                >
              </p>
            </div>
          </div>

          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">
              Kann ich online bestellen und die Artikel an einem Spieltag abholen?
            </h2>
            <div class="pl-8">
              <p class="flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span
                  >Nein, das ist aus logistischen Gründen leider nicht möglich. An Spieltagen liegt der Fokus auf dem
                  Veranstaltungsbetrieb, daher ist eine Abholung vor Ort nicht vorgesehen.</span
                >
              </p>
            </div>
          </div>

          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">
              Kann ich online bestellte Artikel an Spieltagen umtauschen/zurückgeben?
            </h2>
            <div class="pl-8">
              <p class="flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span
                  >Ja, das ist grundsätzlich möglich, solange die Artikel ungetragen und im Originalzustand sind. Bitte
                  geben Sie uns vorab telefonisch oder per E-Mail-Bescheid, damit wir den Umtausch oder die Rückgabe
                  entsprechend vorbereiten können.</span
                >
              </p>
            </div>
          </div>

          <!-- FAQ Item -->
          <div class="faq-item">
            <h2 class="text-2xl font-bold mb-3 text-secondary-500">Wie lange habe ich Zeit für eine Rücksendung?</h2>
            <div class="pl-8">
              <p class="flex items-start">
                <SfIconChevronRight class="mt-1 min-w-[20px] mr-2" />
                <span
                  >Die Rücksendung sollte spätestens 14 Tage nach Erhalt der Ware bei uns eingehen. Bitte senden Sie die
                  Artikel ungetragen und originalverpackt zurück.</span
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </NarrowContainer>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { SfIconChevronRight } from '@storefront-ui/vue';
definePageMeta({
  layout: false,
});

useHead({
  title: 'FAQ - Retoure | Kiel Baltic Hurricanes',
  meta: [
    {
      name: 'description',
      content: 'Häufig gestellte Fragen zu Retouren, Versand, und mehr für den Kiel Baltic Hurricanes Fanshop.',
    },
  ],
});
</script>

<style scoped>
.faq-item {
  transition: all 0.3s ease;
}

.faq-item:hover {
  transform: translateY(-3px);
}

a {
  color: #f47d30;
  font-weight: bold;
}
a:hover {
  color: white;
}
</style>
