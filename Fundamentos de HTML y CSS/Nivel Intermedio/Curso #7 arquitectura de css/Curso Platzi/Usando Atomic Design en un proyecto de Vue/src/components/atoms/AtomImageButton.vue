<template>
  <button @click="goToNextPage">
    <img :src="image" :alt="alt">
  </button>
  <span>{{ text }}</span>
</template>

<script>
export default {
  props: {
    image: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },

  emits: ['goToNextPage'],

  setup(props, context) {
    const goToNextPage = () => {
      context.emit('goToNextPage');
    };

    return {
      goToNextPage
    };
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100px;
}

button {
  border-radius: 20px;

  &:hover {
    cursor: pointer;
  }

  /*animation when click on button*/
  &:active {
    transform: scale(0.95);
  }
}

span {
  display: block;
  margin-top: 10px;
  font-size: 1.5rem;
}
</style>