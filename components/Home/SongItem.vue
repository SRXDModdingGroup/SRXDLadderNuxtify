<template>
  <v-col
    cols="12"
  >
    <v-lazy
      :options="{
        threshold: .5
      }"
      transition="fade-transition"
    >
    <v-card @click="getSpinshareReference">
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title class="text-h5" v-text="songObj.title"/>
          <v-card-subtitle class="text-h7">
            Artist: {{songObj.artist}}<br>
            Mapper: {{songObj.charter}}
          </v-card-subtitle>
        </div>

        <v-avatar
          class="ma-3"
          size="125"
          tile
        >
          <v-img :src="songObj.cover" :lazy-src="require('~/assets/img/defaultAlbumArt.jpg')">
            <template v-slot:placeholder>
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-avatar>
      </div>
    </v-card>
    </v-lazy>
  </v-col>
</template>

<script>
import SSAPI from '~/modules/module.api.js'
import BACKBONE from '~/modules/module.backbone.js'

export default {
  name: 'SongItem',
  data: function () {
    return {
    }
  },
  props: {
    'songObj': Object
  },
  mounted() {
  },
  methods: {
    getSpinshareReference: function() {
      let ssapi = new SSAPI;
      let backbone = new BACKBONE;
      ssapi.getSongDetail(this.$props.songObj.id).then(async e => {
        let hashArray = await backbone.getHashes(e.data.fileReference, this.$store.state.database);
        let hashString = new String();
        if (hashArray.filter(temp => temp.levelHash === e.data.updateHash).length > 0) {
          hashString = e.data.updateHash;
        }
        else if (hashArray.length == 0) {hashString = "0"}
        else {hashString = hashArray[0].levelHash}
        this.$router.push({ name: 'song-SpinshareReference-slug', params: {SpinshareReference: e.data.fileReference, slug: hashString} })
      });
    },
    getHash: async function() {
      let backbone = new BACKBONE;
      return await backbone.getHashes(this.$data.SpinshareReference, this.$store.state.database);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
