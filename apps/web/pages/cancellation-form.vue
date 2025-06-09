<template>
  <NuxtLayout name="default" :hasHero="false">
    <template v-slot:hero>
      <div class="relative flex flex-col justify-center min-h-[24rem] p-4 lg:p-8 text-white">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl xl:text-10xl font-black text-white uppercase after:block after:w-[2em] after:h-[0.1em] after:mt-4 after:ml-1.5 after:bg-secondary-500 [hyphens:auto]"
        >
          Widerrufsformular
        </h1>
      </div>
    </template>
    <section class="relative overflow-hidden text-white mx-12 py-8">
      <div class="relative container mx-auto px-4">
        <p class="py-2 mb-6">
          (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.
          Die mit (*) gekennzeichneten Angaben sind optional oder situationsabhängig.)
        </p>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <p class="font-semibold mb-2">Empfänger:</p>
            <p>American Sports Club Kiel e.V.</p>
            <p>Hasseldieksdammer Weg 165</p>
            <p>24114 Kiel</p>
            <p>
              E-Mail-Adresse:
              <a href="mailto:shop@baltic-hurricanes.de" class="text-secondary-500 hover:text-white"
                >shop@baltic-hurricanes.de</a
              >
            </p>
          </div>

          <div>
            <label for="contract_details" class="block mb-1 font-medium"
              >Hiermit widerrufe(n) ich/ wir (*) den von mir/ uns (*) abgeschlossenen Vertrag über den Kauf der
              folgenden Waren (*)/ die Erbringung der folgenden Dienstleistung (*):</label
            >
            <textarea
              id="contract_details"
              name="contract_details"
              rows="4"
              required
              class="w-full p-2.5 border rounded bg-gray-700 text-white border-gray-600 focus:ring-secondary-500 focus:border-secondary-500"
            ></textarea>
          </div>

          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label for="ordered_on" class="block mb-1 font-medium">Bestellt am (*):</label>
              <input
                type="text"
                id="ordered_on"
                name="ordered_on"
                placeholder="z.B. TT.MM.JJJJ oder Auftragsnummer"
                class="w-full p-2.5 border rounded bg-gray-700 text-white border-gray-600 focus:ring-secondary-500 focus:border-secondary-500"
              />
            </div>
            <div>
              <label for="received_on" class="block mb-1 font-medium">Erhalten am (*):</label>
              <input
                type="text"
                id="received_on"
                name="received_on"
                placeholder="z.B. TT.MM.JJJJ"
                class="w-full p-2.5 border rounded bg-gray-700 text-white border-gray-600 focus:ring-secondary-500 focus:border-secondary-500"
              />
            </div>
          </div>

          <div>
            <label for="consumer_name" class="block mb-1 font-medium">Name des/ der Verbraucher(s):</label>
            <input
              type="text"
              id="consumer_name"
              name="consumer_name"
              required
              class="w-full p-2.5 border rounded bg-gray-700 text-white border-gray-600 focus:ring-secondary-500 focus:border-secondary-500"
            />
          </div>

          <div>
            <label for="consumer_address" class="block mb-1 font-medium">Anschrift des/ der Verbraucher(s):</label>
            <textarea
              id="consumer_address"
              name="consumer_address"
              rows="3"
              required
              class="w-full p-2.5 border rounded bg-gray-700 text-white border-gray-600 focus:ring-secondary-500 focus:border-secondary-500"
            ></textarea>
          </div>

          <div>
            <label for="date" class="block mb-1 font-medium">Datum des Widerrufs:</label>
            <input
              type="date"
              id="date"
              name="date"
              required
              class="w-full p-2.5 border rounded bg-gray-700 text-white border-gray-600 focus:ring-secondary-500 focus:border-secondary-500"
            />
          </div>

          <p class="py-2 text-sm text-gray-400">
            Unterschrift des/ der Verbraucher(s) (nur bei postalischer Zusendung oder Fax).
          </p>
          <p class="py-2 text-sm text-gray-400">(*) Unzutreffendes streichen oder auslassen.</p>

          <button
            type="submit"
            class="text-white bg-secondary-500 hover:bg-secondary-600 focus:ring-4 focus:outline-none focus:ring-secondary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Widerruf per E-Mail senden
          </button>
        </form>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
useHead({
  title: 'Widerrufsformular',
});

definePageMeta({
  layout: false,
});

const handleSubmit = (event: Event) => {
  const form = event.target as HTMLFormElement;
  const formData = new FormData(form);

  const contract_details = formData.get('contract_details') as string;
  const ordered_on = formData.get('ordered_on') as string;
  const received_on = formData.get('received_on') as string;
  const consumer_name = formData.get('consumer_name') as string;
  const consumer_address = formData.get('consumer_address') as string;
  const date = formData.get('date') as string;

  const subject = 'Widerruf des Vertrags';
  let body = `Sehr geehrte Damen und Herren,\n\n`;
  body += `hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag über den Kauf der folgenden Waren/die Erbringung der folgenden Dienstleistung:\n${contract_details || '(Keine Angaben gemacht)'}\n\n`;
  body += `Bestellt am/Auftragsnummer: ${ordered_on || '(nicht angegeben)'}\n`;
  body += `Erhalten am: ${received_on || '(nicht angegeben)'}\n\n`;
  body += `Name des/der Verbraucher(s):\n${consumer_name || '(Keine Angaben gemacht)'}\n\n`;
  body += `Anschrift des/der Verbraucher(s):\n${consumer_address || '(Keine Angaben gemacht)'}\n\n`;
  body += `Datum des Widerrufs: ${date || '(Keine Angaben gemacht)'}\n\n`;
  body += `Mit freundlichen Grüßen,\n${consumer_name || ''}`;

  const mailtoLink = `mailto:shop@baltic-hurricanes.de?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  if (typeof window !== 'undefined') {
    window.location.href = mailtoLink;
  }
};
</script>

<style scoped>
a {
  color: #f47d30; /* theme secondary-500 */
  font-weight: bold;
}
a:hover {
  color: white;
}

/* Tailwind utility classes are primarily used for form styling. 
   Added focus styles directly in the template for brevity.
   Ensure your Tailwind config includes colors like secondary-500, secondary-600, gray-600, gray-700.
*/
input[type='date']::-webkit-calendar-picker-indicator {
  filter: invert(1); /* Makes the calendar icon visible on dark backgrounds */
}
</style>
