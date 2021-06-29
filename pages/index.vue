<template>
  <div>
    <!-- navigation -->
    <v-app-bar app>
      <v-text-field
        solo
        hide-details
        label="Search..."
        placeholder="Searching using the SpinSha.re catalogue..."
        v-model="songSearchString"
        @change="getSongs"
      ></v-text-field>
      <template v-slot:extension>
        <ButtonNav />
      </template>
    </v-app-bar>

    <!-- songs -->
    <v-container>
      <v-row>
        <SongItem v-for="song in songArr" :key="song.id" :songObj="song" />
      </v-row>
    </v-container>
    <!-- <SongItem v-for="song in songArr" :key="song.id" :songObj="song" /> -->
  </div>
</template>

<script>
import SSAPI from '~/modules/module.api.js'
import ButtonNav from '~/components/Home/ButtonNav.vue'
import SongItem from '~/components/Home/SongItem.vue'


export default {
  name: 'Home',
  components: {
    ButtonNav,
    SongItem
  },
  data: function () {
    return {
      songSearchString: "",
      songArr: []
    }
  },
  mounted() {
    this.defaultSongs();
  },
  methods: {
    defaultSongs: function() {
      var ssapi = new SSAPI;
      ssapi.getHotThisWeekSongs(0).then(e => {
        this.$data.songArr = e;
      })
    },
    getSongs: function() {
      let ssapi = new SSAPI;
      if (this.$data.songSearchString != ''){
          ssapi.search(this.$data.songSearchString).then(e => {
          this.$data.songArr = e.data.songs;
          this.$data.isSearchActive = true;
        });
      }
      else { this.defaultSongs(); }
    }
  }
}
</script>
