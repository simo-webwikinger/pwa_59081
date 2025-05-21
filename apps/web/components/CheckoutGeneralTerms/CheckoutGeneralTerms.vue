<template>
  <div class="text-sm mx-4 md:pb-0">
    <div class="flex items-center">
      <SfCheckbox
        :model-value="checkboxValue"
        @update:model-value="(event) => setCheckboxValue(Boolean(event))"
        :invalid="showErrors"
        id="terms-checkbox"
        class="inline-block mr-2"
        data-testid="checkout-terms-checkbox"
      />
      <label for="terms-checkbox" class="select-none text-white">
        <i18n-t keypath="termsInfo" scope="global">
          <template #terms>
            <SfLink
              :href="localePath(paths.termsAndConditions)"
              target="_blank"
              class="text-secondary-500 hover:text-secondary-300 focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded font-medium"
            >
              {{ $t('termsAndConditions') }}
            </SfLink>
          </template>

          <template #cancellationRights>
            <SfLink
              :href="localePath(paths.cancellationRights)"
              target="_blank"
              class="text-secondary-500 hover:text-secondary-300 focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded font-medium"
            >
              {{ $t('cancellationRights') }}
            </SfLink>
          </template>

          <template #privacyPolicy>
            <SfLink
              :href="localePath(paths.privacyPolicy)"
              target="_blank"
              class="text-secondary-500 hover:text-secondary-300 focus:outline focus:outline-offset-2 focus:outline-2 outline-secondary-600 rounded font-medium"
            >
              {{ $t('privacyPolicy') }}
            </SfLink>
          </template>
        </i18n-t>
      </label>
    </div>
    <div class="text-sm text-white/70 mt-1 ml-7">* {{ $t('contact.form.asterixHint') }}</div>
    <div v-if="showErrors" class="text-negative-700 text-sm font-medium">{{ $t('termsRequired') }}</div>
  </div>
</template>

<script setup lang="ts">
import { SfCheckbox, SfLink } from '@storefront-ui/vue';
import { paths } from '~/utils/paths';

const localePath = useLocalePath();

const { checkboxValue, setCheckboxValue, showErrors } = useAgreementCheckbox('checkoutGeneralTerms');
</script>
