export const state = () => ({
  steamID: "",
  multiHash: false,
  database: ""
})

export const mutations = {
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
