<template>
  <nav class="w-full fixed bottom-0 left-0 flex flex-row items-stretch md:hidden" data-testid="navbar-bottom">
    <UiButton
      v-for="{ label, icon, link } in items"
      :key="label"
      variant="tertiary"
      :class="[
        '!p-1 !pt-3 flex flex-col h-full w-full rounded-none text-white hover:text-white hover:bg-primary-800 active:text-white active:bg-primary-700 !text-xs !font-base',
        { 'bg-primary-700': route.path === link },
        'bg-primary-500',
      ]"
      size="sm"
      :tag="link ? NuxtLink : undefined"
      :to="link || undefined"
      @click="label.trim().toLowerCase() === t('products').trim().toLowerCase() ? openProductsDrawer() : undefined"
    >
      <template #prefix>
        <div class="relative">
          <component :is="icon" />
          <SfBadge
            v-if="label === t('cart')"
            :content="cartItemsCount"
            :max="99"
            class="translate-x-[5px] translate-y-[-3px] outline outline-primary-500 bg-white !text-neutral-900 group-hover:outline-primary-800 group-active:outline-primary-700 flex justify-center items-center text-xs min-w-[16px] min-h-[16px]"
          />
          <SfBadge
            v-if="label === t('wishlist')"
            :content="wishlistItemIds.length"
            :max="99"
            class="translate-x-[5px] translate-y-[-3px] outline outline-primary-500 bg-white !text-neutral-900 group-hover:outline-primary-800 group-active:outline-primary-700 flex justify-center items-center text-xs min-w-[16px] min-h-[16px]"
            data-testid="wishlist-badge"
          />
        </div>
      </template>
      {{ label }}
    </UiButton>

    <!-- Products Drawer (Full Screen) -->
    <SfDrawer v-model="isProductsDrawerOpen.isOpen" placement="left" class="mobile-products-drawer">
      <div class="flex justify-between items-center px-4 py-2 bg-neutral-100">
        <p class="text-lg font-semibold text-neutral-900">{{ t('products') }}</p>
        <UiButton variant="tertiary" square @click="closeProductsDrawer()" aria-label="Close Menu">
          <SfIconClose size="lg" />
        </UiButton>
      </div>
      <nav class="p-4">
        <ul class="space-y-2">
          <li v-for="category in categoryTree" :key="category.id" class="relative group">
            <div class="flex items-center justify-between">
              <NuxtLink :to="generateCategoryLink(category)" class="text-neutral-700 hover:text-secondary-500">
                {{ categoryTreeGetters.getName(category) }}
              </NuxtLink>
              <UiButton
                variant="tertiary"
                @click="toggleCategory(category.id)"
                class="ml-2 text-neutral-700"
                aria-label="Toggle Subcategories"
              >
                <SfIconChevronRight size="sm" :class="{ 'rotate-90': expandedCategories[category.id] }" />
              </UiButton>
            </div>

            <!-- Render child categories -->
            <ul
              v-if="category.children && category.children.length > 0 && expandedCategories[category.id]"
              class="ml-4 mt-1"
            >
              <li v-for="childCategory in category.children" :key="childCategory.id">
                <NuxtLink
                  :to="generateCategoryLink(childCategory)"
                  class="text-neutral-700 hover:text-secondary-500 uppercase font-bold text-sm"
                >
                  {{ categoryTreeGetters.getName(childCategory) }}
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </SfDrawer>
  </nav>
</template>

<script setup lang="ts">
import {
  SfBadge,
  SfIconShoppingCart,
  SfIconHome,
  SfIconMenu,
  SfIconPerson,
  SfIconFavorite,
  SfDrawer,
  SfIconClose,
  SfIconChevronRight, // Import SfIconChevronRight
} from '@storefront-ui/vue';
import { useCustomer } from '~/composables/useCustomer';
import { categoryTreeGetters } from '@plentymarkets/shop-api';

const localePath = useLocalePath();
const route = useRoute();
const { t } = useI18n();
const { wishlistItemIds } = useWishlist();
const { data: cart } = useCart();
const { isAuthorized } = useCustomer();
const { data: categoryTree } = useCategoryTree(); // Get category tree

const items = computed(() => [
  {
    label: t('home'),
    icon: SfIconHome,
    link: localePath(paths.home),
  },
  {
    label: t('products'),
    icon: SfIconMenu,
    link: '',
  },
  {
    label: t('wishlist'),
    icon: SfIconFavorite,
    link: localePath(paths.wishlist),
  },
  {
    label: t('cart'),
    icon: SfIconShoppingCart,
    link: localePath(paths.cart),
  },
  {
    label: isAuthorized.value ? t('account.navBottomHeadingAccount') : t('account.navBottomHeadingLogin'),
    icon: SfIconPerson,
    link: isAuthorized.value ? localePath(paths.account) : localePath(paths.authLogin),
  },
]);

const cartItemsCount = computed(() => cart.value?.items?.reduce((price, { quantity }) => price + quantity, 0) ?? 0);
const NuxtLink = resolveComponent('NuxtLink');

// Drawer state
const isProductsDrawerOpen = ref({ isOpen: false });
const expandedCategories = ref<{ [key: number]: boolean }>({}); // Track expanded categories

// Drawer functions
const openProductsDrawer = () => {
  isProductsDrawerOpen.value.isOpen = true;
};

const closeProductsDrawer = () => {
  isProductsDrawerOpen.value.isOpen = false;
};

const toggleCategory = (categoryId: number) => {
  expandedCategories.value[categoryId] = !expandedCategories.value[categoryId];
};

// Build category link helper function (assuming it's needed)
const { buildCategoryMenuLink } = useLocalization(); // Ensure this is correctly imported
const generateCategoryLink = (category: any) => {
  // Replace 'any' with the actual type
  return buildCategoryMenuLink(category, categoryTree.value);
};
</script>

<style scoped>
/*  Full width and height  */
.mobile-products-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /*  Full height */
  background-color: white; /* Adjust as needed */
  z-index: 50; /* Ensure it's on top */
}

.rotate-90 {
  transform: rotate(90deg);
  transition: transform 0.2s ease-in-out;
}
</style>
