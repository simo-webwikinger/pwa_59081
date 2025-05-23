<template>
  <NuxtLayout
    name="default"
    :breadcrumbs="breadcrumbs"
    :hasHero="false"
    class="relative"
    :class="{ 'pointer-events-none opacity-50': loading }"
  >
    <template v-slot:hero>
      <!-- top section for categories page -->
      <div class="relative flex flex-col justify-center min-h-[24rem] p-4 lg:p-8 z-10">
        <h1
          class="text-5xl sm:text-7xl md:text-8xl xl:text-10xl font-black text-white uppercase after:block after:w-[2em] after:h-[0.1em] after:mt-4 after:ml-1.5 after:bg-secondary-500 [hyphens:auto]"
        >
          {{ headTitle || categoryGetters.getCategoryName(productsCatalog?.category) }}
        </h1>
      </div>
    </template>
    <SfLoaderCircular
      v-if="loading || checkingPermission"
      class="fixed top-[50%] right-0 left-0 m-auto z-[99999]"
      size="2xl"
    />
    <template v-else>
      <CategoryPageContent
        v-if="productsCatalog?.products"
        :title="categoryGetters.getCategoryName(productsCatalog.category)"
        :total-products="productsCatalog.pagination.totals"
        :products="productsCatalog.products"
        :items-per-page="Number(productsPerPage)"
      >
        <template #sidebar>
          <CategoryTree :category="productsCatalog.category" />
          <CategorySorting />
          <CategoryItemsPerPage class="mt-6" :total-products="productsCatalog.pagination.totals" />
          <CategoryFilters v-if="facetGetters.hasFilters(productsCatalog.facets)" :facets="productsCatalog.facets" />
        </template>
      </CategoryPageContent>
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { categoryGetters, categoryTreeGetters, facetGetters } from '@plentymarkets/shop-api';
import { SfLoaderCircular } from '@storefront-ui/vue';

definePageMeta({ layout: false, middleware: ['category-guard'] });

const { t, locale } = useI18n();
const route = useRoute();
const router = useRouter();
const { data: productsCatalog, productsPerPage, loading, checkingPermission } = useProducts();
const { data: categoryTree } = useCategoryTree();
const { buildCategoryLanguagePath } = useLocalization();

const breadcrumbs = computed(() => {
  if (productsCatalog.value.category) {
    const breadcrumb = categoryTreeGetters.generateBreadcrumbFromCategory(
      categoryTree.value,
      categoryGetters.getId(productsCatalog.value.category),
    );
    breadcrumb.unshift({ name: t('home'), link: '/' });

    return breadcrumb;
  }

  return [];
});

watch(
  () => locale.value,
  (changedLocale: any) => {
    router.push({
      path: buildCategoryLanguagePath(`${productsCatalog.value.languageUrls[changedLocale]}`),
      query: route.query,
    });
  },
);

const headTitle = computed(() =>
  productsCatalog.value?.category
    ? (categoryGetters.getMetaTitle(productsCatalog.value.category) || process.env.METATITLE) ?? ''
    : process.env.METATITLE ?? '',
);

const descriptionContent = computed(() =>
  productsCatalog.value?.category
    ? (categoryGetters.getMetaDescription(productsCatalog.value.category) || process.env.METADESC) ?? ''
    : process.env.METADESC ?? '',
);

const keywordsContent = computed((): string =>
  productsCatalog.value?.category
    ? (categoryGetters.getMetaKeywords(productsCatalog.value.category) || process.env.METAKEYWORDS) ?? ''
    : process.env.METAKEYWORDS ?? '',
);

useHead({
  title: categoryGetters.getCategoryName(productsCatalog.value?.category),
  meta: [
    { name: 'description', content: descriptionContent },
    { name: 'keywords', content: keywordsContent },
  ],
});
</script>
