<template>
  <NuxtLayout name="default" :hasHero="false">
    <template v-slot:hero>
      <!-- title -->
      <div class="relative flex flex-col justify-center min-h-[24rem] p-4 lg:p-8 text-white">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl xl:text-10xl font-black text-white uppercase after:block after:w-[2em] after:h-[0.1em] after:mt-4 after:ml-1.5 after:bg-secondary-500 [hyphens:auto]"
        >
          Widerrufsrecht
        </h1>
        <p class="py-4">Widerrufsrecht für den Verkauf von Waren</p>
      </div>
    </template>
    <section class="relative overflow-hidden text-white mx-12 py-8">
      <div class="relative container mx-auto px-4">
        <h3 class="rich-text text-secondary-500 uppercase font-semibold text-2xl mt-6 mb-3">
          Widerrufsrecht für Verbraucher
        </h3>
        <p class="py-2">
          (Verbraucher ist jede natürliche Person, die ein Rechtsgeschäft zu Zwecken abschließt, die überwiegend weder
          ihrer gewerblichen noch ihrer selbstständigen beruflichen Tätigkeit zugerechnet werden können.)
        </p>

        <h2 class="rich-text uppercase mt-8 mb-4">Widerrufsbelehrung</h2>

        <h3 class="font-bold text-xl mt-6 text-secondary-500 mb-3">Widerrufsrecht</h3>
        <p class="py-2">Sie haben das Recht, binnen 14 Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.</p>
        <p class="py-2">Die Widerrufsfrist beträgt 14 Tage ab dem Tag,</p>

        <p class="py-1 pl-4">
          - an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen
          haben bzw. hat, sofern Sie eine oder mehrere Waren im Rahmen einer einheitlichen Bestellung bestellt haben und
          diese einheitlich geliefert wird bzw. werden;
        </p>
        <p class="py-1 pl-4">
          - an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Ware in Besitz
          genommen haben bzw. hat, sofern Sie mehrere Waren im Rahmen einer einheitlichen Bestellung bestellt haben und
          diese getrennt geliefert werden;
        </p>
        <p class="py-1 pl-4">
          - an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die letzte Teilsendung oder
          das letzte Stück in Besitz genommen haben bzw. hat, sofern Sie eine Ware bestellt haben, die in mehreren
          Teilsendungen oder Stücken geliefert wird;
        </p>

        <p class="py-2">
          Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (American Sports Club Kiel e.V., Hasseldieksdammer Weg 165,
          24114 Kiel, Telefonnr.: Tel: +49 (0) 431 - 979 976 12 , E-Mail-Adresse: shop@baltic-hurricanes.de) mittels
          einer eindeutigen Erklärung (z.B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss,
          diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden,
          das jedoch nicht vorgeschrieben ist.
        </p>
        <p class="py-2">
          Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts
          vor Ablauf der Widerrufsfrist absenden.
        </p>

        <h3 class="font-bold text-xl mt-6 mb-3 text-secondary-500">Folgen des Widerrufs</h3>
        <p class="py-2">
          Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben,
          einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine
          andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich
          und spätestens binnen 14 Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses
          Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
          ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes
          vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
        </p>
        <p class="py-2">
          Wir können die Rückzahlung für paketversandfähige Waren verweigern, bis wir diese Waren wieder zurückerhalten
          haben oder bis Sie den Nachweis erbracht haben, dass Sie diese Waren zurückgesandt haben, je nachdem, welches
          der frühere Zeitpunkt ist.
        </p>
        <p class="py-2">Wir holen die nicht paketversandfähigen Waren ab.</p>
        <p class="py-2">
          Sie haben die paketversandfähigen Waren unverzüglich und in jedem Fall spätestens binnen 14 Tagen ab dem Tag,
          an dem Sie uns über den Widerruf dieses Vertrags unterrichten, an uns zurückzusenden oder zu übergeben. Die
          Frist ist gewahrt, wenn Sie die paketversandfähigen Waren vor Ablauf der Frist von 14 Tagen absenden.
        </p>
        <p class="py-2">Wir tragen die Kosten der Rücksendung der Waren.</p>
        <p class="py-2">
          Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur
          Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit ihnen
          zurückzuführen ist.
        </p>

        <h3 class="font-bold text-xl mt-6 mb-3 text-secondary-500">Ausschluss- bzw. Erlöschensgründe</h3>
        <p class="py-2">Das Widerrufsrecht besteht nicht bei Verträgen</p>
        <p class="py-1 pl-4">
          - zur Lieferung von Waren, die nicht vorgefertigt sind und für deren Herstellung eine individuelle Auswahl
          oder Bestimmung durch den Verbraucher maßgeblich ist oder die eindeutig auf die persönlichen Bedürfnisse des
          Verbrauchers zugeschnitten sind;
        </p>
        <p class="py-1 pl-4">
          - zur Lieferung von Waren, die schnell verderben können oder deren Verfallsdatum schnell überschritten würde;
        </p>
        <p class="py-1 pl-4">
          - zur Lieferung alkoholischer Getränke, deren Preis bei Vertragsschluss vereinbart wurde, die aber frühestens
          30 Tage nach Vertragsschluss geliefert werden können und deren aktueller Wert von Schwankungen auf dem Markt
          abhängt, auf die der Unternehmer keinen Einfluss hat;
        </p>
        <p class="py-1 pl-4">
          - zur Lieferung von Zeitungen, Zeitschriften oder Illustrierten mit Ausnahme von Abonnement-Verträgen.
        </p>

        <p class="py-2">Das Widerrufsrecht erlischt vorzeitig bei Verträgen</p>
        <p class="py-1 pl-4">
          - zur Lieferung versiegelter Waren, die aus Gründen des Gesundheitsschutzes oder der Hygiene nicht zur
          Rückgabe geeignet sind, wenn ihre Versiegelung nach der Lieferung entfernt wurde;
        </p>
        <p class="py-1 pl-4">
          - zur Lieferung von Waren, wenn diese nach der Lieferung aufgrund ihrer Beschaffenheit untrennbar mit anderen
          Gütern vermischt wurden;
        </p>
        <p class="py-1 pl-4">
          - zur Lieferung von Ton- oder Videoaufnahmen oder Computersoftware in einer versiegelten Packung, wenn die
          Versiegelung nach der Lieferung entfernt wurde.
        </p>

        <h2 class="rich-text uppercase mt-8 mb-4 text-primary-300">Muster-Widerrufsformular</h2>
        <p class="py-2">
          Wenn Sie den Vertrag widerrufen wollen, können Sie dafür unser Online-Widerrufsformular nutzen. Die Verwendung
          des Formulars ist nicht vorgeschrieben.
        </p>
        <NuxtLink
          to="/cancellation-form"
          class="!text-white bg-secondary-500 hover:bg-secondary-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-block my-2"
        >
          Zum Online-Widerrufsformular
        </NuxtLink>
        <p class="py-2 mt-2">
          Sie können uns Ihren Widerruf auch per Post oder E-Mail unter Verwendung einer eindeutigen Erklärung zukommen
          lassen, in der Sie uns über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
        </p>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

useHead({
  title: 'Widerrufsrecht',
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
