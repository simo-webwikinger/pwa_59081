<template>
  <MegaMenu :categories="categoryTree" :hasHero="hasHero">
    <template v-slot:nav>
      <nav class="xl:relative flex md:gap-10">
        <div
          v-if="viewport.isGreaterOrEquals('md')"
          class="nav-container fixed inset-0 py-24 sm:py-32 transform translate-x-full overflow-y-auto xl:relative xl:py-0 xl:transform-none xl:transition-none xl:bg-transparent xl:overflow-y-visible"
        >
          <ul
            class="nav-list relative flex flex-col items-center gap-4 w-full text-2xl text-center xl:flex-row xl:gap-0 xl:-mx-4 xl:pt-0 xl:text-base"
          >
            <li v-for="navlink in navLinks" :key="navlink.label" class="relative group nav-list-item w-full px-4">
              <NuxtLink
                v-if="navlink.label !== 'FANSHOP'"
                :to="navlink.link"
                :class="[
                  'nav-list-link inline-flex items-center uppercase font-bold mb-4 text-white xl:py-1 border-b-4 border-transparent hover:border-secondary-500 xl:mb-0 xl:group-hover:border-secondary-500 xl:group-focus:border-secondary-500 xl:whitespace-nowrap',
                  { '!border-secondary-500': route.path === navlink.link },
                ]"
                >{{ navlink.label }}</NuxtLink
              >
              <div v-else class="relative group nav-list-item w-full px-4">
                <span
                  class="nav-list-link inline-flex items-center uppercase font-bold mb-4 text-white xl:py-1 border-b-4 border-transparent xl:mb-0 xl:group-hover:border-secondary-500 xl:group-focus:border-secondary-500 xl:whitespace-nowrap"
                >
                  FANSHOP
                </span>
                <!-- category -->
                <ul
                  class="subnav-list mt-0 flex flex-col items-center text-base bg-transparent overflow-hidden transition-all xl:h-auto xl:items-start xl:hidden xl:absolute xl:top-full xl:left-4 xl:pt-3 xl:text-base xl:overflow-visible xl:transition-none xl:group-hover:flex xl:group-focus:flex"
                >
                  <div class="bg-white relative">
                    <li
                      v-for="category in categoryTree"
                      :key="category.id"
                      class="group"
                      @mouseenter="hoveredCategoryId = category.id"
                      @mouseleave="hoveredCategoryId = null"
                    >
                      <NuxtLink
                        :to="generateCategoryLink(category)"
                        class="nav-list-link inline-flex items-center uppercase font-bold relative py-4 xl:py-3 xl:pl-6 xl:pr-4 xl:text-left xl:w-min hover:text-secondary-500 xl:text-primary-500 xl:after:bg-white xl:hover:bg-secondary-500 xl:hover:text-white xl:hover:after:bg-secondary-500"
                        style="width: 240px; display: inline-block"
                      >
                        {{ categoryTreeGetters.getName(category) }}
                      </NuxtLink>
                      <!-- Render child categories -->
                      <div
                        v-if="category.children && category.children.length > 0 && hoveredCategoryId === category.id"
                        class="absolute left-full top-0 mt-0 py-2 text-left h-full bg-white min-w-[200px]"
                      >
                        <ul class="flex flex-col">
                          <li v-for="childCategory in category.children" :key="childCategory.id" class="pt-1 px-4">
                            <NuxtLink
                              :to="generateCategoryLink(childCategory)"
                              class="nav-list-link text-pitch-black hover:text-secondary-500 uppercase font-bold text-sm block"
                            >
                              <SfIconChevronRight />
                              {{ categoryTreeGetters.getName(childCategory) }}
                            </NuxtLink>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </div>
                </ul>
              </div>

              <!-- add sub links if exist -->
              <ul
                v-if="navlink.subLinks"
                class="subnav-list flex flex-col items-center text-base bg-pitch-black bg-opacity-40 overflow-hidden transition-all xl:h-auto xl:items-start xl:hidden xl:absolute xl:top-full xl:left-4 xl:pt-1 xl:text-base xl:bg-transparent xl:overflow-visible xl:transition-none xl:group-hover:flex xl:group-focus:flex"
              >
                <li v-for="sublink in navlink.subLinks" :key="sublink.label" class="relative group pt-2">
                  <NuxtLink
                    :to="sublink.link"
                    class="nav-list-link inline-flex items-center uppercase font-bold relative py-4 xl:py-3 xl:pl-6 xl:pr-4 xl:after:block xl:after:absolute xl:after:top-0 xl:after:bottom-0 xl:after:-right-2 xl:after:w-4 xl:after:-skew-x-10 xl:text-left xl:w-min hover:text-secondary-500 xl:bg-white xl:text-primary-500 xl:after:bg-white xl:hover:bg-secondary-500 xl:hover:text-white xl:hover:after:bg-secondary-500"
                    >{{ sublink.label }}</NuxtLink
                  >
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div v-if="viewport.isGreaterOrEquals('md')" class="flex gap-2">
          <UiButton
            class="group relative text-white hover:text-white active:text-white hover:scale-95 hover:bg-primary-600 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
            :tag="NuxtLink"
            :to="localePath(paths.wishlist)"
            :aria-label="t('numberInWishlist', { count: wishlistItemIds.length })"
            variant="primary"
            square
            data-testid="wishlist-page-navigation"
          >
            <template #prefix>
              <SfIconFavorite />
              <SfBadge
                :content="wishlistItemIds.length"
                class="outline outline-primary-500 bg-white !text-neutral-900 hover:scale-95 group-hover:outline-primary-600 group-active:outline-primary-700 flex justify-center items-center text-xs min-w-[16px] min-h-[16px]"
                data-testid="wishlist-badge"
                placement="top-right"
                :max="99"
              />
            </template>
          </UiButton>
          <UiButton
            class="group relative text-white hover:text-white hover:scale-95 active:text-white hover:bg-primary-600 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
            :tag="NuxtLink"
            :to="localePath(paths.cart)"
            :aria-label="t('numberInCart', { count: cartItemsCount })"
            variant="primary"
            square
          >
            <template #prefix>
              <SfIconShoppingCart />
              <SfBadge
                :content="cartItemsCount"
                class="outline outline-primary-500 bg-white hover:scale-95 !text-neutral-900 group-hover:outline-primary-600 group-active:outline-primary-700 flex justify-center items-center text-xs min-w-[16px] min-h-[16px]"
                data-testid="cart-badge"
                placement="top-right"
                :max="99"
              />
            </template>
          </UiButton>
          <SfDropdown v-if="isAuthorized" v-model="isAccountDropdownOpen" placement="bottom-end" class="z-50">
            <template #trigger>
              <UiButton
                variant="primary"
                class="relative text-white hover:text-white hover:scale-95 active:text-white hover:bg-primary-600 active:bg-primary-700 rounded-md"
                :class="{ 'bg-primary-700': isAccountDropdownOpen }"
                @click="accountDropdownToggle()"
                data-testid="account-dropdown-button"
              >
                <template #prefix>
                  <SfIconPerson />
                </template>
                {{ user.user?.firstName }}
              </UiButton>
            </template>
            <ul class="rounded bg-white shadow-md border border-neutral-100 text-neutral-900 min-w-[152px] py-2">
              <li v-for="({ label, link }, labelIndex) in accountDropdown" :key="`label-${labelIndex}`">
                <template v-if="label === t('account.logout')">
                  <UiDivider class="my-2" />
                  <SfListItem
                    tag="button"
                    class="text-left"
                    data-testid="account-dropdown-logout-item"
                    @click="logOut()"
                  >
                    {{ label }}
                  </SfListItem>
                </template>
                <SfListItem
                  v-else
                  :tag="NuxtLink"
                  :to="link"
                  :class="{ 'bg-neutral-200': route.path === link }"
                  data-testid="account-dropdown-list-item"
                >
                  {{ label }}
                </SfListItem>
              </li>
            </ul>
          </SfDropdown>
          <UiButton
            v-else
            :tag="NuxtLink"
            :to="localePath(paths.authLogin)"
            class="group relative text-white hover:text-white hover:scale-95 active:text-white hover:bg-primary-600 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
            variant="primary"
            :aria-label="t('auth.login.openLoginForm')"
            square
          >
            <SfIconPerson />
          </UiButton>
          <UiButton
            v-if="showConfigurationDrawer"
            @click="open = true"
            class="group relative text-white hover:text-white hover:scale-95 active:text-white hover:bg-primary-600 active:bg-primary-700 mr-1 -ml-0.5 rounded-md"
            variant="primary"
            :aria-label="t('openConfigurationDrawer')"
            square
          >
            <SfIconTune />
          </UiButton>
        </div>

        <UiButton
          v-if="viewport.isLessThan('lg') && !isOpen"
          variant="primary"
          square
          :aria-label="t('closeMenu')"
          class="mr-5 bg-transparent hover:bg-secondary-500 hover:scale-95 hover:text-white active:bg-primary-600 active:text-white"
          @click="openMenu()"
        >
          <SfIconMenu class="text-white" />
        </UiButton>
      </nav>
    </template>
    <div
      v-if="viewport.isLessThan('lg') && isOpen"
      class="fixed inset-0 bg-pitch-black bg-opacity-95 z-50 flex items-center justify-center flex-col overflow-scroll"
    >
      <div class="relative w-full h-full flex items-center justify-center">
        <UiButton
          variant="tertiary"
          square
          :aria-label="t('closeMenu')"
          class="nav-toggle absolute top-24 right-3 md:top-10 md:right-4 text-3xl hover:text-secondary-500 text-white xl:hidden"
          @click="closeMenu()"
        >
          <SfIconClose class="text-white" />
        </UiButton>
        <ul
          class="nav-list relative flex flex-col items-center gap-4 w-full text-2xl text-center xl:flex-row xl:gap-0 xl:-mx-4 xl:pt-0 xl:text-base"
        >
          <li v-for="navlink in navLinks" :key="navlink.label" class="relative group nav-list-item w-full px-4">
            <div @click="navlink.label !== 'FANSHOP' ? toggleSubMenu(navlink.label) : null">
              <NuxtLink
                v-if="navlink.label !== 'FANSHOP'"
                :to="navlink.link"
                :class="[
                  'nav-list-link inline-flex items-center uppercase font-bold mb-4 text-white xl:py-1 border-b-4 border-transparent hover:border-secondary-500 xl:mb-0 xl:group-hover:border-secondary-500 xl:group-focus:border-secondary-500 xl:whitespace-nowrap',
                  { '!border-secondary-500': route.path === navlink.link },
                ]"
                >{{ navlink.label }}</NuxtLink
              >
              <span
                v-else
                @click="toggleSubMenu(navlink.label)"
                class="nav-list-link inline-flex items-center uppercase font-bold mb-4 text-white xl:py-1 border-b-4 border-transparent hover:border-secondary-500 xl:mb-0 xl:group-hover:border-secondary-500 xl:group-focus:border-secondary-500 xl:whitespace-nowrap cursor-pointer"
              >
                FANSHOP
              </span>
            </div>

            <!-- Category Tree Dropdown -->
            <ul
              v-if="navlink.label === 'FANSHOP' && openSubMenus['FANSHOP']"
              class="subnav-list flex flex-col items-center mt-2"
            >
              <li v-for="category in categoryTree" :key="category.id" class="py-2 relative">
                <div class="flex items-center justify-between">
                  <NuxtLink
                    :to="generateCategoryLink(category)"
                    class="nav-list-link hove:text-white text-secondary-500"
                  >
                    {{ categoryTreeGetters.getName(category) }}
                  </NuxtLink>

                  <UiButton
                    v-if="viewport.isLessThan('lg') && category.children && category.children.length > 0"
                    variant="tertiary"
                    @click="toggleCategory(category.id)"
                    class="ml-2 text-white"
                    aria-label="Toggle Subcategories"
                  >
                    <SfIconExpandMore size="sm" />
                  </UiButton>
                </div>
                <!-- Render child categories -->
                <ul
                  v-if="
                    category.children &&
                    category.children.length > 0 &&
                    (expandedCategories[category.id] || viewport.isGreaterOrEquals('lg'))
                  "
                  class="ml-4 mt-1"
                >
                  <li v-for="childCategory in category.children" :key="childCategory.id">
                    <NuxtLink
                      :to="generateCategoryLink(childCategory)"
                      class="nav-list-link text-white hover:text-secondary-500 uppercase font-bold text-sm"
                    >
                      {{ categoryTreeGetters.getName(childCategory) }}
                    </NuxtLink>
                  </li>
                </ul>
              </li>
            </ul>

            <ul
              v-if="navlink.subLinks && openSubMenus[navlink.label]"
              class="subnav-list flex flex-col items-center mt-2"
            >
              <li v-for="sublink in navlink.subLinks" :key="sublink.label">
                <NuxtLink :to="sublink.link" class="nav-list-link text-white hover:text-secondary-500 uppercase">{{
                  sublink.label
                }}</NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <ul
        class="absolute bottom-5 flex justify-between flex-wrap gap-4 max-w-[80vw] w-full sm:max-w-sm mx-auto mt-16 pt-4 border-t border-white border-opacity-60 xl:hidden text-white"
      >
        <li class="text-xs uppercase opacity-60 hover:opacity-100"><NuxtLink to="/contact">Kontakt</NuxtLink></li>
        <li class="text-xs uppercase opacity-60 hover:opacity-100"><NuxtLink to="/impressum">Impressum</NuxtLink></li>
        <li class="text-xs uppercase opacity-60 hover:opacity-100">
          <NuxtLink to="/datenschutz">Datenschutz</NuxtLink>
        </li>
      </ul>
    </div>

    <!-- <div v-if="viewport.isLessThan('lg')">
      <UiButton
        variant="tertiary"
        class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 rounded-md md:hidden"
        square
        data-testid="open-languageselect-button"
        :aria-label="t('languageSelector')"
        @click="toggleLanguageSelect()"
        :disabled="(showConfigurationDrawer && isEditing) || (showConfigurationDrawer && disableActions)"
      >
        <SfIconLanguage />
      </UiButton>
      <UiButton
        variant="tertiary"
        class="relative text-white hover:text-white active:text-white hover:bg-primary-800 active:bg-primary-700 rounded-md md:hidden"
        square
        @click="searchModalOpen"
        :aria-label="t('openSearchModalButtonLabel')"
      >
        <SfIconSearch />
      </UiButton>
    </div> -->
    <slot />
  </MegaMenu>
  <!-- <LanguageSelector /> -->
  <!-- <UiModal
    v-if="viewport.isGreaterOrEquals('md') && isAuthenticationOpen"
    v-model="isAuthenticationOpen"
    tag="section"
    class="h-full md:w-[500px] md:h-fit m-0 p-0 overflow-y-auto"
  >
    <header>
      <UiButton
        :aria-label="$t('closeDialog')"
        square
        variant="tertiary"
        class="absolute right-2 top-2"
        @click="closeAuthentication"
      >
        <SfIconClose />
      </UiButton>
    </header>
    <LoginComponent v-if="isLogin" @change-view="isLogin = false" @logged-in="closeAuthentication" :is-modal="true" />
    <Register v-else @change-view="isLogin = true" @registered="closeAuthentication" :is-modal="true" />
  </UiModal>

  <NuxtLazyHydrate v-if="viewport.isLessThan('lg')" when-idle>
    <SfModal
      v-model="isSearchModalOpen"
      class="w-full h-full z-50"
      tag="section"
      role="dialog"
      aria-labelledby="search-modal-title"
    >
      <header class="mb-4">
        <UiButton square variant="tertiary" class="absolute right-4 top-2" @click="searchModalClose">
          <SfIconClose class="text-neutral-500" />
        </UiButton>
        <h3 id="search-modal-title" class="absolute left-6 top-4 font-bold typography-headline-4 mb-4">
          {{ t('search') }}
        </h3>
      </header>
      <UiSearch :close="searchModalClose" />
    </SfModal>
  </NuxtLazyHydrate> -->
  <LazyConfigurationDrawer v-if="showConfigurationDrawer" />
</template>

<script setup lang="ts">
import { type CategoryTreeItem, categoryTreeGetters } from '@plentymarkets/shop-api';
import {
  SfBadge,
  SfDropdown,
  SfIconClose,
  SfIconLanguage,
  SfIconPerson,
  SfIconSearch,
  SfIconShoppingCart,
  SfIconTune,
  SfListItem,
  SfModal,
  SfIconFavorite,
  SfIconMenu,
  SfIconExpandMore,
  SfIconChevronRight,
  useDisclosure,
} from '@storefront-ui/vue';
import LanguageSelector from '~/components/LanguageSelector/LanguageSelector.vue';
import { paths } from '~/utils/paths';

const { buildCategoryMenuLink } = useLocalization();

defineProps({
  hasHero: {
    type: Boolean,
    default: true,
  },
});

const hoveredCategoryId = ref<number | null>(null);
const expandedCategories = ref<{ [key: number]: boolean }>({});

const toggleCategory = (categoryId: number) => {
  expandedCategories.value[categoryId] = !expandedCategories.value[categoryId];
};

const isOpen = ref(false);
const openMenu = () => {
  isOpen.value = true;
};
const closeMenu = () => {
  isOpen.value = false;
};

const isLogin = ref(true);
const { data: cart } = useCart();
const { wishlistItemIds } = useWishlist();
const cartItemsCount = ref(0);

const NuxtLink = resolveComponent('NuxtLink');
const { t, localeCodes } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const { isOpen: isAccountDropdownOpen, toggle: accountDropdownToggle } = useDisclosure();
const { isOpen: isAuthenticationOpen, open: openAuthentication, close: closeAuthentication } = useDisclosure();
const { open: searchModalOpen, isOpen: isSearchModalOpen, close: searchModalClose } = useDisclosure();
const { open } = useConfigurationDrawer();
const { toggle: toggleLanguageSelect, isOpen: isLanguageSelectOpen } = useLocalization();
const { data: categoryTree } = useCategoryTree();
const { data: user, isAuthorized, logout } = useCustomer();
const viewport = useViewport();
const runtimeConfig = useRuntimeConfig();
const showConfigurationDrawer = runtimeConfig.public.showConfigurationDrawer;
const { isEditing, disableActions } = useEditor();

onNuxtReady(() => {
  cartItemsCount.value = cart.value?.items?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
});

watch(
  () => cart.value?.items,
  (cartItems) => {
    cartItemsCount.value = cartItems?.reduce((price, { quantity }) => price + quantity, 0) ?? 0;
  },
);

watch(
  () => isAuthenticationOpen.value,
  async () => {
    isLogin.value = true;
  },
);

const logOut = async () => {
  accountDropdownToggle();
  await logout();
  navigateTo(localePath(paths.home));
};

const accountDropdown = computed(() => [
  {
    label: t('account.heading'),
    link: localePath(paths.account),
  },
  {
    label: t('account.ordersAndReturns.section.myOrders'),
    link: localePath(paths.accountMyOrders),
  },
  {
    label: t('account.ordersAndReturns.section.returns'),
    link: localePath(paths.accountReturns),
  },
  {
    label: t('account.logout'),
  },
]);
const navigateToLogin = () => {
  if (route.path !== localePath(paths.authLogin)) {
    openAuthentication();
  }
};

const navLinks = [
  {
    label: 'GFL',
    link: null,
    subLinks: [
      {
        label: 'LIVESTREAM',
        link: 'https://sportdeutschland.tv/kiel-baltic-hurricanes',
      },
      {
        label: 'GFL',
        link: null,
      },
    ],
  },
  {
    label: 'TICKETS',
    link: localePath(paths.tickets),
  },
  {
    label: 'FANSHOP',
    link: null,
  },
  {
    label: 'Sponsoring',
    link: null,
  },
];

const openSubMenus = ref<Record<string, boolean>>({});

const toggleSubMenu = (label: string) => {
  openSubMenus.value = {
    ...openSubMenus.value,
    [label]: !openSubMenus.value[label],
  };
};

const generateCategoryLink = (category: CategoryTreeItem) => {
  return buildCategoryMenuLink(category, categoryTree.value);
};
</script>
