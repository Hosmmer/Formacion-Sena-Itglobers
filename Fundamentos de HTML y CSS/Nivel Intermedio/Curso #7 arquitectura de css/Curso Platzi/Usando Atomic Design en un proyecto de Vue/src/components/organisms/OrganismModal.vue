<template>
  <main class="main" v-if="exercisesToDo.length < 1">
    <header>
      <h1 v-if="firstSlide">WHAT DO YOU WANT TO TRAIN?</h1>
      <h1 v-else-if="secondSlide">SELECT YOUR EQUIPMENT</h1>
      <h1 v-if="fourthSlide">CHOOSE YOUR FITNESS LEVEL</h1>
    </header>
    <hr>
    <section>
      <div v-if="firstSlide" class="firstSlide">
        <AtomTrainingButton
          text="Specific area"
          @nextStep="specificArea"
          class="trainingButton"
        />
        <AtomTrainingButton
          text="My entire core"
          @nextStep="nextSlide"
          class="trainingButton"
          @click="allSelected"
        />
        <AtomTrainingButton
          text="Saved workouts"
          @nextStep="favorites"
          class="trainingButton"
        />
      </div>
      <div v-else-if="secondSlide" class="secondSlide">
        <h2>Note: Bodyweight is always selected</h2>
        <div class="options">
          <MoleculeOption
            v-for="(option, index) in options"
            :key="index"
            :image="option.image"
            :alt="option.alt"
            :text="option.text"
            @select="emitIndexOption(index)"
          />
        </div>
        <AtomNextShuffle text="Next" @click="lastSlide" />
      </div>
      <div v-else-if="thirdSlide" class="thirdSlide">
        <button @click="setUpper">
          upper
        </button>

        <button @click="setLower">
          lower
        </button>

        <button @click="setObliques">
          obliques
        </button>
      </div>
      <div v-else-if="fourthSlide" class="fourthSlide">
        <MoleculeLevel
          level="Level 1"
          title="Basix Level"
          description="I TRAIN A FEW TIMES PER MONTH"
        />
        <AtomNextShuffle text="Shuffle" @click="shuffleAbWorkout" />
      </div>
    </section>
  </main>
  <section v-else class="final">
    <div v-for="exercise, index in (exercisesToDo)" :key="index">
      <p>{{ exercise.title }}</p>
    </div>
  </section>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import AtomTrainingButton from '@/components/atoms/AtomTrainingButton.vue'
import MoleculeOption from '@/components/molecules/MoleculeOption.vue'
import AtomNextShuffle from '@/components/atoms/AtomNextShuffle.vue'
import MoleculeLevel from '@/components/molecules/MoleculeLevel.vue'

import { options } from '@/utils/options';
import store from '@/store';

import { mixExercises } from '@/utils/mixExercises'

export default {
  components: {
    AtomTrainingButton,
    MoleculeOption,
    AtomNextShuffle,
    MoleculeLevel
},

  setup() {
    const exercisesToDo = ref([]);

    const router = useRouter();

    const firstSlide = ref(true);
    const secondSlide = ref(false);
    const thirdSlide = ref(false);
    const fourthSlide = ref(false);

    const nextSlide = () => {
      if (firstSlide.value) {
        firstSlide.value = false;
      }
      if (!secondSlide.value) {
        secondSlide.value = true;
      }
    };

    const lastSlide = () => {
      firstSlide.value = false;
      secondSlide.value = false;
      thirdSlide.value = false;
      fourthSlide.value = true;
    }

    const specificArea = () => {
      thirdSlide.value = true;
      firstSlide.value = false;
      secondSlide.value = false;
    }

    const favorites = () => {
      router.push('/favorites');
    }

    const shuffleAbWorkout = () => {
      exercisesToDo.value = mixExercises()
    }

    const setUpper = () => {
      store.commit('setUpperSelected', true);
      store.commit('setLowerSelected', false);
      store.commit('setObliquesSelected', false);
      nextSlide();
    }

    const setLower = () => {
      store.commit('setLowerSelected', true);
      store.commit('setUpperSelected', false);
      store.commit('setObliquesSelected', false);
      nextSlide();
    }

    const setObliques = () => {
      store.commit('setObliquesSelected', true);
      store.commit('setLowerSelected', false);
      store.commit('setUpperSelected', false);
      nextSlide();
    }

    const emitIndexOption = (index) => {
      switch (index) {
        case 1:
          store.getters.isTennisBallSelected
            ? store.commit('setTennisBallSelected', false)
            : store.commit('setTennisBallSelected', true);
          break;
        case 2:
          store.getters.isChinupBarSelected
            ? store.commit('setChinupBarSelected', false)
            : store.commit('setChinupBarSelected', true);
          break;
        case 3:
          store.getters.isDumbbellSelected
            ? store.commit('setDumbbellSelected', false)
            : store.commit('setDumbbellSelected', true);
          break;
        case 4:
          store.getters.isResistanceBandSelected
            ? store.commit('setResistanceBandSelected', false)
            : store.commit('setResistanceBandSelected', true);
          break;
        case 5:
          store.getters.isPhysioballSelected
            ? store.commit('setPhysioballSelected', false)
            : store.commit('setPhysioballSelected', true);
          break;
      }
    }

    const allSelected = () => {
      store.commit('setAllSelected', true);
    }

    return {
      firstSlide,
      secondSlide,
      thirdSlide,
      fourthSlide,
      nextSlide,
      lastSlide,
      favorites,
      specificArea,
      options,
      shuffleAbWorkout,
      setUpper,
      setLower,
      setObliques,
      emitIndexOption,
      allSelected,
      exercisesToDo
    };
  }
}
</script>

<style lang="scss" scoped>
.firstSlide,
.thirdSlide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

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

.secondSlide .options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.fourthSlide {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.final {
  display: flex;
  flex-direction: column;
  align-items: center;

  & div {
    background-color: #000000e8;
    width: 25%;
    margin: 15px 0;

    & p {
      color: white;
      text-transform: uppercase;
    }
  }
}

</style>