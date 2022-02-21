<template>
  <component :is="type" v-bind="linkProps(props.to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { isExternal } from '@/utils/validate'
import { computed, defineProps } from 'vue'

const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

const isExternalValue = computed(() => isExternal(props.to))
const type = computed(() => {
  if (isExternalValue.value) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (to:string) => {
  if (isExternalValue.value) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}
</script>
