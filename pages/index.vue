<template>
  <div>
    <!-- navigation -->
    <ButtonNav v-model="songSearchString" />

    <!-- songs -->
    <SongList :songArr="songArr" />
  </div>
</template>

<script>
import SSAPI from '~/modules/module.api.js'
import ButtonNav from '~/components/Home/ButtonNav.vue'
import SongList from '~/components/SongItems/SongList.vue'

export default {
  name: 'Home',
  components: {
    ButtonNav,
    SongList
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
  watch: {
    songSearchString(e) {
      this.getSongs()
    }
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
      if (this.$data.songSearchString.length >= 1){
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
