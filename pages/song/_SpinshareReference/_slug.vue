<template>
  <SongItem :songObj="SongInfoObj" fluid />
</template>
<script>
import BACKBONE from '~/modules/module.backbone.js'
import SSAPI from '~/modules/module.api.js'
import SongItem from '~/components/SongItems/SongItem.vue'

export default {
  name: 'Song',
  components: {
    SongItem
  },
  async asyncData({ params }) {
    const selectedHash = params.slug
    const SpinshareReference = params.SpinshareReference
    return { selectedHash, SpinshareReference }
  },
  data: function () {
    return {
      hashArray: [],
      SongInfoObj: {},
      steamID: this.$store.state.steamID,
      refreshHashSectionKey: 0,

      multiHash: this.$store.state.multiHash,
      dbDropdown: this.$store.state.database,
      dbOptions: [
        { text: 'Main Database', value: '' },
        { text: 'PrePatch11Data', value: 'PrePatch11Data' }
      ]
    }
  },
  async mounted() {
    let ssapi = new SSAPI;
    this.$data.SongInfoObj = (await ssapi.getSongDetail(this.$data.SpinshareReference)).data
    this.mount()
  },
  watch: {
    multiHash() {
      this.$store.commit("setMultiHash", this.$data.multiHash)
      this.refreshHashSection();
    },
    dbDropdown() {
      this.$store.commit("setDatabase", this.$data.dbDropdown);
      this.mount();
      this.refreshHashSection();
    },
    selectedHash() {
      console.log("hash changed")
      this.refreshHashSection();
    },
  },
  methods: {
    mount: async function() {
      let backbone = new BACKBONE;

      this.$data.hashArray = await backbone.getHashes(this.$data.SpinshareReference, this.$store.state.database);

      //Displays if newest
      this.$data.hashArray.forEach(element => {
        element.newest = false;
        if (element.levelHash == this.$data.SongInfoObj.updateHash) {
          element.newest = true;
        }
      });

      if (this.$route.params.SongHash == "0"){
        this.$data.selectedHash = this.$data.hashArray[0].levelHash;
      }
    },
    hashChanger: function(hash) {
      this.$router.push({ name: 'Song', params: {SpinshareReference: this.$route.params.SpinshareReference, SongHash: hash} })
      window.location.reload();
    },
    backToHome: function () {
      this.$router.push({ name: 'Home', params: {} })
    },
    refreshHashSection: function() {
      this.$data.refreshHashSectionKey++
    },
    toggleMultiHash: function() {
      this.$data.multiHash = !this.$data.multiHash;
    },
    commitSteamID: function(params) {
      this.$store.commit("setSteamID", this.$data.steamID)
      this.refreshHashSection();
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.$data.selectedHash = to.params.SongHash
    next()
  }
}
</script>
