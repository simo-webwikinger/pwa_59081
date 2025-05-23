<template>
  <NuxtLayout name="default" :hasHero="true">
    <template v-slot:hero>
      <div class="absolute w-full max-w-7xl h-full mask-header-image lg:pr-32 xl:w-3/4">
        <img
          src="/images/hero_lo_angel.avif"
          sizes="(min-width: 1280px) 1200px, (min-width: 576px) 100vw, 575px"
          alt="hero image"
          width="400"
          height="400"
          class="min-w-full min-h-full object-cover object-[75%_0%] lg:object-contain lg:object-right-bottom"
        />
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
      <!-- Categories showcase section -->
      <section class="py-12 bg-primary-500">
        <div class="container mx-auto px-8">
          <h2
            class="text-3xl font-bold text-center mb-10 text-white uppercase after:block after:w-24 after:h-1 after:mt-4 after:mx-auto after:bg-secondary-500"
          >
            Shop By Category
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:mx-8">
            <div
              v-for="(category, index) in categoryShowcase"
              :key="index"
              class="category-card group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 h-80"
            >
              <div
                class="absolute inset-0 bg-gradient-to-t from-pitch-black to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-70 z-[1]"
              ></div>
              <img
                :src="category.image"
                :alt="category.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div class="absolute bottom-0 left-0 w-full p-6 z-[2]">
                <h3 class="text-xl font-bold text-white mb-2">{{ category.name }}</h3>
                <NuxtLink
                  :to="category.link"
                  class="inline-flex items-center px-4 py-2 bg-secondary-500 text-white font-bold rounded hover:bg-secondary-600 transition-colors"
                >
                  Shop Now
                  <SfIconArrowForward
                    class="ml-2 text-bold transition-transform duration-300 group-hover:translate-x-1"
                  />
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </section>

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
            :clickedBlockIndex="clickedBlockIndex"
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
import { SfIconArrowForward } from '@storefront-ui/vue';

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

// Category showcase data
const categoryShowcase = [
  {
    name: 'Accessories',
    // description: 'Show your team spirit with official Hurricanes jerseys, t-shirts, and more',
    image: '/images/Dog-Tag.jpg',
    link: '/accessories',
  },
  {
    name: 'Caps & Mützen',
    // description: 'Browse our collection of caps, beanies, and other headwear',
    image: '/images/Anglerhut-mit.jpg',
    link: '/caps-muetzen',
  },
  {
    name: 'Hoodie & Sweats',
    // description: 'Complete your look with scarves, bags, and other team merchandise',
    image: '/images/Hoodie-KBH.jpg',
    link: '/hoodie-sweats',
  },
  {
    name: 'T-Shirts',
    // description: 'Everything you need for the perfect game day experience',
    image: '/images/Fanjersey.jpg',
    link: '/t-shirts',
  },
];

useHead({
  title: 'Startseite',
  meta: [
    {
      name: 'description',
      content: 'Shop the latest Kiel Baltic Hurricanes merchandise and show your team spirit!',
    },
    {
      name: 'keywords',
      content: 'Kiel Baltic Hurricanes, merchandise, accessories, caps, hoodies, t-shirts',
    },
  ],
});

fetchPageTemplate();
</script>
