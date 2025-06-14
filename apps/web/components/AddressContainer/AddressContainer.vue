<template>
  <div data-testid="checkout-address" class="md:px-4 py-6">
    <div class="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
      <h2 class="text-white text-lg font-bold">
        {{ isShipping ? t('shipping.heading') : t('billing.heading') }}
      </h2>

      <div class="flex mt-4 sm:justify-center sm:mt-0 text-white">
        <AddressSelect
          v-if="!editing && !showNewForm"
          :type="type"
          :disabled="disabled"
          @new="showNewForm = true"
          @edit="edit"
        />
        <UiButton
          :data-testid="'save-address-' + type"
          v-else
          @click="validateAndSubmitForm"
          :disabled="formIsLoading"
          variant="secondary"
        >
          {{ t('saveAddress') }}
        </UiButton>

        <SfTooltip
          v-if="showNewForm || hasCheckoutAddress"
          class="ml-2"
          :label="!editing && !showNewForm && !disabled ? t('editAddress') : ''"
        >
          <UiButton
            @click="edit(checkoutAddress)"
            :disabled="formIsLoading || disabled"
            variant="secondary"
            :data-testid="'edit-address-' + type"
          >
            <template v-if="!editing && !showNewForm">{{ t('contactInfo.edit') }}</template>
            <SfIconClose v-else />
          </UiButton>
        </SfTooltip>
      </div>
    </div>

    <div class="mt-2">
      <template v-if="isShipping">
        <AddressFormShipping v-if="showNewForm" ref="addressFormShipping" add-address />
        <template v-else-if="hasCheckoutAddress">
          <AddressFormShipping v-if="editing" ref="addressFormShipping" :address="addressToEdit" />
          <AddressDisplay v-else :address="checkoutAddress" />
        </template>
        <div v-else class="mt-2">{{ t('account.accountSettings.noAddresses') }}</div>
      </template>

      <template v-if="isBilling">
        <AddressFormBilling v-if="showNewForm" ref="addressFormBilling" add-address />
        <template v-else-if="hasCheckoutAddress && !showSameAsShippingText">
          <AddressFormBilling v-if="editing" ref="addressFormBilling" :address="addressToEdit" />
          <AddressDisplay v-else :address="checkoutAddress" />
        </template>
        <div v-if="showDynamicAddressText" :data-testid="'address-info-text-' + type" class="mt-2">
          {{ dynamicAddressText }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SfIconClose, SfTooltip } from '@storefront-ui/vue';
import { type AddressContainerProps } from './types';
import { type Address, AddressType } from '@plentymarkets/shop-api';

const { disabled = false, type } = defineProps<AddressContainerProps>();

const { t } = useI18n();
const isBilling = type === AddressType.Billing;
const isShipping = type === AddressType.Shipping;
const { checkoutAddress, hasCheckoutAddress } = useCheckoutAddress(type);
const { isLoading: formIsLoading, addressToEdit, add: showNewForm, open: editing } = useAddressForm(type);
const { shippingAsBilling } = useShippingAsBilling();
const addressFormShipping = ref(null as any);
const addressFormBilling = ref(null as any);

const sameAsShippingAddress = computed(() =>
  isBilling
    ? checkoutAddress.value?.id !== undefined &&
      checkoutAddress.value?.id === useCheckoutAddress(AddressType.Shipping).checkoutAddress.value?.id
    : false,
);

const showSameAsShippingText = computed(
  () => sameAsShippingAddress.value && !showNewForm.value && !editing.value && shippingAsBilling.value,
);

const showDynamicAddressText = computed(
  () =>
    showSameAsShippingText.value || (!hasCheckoutAddress.value && !showSameAsShippingText.value && !showNewForm.value),
);

const dynamicAddressText = computed(() =>
  t(showSameAsShippingText.value ? 'addressContainer.sameAsShippingAddress' : 'account.accountSettings.noAddresses'),
);

const edit = (address: Address) => {
  if (disabled) return;
  addressToEdit.value = editing.value || showNewForm.value ? ({} as Address) : address;
  editing.value = !(editing.value || showNewForm.value);
  showNewForm.value = false;
};

const validateAndSubmitForm = async () => {
  const formData = isShipping
    ? await addressFormShipping.value?.validate()
    : await addressFormBilling.value?.validate();

  if (formData.valid) {
    isShipping ? await addressFormShipping.value?.submitForm() : await addressFormBilling.value?.submitForm();
    if (showNewForm.value) showNewForm.value = false;
  }
};

watch(shippingAsBilling, () => {
  if (isBilling && !hasCheckoutAddress.value) showNewForm.value = !shippingAsBilling.value;
});

watch(
  sameAsShippingAddress,
  () => {
    if (sameAsShippingAddress.value) shippingAsBilling.value = true;
  },
  { immediate: true },
);
</script>
