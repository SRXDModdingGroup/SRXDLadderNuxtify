<template>
<div>
  <SongItem :songObj="songObj" />
  <ScoreListList :key="refreshHashSectionKey" :songObj="songObj" :hash="selectedHash" />

  <MultiHashWarning :value="multiHash" />

  <v-card>
    <v-container>
      <v-row>
        <v-col class="d-flex"><v-btn :href="`https://spinsha.re/song/${songObj.id}`" class="grow">Open in SpinSha.re</v-btn></v-col>
        <v-col class="d-flex"><v-btn :href="`spinshare-song://${SpinshareReference}`" class="grow">Open in Client</v-btn></v-col>
        <v-col class="d-flex"><v-btn @click="refreshHashSection" class="grow">Refresh All</v-btn></v-col>
        <v-col class="d-flex"><v-btn @click="multiHash = !multiHash" :color="multiHash ? 'green' : ''" class="grow">Enable Merging of Similar Versions</v-btn></v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex"><v-text-field v-model="steamID" @change="commitSteamID" label="Search Your SteamID Here..." placeholder="Press Enter to Submit..." hide-details solo dense></v-text-field></v-col>
        <v-col class="d-flex"><v-select :items="dbOptions" v-model="dbDropdown" label="Database" hide-details solo dense></v-select></v-col>
        <v-col class="d-flex">
          <v-menu>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                class="grow"
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <span v-if="hashArray.length != 0">{{ selectedHash }}</span>
                <span v-else>No Hashes Found</span>
              </v-btn>
            </template>
            <v-list v-if="hashArray.length != 0">
              <v-list-item
                v-for="(hash, index) in hashArray"
                :key="index"
                :to="{ name: 'song-SpinshareReference-slug', params: { 'SpinshareReference': SpinshareReference, slug: hash.levelHash } }"
              >
                <v-list-item-title><span v-if="hash.newest">Newest - </span>{{ hash.levelHash }} - {{hash.length}} Submitted Scores</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</div>
</template>
<script>
import BACKBONE from '~/modules/module.backbone.js'
import SSAPI from '~/modules/module.api.js'
import SongItem from '~/components/SongItems/SongItem.vue'
import ScoreListList from '~/components/SongDetail/ScoreListList.vue'
import MultiHashWarning from '~/components/SongDetail/MultiHashWarning.vue'

export default {
  name: 'Song',
  components: {
    SongItem,
    ScoreListList,
    MultiHashWarning
  },
  async asyncData({ params }) {
    let selectedHash = params.slug
    let SpinshareReference = params.SpinshareReference
    return { selectedHash, SpinshareReference }
  },
  data: function () {
    return {
      hashArray: [],
      songObj: {},
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
    this.$data.songObj = (await ssapi.getSongDetail(this.$data.SpinshareReference)).data
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
    },
  },
  methods: {
    mount: async function() {
      let backbone = new BACKBONE;

      this.$data.hashArray = await backbone.getHashes(this.$data.SpinshareReference, this.$store.state.database);

      //Displays if newest
      this.$data.hashArray.forEach(element => {
        element.newest = false;
        if (element.levelHash == this.$data.songObj.updateHash) {
          element.newest = true;
        }
      });

      if (this.$data.selectedHash == "0" && this.$data.hashArray.length != 0){
        this.$data.selectedHash = this.$data.hashArray[0].levelHash;
        this.refreshHashSection();
      }
    },
    backToHome: function () {
      this.$router.push({ name: 'index', params: {} })
    },
    refreshHashSection: function() {
      this.$data.refreshHashSectionKey++
    },
    commitSteamID: function(params) {
      this.$store.commit("setSteamID", this.$data.steamID)
      this.refreshHashSection();
    }
  },
}
</script>
<style lang="scss">
button {
  overflow: hidden;
  width: 100%;
}
</style>
