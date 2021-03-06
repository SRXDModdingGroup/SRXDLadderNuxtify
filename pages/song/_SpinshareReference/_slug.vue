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
        <v-col class="d-flex"><v-btn @click="multiHash = !multiHash" :color="multiHash ? 'green lighten-1' : ''" class="grow">Enable Merging of Similar Versions</v-btn></v-col>
      </v-row>
      <v-row>
        <v-col class="d-flex"><v-text-field :value="steamID" @change="steamID=$event" label="Search Your SteamID Here..." placeholder="Press Enter to Submit..." hide-details solo dense></v-text-field></v-col>
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
  head() {
    return {
      title: this.songObj["title"] || this.SpinshareReference
    }
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
      refreshHashSectionKey: 0,
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
  computed: {
    steamID: {
      get() {
        return this.$store.state.steamID;
      },
      set(e) {
        this.$store.commit("setSteamID", e)
        this.refreshHashSection();
      }
    },
    multiHash: {
      get() {
        return this.$store.state.multiHash;
      },
      set(e) {
        this.$store.commit("setMultiHash", e)
        this.refreshHashSection();
      }
    },
    dbDropdown: {
      get() {
        return this.$store.state.database;
      },
      set(e) {
        this.$store.commit("setDatabase", e)
        this.refreshHashSection();
      }
    }
  },
  watch: {
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

      if (!this.$data.hashArray.filter((e) => { return e.levelHash === this.$data.selectedHash; }).length > 0 && this.$data.hashArray.length != 0){
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
  },
}
</script>
<style lang="scss" scoped>
::v-deep button {
  overflow: hidden;
  width: 100%;
}
</style>
