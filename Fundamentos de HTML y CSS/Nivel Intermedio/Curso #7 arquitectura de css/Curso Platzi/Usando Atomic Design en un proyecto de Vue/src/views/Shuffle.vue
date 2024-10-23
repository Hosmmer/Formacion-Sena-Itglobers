<template>
  <h1>shuffle ab workout</h1>
  <AtomImageButton
    :image="require('../assets/shuffle.png')"
    alt="logo" text="Shuffle"
    @goToNextPage="goToWorkout"
  />
</template>

<script>
import { useRouter } from 'vue-router'

import AtomImageButton from '@/components/atoms/AtomImageButton.vue'
import store from '@/store'

export default {
  components: {
    AtomImageButton
  },

  setup() {
    const router = useRouter()

    const goToWorkout = () => {
      router.push('/workout');
      store.commit('clearState')
    };

    return {
      goToWorkout
    };
  }
}
</script>

<style>

</style>