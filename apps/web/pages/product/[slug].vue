<template>
  <NuxtLayout name="default" :breadcrumbs="breadcrumbs" :hasHero="false">
    <template v-slot:hero class="hidden"></template>
    <NarrowContainer>
      <div class="md:grid gap-x-6 grid-areas-product-page grid-cols-product-page">
        <section class="grid-in-left-top md:h-full xl:max-h-[700px]">
          <Gallery :images="addModernImageExtensionForGallery(productGetters.getGallery(product))" />
        </section>
        <section class="mb-10 grid-in-right md:mb-0">
          <NuxtLazyHydrate when-idle>
            <UiPurchaseCard v-if="product" :product="product" :review-average="countsProductReviews" />
          </NuxtLazyHydrate>
        </section>
        <section class="grid-in-left-bottom md:mt-8 text-white">
          <UiDivider class="mt-4 mb-2 md:mt-8" />
          <NuxtLazyHydrate when-visible>
            <ProductAccordion v-if="product" :product="product" />
          </NuxtLazyHydrate>
          <ReviewsAccordion
            v-if="product"
            :product="product"
            :total-reviews="reviewGetters.getTotalReviews(countsProductReviews)"
          />

          <div class="p-4 flex">
            <p @click="openDrawer()" class="font-bold leading-6 cursor-pointer">
              <span>{{ t('legalDetails') }}</span>
              <SfIconChevronRight />
            </p>
          </div>
        </section>
      </div>
      <section class="my-10">
        <NuxtLazyHydrate when-visible>
          <ProductRecommendedProducts
            :category-id="productGetters.getCategoryIds(product)[0]"
            class="mx-4"
          ></ProductRecommendedProducts>
        </NuxtLazyHydrate>
      </section>
    </NarrowContainer>

    <UiReviewModal />
    <ProductLegalDetailsDrawer v-if="open" :product="product" />
  </NuxtLayout>
</template>

<script setup lang="ts">
import { SfIconChevronRight } from '@storefront-ui/vue';
import { Product, productGetters, reviewGetters, categoryTreeGetters } from '@plentymarkets/shop-api';

definePageMeta({
  layout: false,
  path: '/:slug*_:itemId',
});

const { t } = useI18n();
const route = useRoute();
const { setCurrentProduct } = useProducts();
const { setProductMetaData, setProductRobotsMetaData } = useStructuredData();
const { buildProductLanguagePath } = useLocalization();
const { addModernImageExtensionForGallery } = useModernImage();
const { productParams, productId } = createProductParams(route.params);
const { data: product, fetchProduct, setProductMeta, setBreadcrumbs, breadcrumbs } = useProduct(productId);
const { data: productReviews, fetchProductReviews } = useProductReviews(Number(productId));
const { data: categoryTree } = useCategoryTree();
const { open, openDrawer } = useProductLegalDetailsDrawer();

const countsProductReviews = computed(() => reviewGetters.getReviewCounts(productReviews.value));

await fetchProduct(productParams);

if (Object.keys(product.value).length === 0) {
  throw new Response(null, {
    status: 404,
    statusText: 'Not found',
  });
}
setCurrentProduct(product.value || ({} as Product));
setProductMeta();

async function fetchReviews() {
  const productVariationId = productGetters.getVariationId(product.value);
  await fetchProductReviews(Number(productId), productVariationId);
}
await fetchReviews();

setBreadcrumbs();

// eslint-disable-next-line unicorn/expiring-todo-comments
/* TODO: This should only be temporary.
 *  It changes the url of the product page while on the page and switching the locale.
 *  Should be removed when the item search is refactored.
 */
watch(
  () => product.value.texts.urlPath,
  (value, oldValue) => {
    if (value !== oldValue) {
      navigateTo({
        path: buildProductLanguagePath(
          `/${productGetters.getUrlPath(product.value)}_${productGetters.getItemId(product.value)}`,
        ),
        query: route.query,
      });
    }
  },
);

watch(
  () => categoryTree.value,
  (categoriesTree) => {
    const productCategoryId = productGetters.getParentCategoryId(product.value);
    if (categoriesTree.length > 0 && productCategoryId) {
      const categoryTree = categoriesTree.find(
        (categoryTree) => categoryTreeGetters.getId(categoryTree) === productCategoryId,
      );
      if (categoryTree) {
        setProductMetaData(product.value, categoryTree);
        setProductRobotsMetaData(product.value);
      }
    }
  },
  { immediate: true },
);
</script>

<style scoped>
header {
  min-height: 0 !important;
  height: auto !important;
  max-height: none !important;
}
</style>
