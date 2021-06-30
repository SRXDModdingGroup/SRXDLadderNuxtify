<template>
  <v-container>
    <v-row>
      <v-lazy
        :options="{
          threshold: .5
        }"
        transition="fade-transition"
        class="col col-12"
        v-for="song in songArr"
        :key="song.id"
      >
        <SongItem :songObj="song" :clickable="true" />
      </v-lazy>
    </v-row>
  </v-container>
</template>

<script>
import SSAPI from '~/modules/module.api.js'
import SongItem from '~/components/SongItems/SongItem.vue'


export default {
  name: 'SongList',
  components: {
    SongItem
  },
  props: {
    songArr: Array
  }
}
</script>
