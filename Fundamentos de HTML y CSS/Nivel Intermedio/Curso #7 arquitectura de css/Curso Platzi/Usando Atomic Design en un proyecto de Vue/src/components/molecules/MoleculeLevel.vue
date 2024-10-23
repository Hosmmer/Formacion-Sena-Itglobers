<template>
  <section class="level">
    <button @click="previousLevel" class="lower"> - </button>
    <img :src="dumbellImage" alt="dumbbell" class="image">
    <small class="info">{{ level }}</small>
    <button @click="nextLevel" class="higher"> + </button>
  </section>
  <section class="info">
    <h3>{{ title }}</h3>
    <p>{{ description }}</p>
  </section>
</template>

<script>
import { ref } from 'vue';

import dumbellImage from '@/assets/DUMBBELL.webp'
import store from '@/store';

export default {
  props: {
    level: {
      type: String,
      required: true,
      default: 'Level 1'
    },
    title: {
      type: String,
      required: true,
      default: 'Basix Level'
    },
    description: {
      type: String,
      required: true,
      default: 'I TRAIN A FEW TIMES PER MONTH',
    },
  },

  setup(props) {
    const myLevel = ref(1);
    const level = ref(props.level);
    const title = ref(props.title);
    const description = ref(props.description);

    const nextLevel = () => {
      if (myLevel.value < 4) {
        switch (myLevel.value) {
          case 1:
            myLevel.value = 2;
            level.value = 'Level 2';
            title.value = "Next Level"
            description.value = "I TRAIN 2-3 DAYS A WEEK"
            store.commit('setLevel', 2);
          break;
          case 2:
            myLevel.value = 3;
            level.value = 'Level 3';
            title.value = "Max Level"
            description.value = "I TRAIN 4-5 DAYS A WEEK"
            store.commit('setLevel', 3);
          break;
          case 3:
            myLevel.value = 4;
            level.value = 'Level 4';
            title.value = "X-Treme Level"
            description.value = "I AM ATHLEAN"
            store.commit('setLevel', 4);
          break;
        }
      }
    };

    const previousLevel = () => {
      if (myLevel.value > 1) {
        switch (myLevel.value) {
          case 2:
            myLevel.value = 1;
            level.value = 'Level 1';
            title.value = 'Basix Level'
            description.value = 'I TRAIN A FEW TIMES PER MONTH'
            store.commit('setLevel', 1);
          break;
          case 3:
            myLevel.value = 2;
            level.value = 'Level 2';
            title.value = "Next Level"
            description.value = "I TRAIN 2-3 DAYS A WEEK"
            store.commit('setLevel', 2);
          break;
          case 4:
            myLevel.value = 3;
            level.value = 'Level 3';
            title.value = "Max Level"
            description.value = "I TRAIN 4-5 DAYS A WEEK"
            store.commit('setLevel', 3);
          break;
        }
      }
    };

    return {
      dumbellImage,
      myLevel,
      level,
      title,
      description,
      nextLevel,
      previousLevel,
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  max-width: 100px;
}

.level {
  display: grid;
  max-width: fit-content;
  align-items: center;
  grid-template-areas: "buttonLower image buttonHigher"
                      ". info .";

  & .higher {
    grid-area: buttonHigher;
  }
  & .lower {
    grid-area: buttonLower;
  }
  & .image {
    grid-area: image;
  }
  & .info {
    grid-area: info;
  }

  & .lower {
    margin-right: 20px;
  }

  & .higher {
    margin-left: 20px;
  }
}

button {
  height: fit-content;
  margin: 20px 0;
  font-size: 1.2rem;
  border: 1px solid black;
  border-radius: 5px;
  padding: 8px 20px;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }

  &:active {
    color: #fff;
    background-color: #00bcd4;
    transform: scale(0.95);
  }
}

.info {
  margin-top: 20px;
  font-size: 1.2rem;
}
</style>