import { createStore } from 'vuex'

export default createStore({
  state: {
    isUpperSelected: false,
    isLowerSelected: false,
    isObliquesSelected: false,
    isBodyweightSelected: true,
    isTennisBallSelected: false,
    isChinupBarSelected: false,
    isDumbbellSelected: false,
    isResistanceBandSelected: false,
    isPhysioballSelected: false,
    level: 1,
  },

  getters: {
    isUpperSelected: state => state.isUpperSelected,
    isLowerSelected: state => state.isLowerSelected,
    isObliquesSelected: state => state.isObliquesSelected,
    isBodyweightSelected: state => state.isBodyweightSelected,
    isTennisBallSelected: state => state.isTennisBallSelected,
    isChinupBarSelected: state => state.isChinupBarSelected,
    isDumbbellSelected: state => state.isDumbbellSelected,
    isResistanceBandSelected: state => state.isResistanceBandSelected,
    isPhysioballSelected: state => state.isPhysioballSelected,
    level: state => state.level,
  },

  mutations: {
    setUpperSelected(state, value) {
      state.isUpperSelected = value
    },

    setLowerSelected(state, value) {
      state.isLowerSelected = value
    },

    setObliquesSelected(state, value) {
      state.isObliquesSelected = value
    },

    setAllSelected(state, value) {
      state.isUpperSelected = value
      state.isLowerSelected = value
      state.isObliquesSelected = value
    },

    setTennisBallSelected(state, value) {
      state.isTennisBallSelected = value
    },

    setChinupBarSelected(state, value) {
      state.isChinupBarSelected = value
    },

    setDumbbellSelected(state, value) {
      state.isDumbbellSelected = value
    },

    setResistanceBandSelected(state, value) {
      state.isResistanceBandSelected = value
    },

    setPhysioballSelected(state, value) {
      state.isPhysioballSelected = value
    },

    setLevel(state, value) {
      state.level = value
    },

    clearState(state) {
      state.isUpperSelected = false
      state.isLowerSelected = false
      state.isObliquesSelected = false
      state.isBodyweightSelected = true
      state.isTennisBallSelected = false
      state.isChinupBarSelected = false
      state.isDumbbellSelected = false
      state.isResistanceBandSelected = false
      state.isPhysioballSelected = false
      state.level = 1
    }
  },

  actions: {
  },

  modules: {
  }
})
