<template>
  <button @click="nextStep">
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },

  emits: ['nextStep'],

  setup(props, context) {
    const nextStep = () => {
      context.emit('nextStep');
    };

    return {
      nextStep,
    };
  }
}
</script>

<style lang="scss" scoped>
button {
  margin: 20px 0;
  font-size: 1.2rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px 20px;
  width: 200px;

  &:hover {
    cursor: pointer;
  }

  &:active {
    color: #fff;
    background-color: #00bcd4;
    transform: scale(0.95);
  }
}
</style>