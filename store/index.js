export const state = () => ({
  dark: false,
  steamID: "",
  multiHash: false,
  database: ""
})

export const mutations = {
  toggleDark(state, value) {
    state.dark = !state.dark;
    // Vue.prototype.$nuxt.$vuetify.theme.dark = state.dark;
  },
  setSteamID(state, steamID) {
    state.steamID = steamID;
  },
  setMultiHash(state, value) {
    state.multiHash = value;
  },
  setDatabase(state, value) {
    state.database = value;
  }
}


