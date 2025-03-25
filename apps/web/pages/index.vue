<template>
  <NuxtLayout name="default" :hasHero="true">
    <template v-slot:hero>
      <div class="absolute w-full max-w-7xl h-full mask-header-image lg:pr-32 xl:w-3/4">
        <img src="/images/hero_lo_angel.avif"
          sizes="(min-width: 1280px) 1200px, (min-width: 576px) 100vw, 575px"
          alt="hero image"
          width="400"
          height="400"
          class="min-w-full min-h-full object-cover object-[75%_0%] lg:object-contain lg:object-right-bottom"/>
      </div>
      <h1
        class="absolute bottom-20 right-4 text-5xl font-black text-white uppercase after:block after:w-[2em] after:h-[0.1em] after:mt-4 after:ml-1.5 after:bg-secondary-500 sm:text-7xl md:text-8xl lg:bottom-32 lg:text-9xl lg:right-8 3xl:bottom-44 3xl:text-10xl"
      >
        <span class="block [text-shadow:0_0_25px_rgba(0,0,0,0.3)]">Kiel</span
        ><span class="block [text-shadow:0_0_25px_rgba(0,0,0,0.3)]">Baltic</span
        ><span class="block [text-shadow:0_0_25px_rgba(0,0,0,0.3)]">Hurricanes</span>
      </h1>
    </template>
    <div class="text-black">
      <UiMediaCard
        :image="'/images/Cap_Flexfit_orange_front.png'"
        :alt="'Flexfit Cap Hurricanes'"
        :text="mediacardtext"
        :alignment="'right'"
      />
      <EmptyBlock v-if="dataIsEmpty" @add-new-block="addNewBlock(0, 1)"></EmptyBlock>
      <Editor
        v-if="isEditing && currentBlockIndex !== null"
        :index="currentBlockIndex"
        :block="currentBlock"
        @update="updateBlock"
      />
      <div v-else class="content text-black">
        <template v-for="(block, index) in data.blocks" :key="index">
          <PageBlock
            :index="index"
            :block="block"
            :is-preview="isPreview"
            :disable-actions="disableActions"
            :is-clicked="isClicked"
            :clicked-block-index="clickedBlockIndex"
            :is-tablet="isTablet"
            :show-newsletter="showNewsletter"
            :block-has-data="blockHasData"
            :get-component="getComponent"
            :tablet-edit="tabletEdit"
            :add-new-block="addNewBlock"
            :handle-edit="handleEdit"
            :delete-block="deleteBlock"
          />
        </template>
      </div>
    </div>
  </NuxtLayout>
</template>
<script lang="ts" setup>
import homepageTemplateDataEn from '../composables/useHomepage/homepageTemplateDataEn.json';
import homepageTemplateDataDe from '../composables/useHomepage/homepageTemplateDataDe.json';

const {
  currentBlock,
  currentBlockIndex,
  isClicked,
  clickedBlockIndex,
  isTablet,
  isPreview,
  blockHasData,
  tabletEdit,
  handleEdit,
  deleteBlock,
  updateBlock,
} = useBlockManager();

const { data, fetchPageTemplate, dataIsEmpty } = useHomepage();
const { showNewsletter } = useNewsletter();
const { $i18n } = useNuxtApp();

const defaultAddBlock = (lang: string) => {
  return lang === 'en' ? homepageTemplateDataEn.blocks[1] : homepageTemplateDataDe.blocks[1];
};

definePageMeta({
  layout: false,
});

const mediacardtext = `<div class='flex flex-col mt-5 sm:mt-20 mt-0 sm:p-0 p-5 text-center sm:text-left'><h2 class='text-2xl font-semibold mb-4 text-primary-500'>Flexfit Hurricanes Cap</h2><p class='typography-text-sm md:typography-text-lg mb-6'>Show your team pride with this Flexfit cap!  Features a comfortable fit, durable construction, and bold Hurricanes logo.</p><ul class='list-disc list-inside typography-text-sm md:typography-text-lg'><li>Flexfit design for a snug, comfortable fit</li><li>Durable, high-quality construction</li><li>Embroidered Hurricanes logo</li><li>Available in classic orange</li></ul></div>`;

const addNewBlock = (index: number, position: number) => {
  const insertIndex = position === -1 ? index : index + 1;
  const updatedBlocks = [...data.value.blocks];

  updatedBlocks.splice(insertIndex, 0, defaultAddBlock($i18n.locale.value));

  data.value.blocks = updatedBlocks;
};

const { isEditing, disableActions } = useEditor();

const getComponent = (name: string) => {
  if (name === 'NewsletterSubscribe') return resolveComponent('NewsletterSubscribe');
  // if (name === 'UiHeroCarousel') return resolveComponent('UiHeroCarousel');
  // if (name === 'UiMediaCard') return resolveComponent('UiMediaCard');
  if (name === 'ProductRecommendedProducts') return resolveComponent('ProductRecommendedProducts');
};

fetchPageTemplate();
</script>
