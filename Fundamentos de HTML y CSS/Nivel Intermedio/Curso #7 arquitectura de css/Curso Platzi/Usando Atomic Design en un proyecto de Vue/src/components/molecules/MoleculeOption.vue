<template>
  <div class="container">
    <img
      :src="image"
      :alt="alt"
      @click="selectOption"
      :class=" isSelected ? 'redBorder' : '' "
    >
    <span>{{ text }}</span>
  </div>
</template>

<script>
import { ref } from "vue";

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

  emits: ["select"],

  setup(_, context) {

    const isSelected = ref(false);

    const selectOption = () => {
      isSelected.value = !isSelected.value;
      context.emit('select')
    }

    return {
      isSelected,
      selectOption
    };
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100px;

  &:hover {
    cursor: pointer;
  }
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  margin-bottom: 15px;

  & span {
    margin-top: 5px;
  }
}

.redBorder {
  border: 3px solid red;
  border-radius: 5px;
}
</style>