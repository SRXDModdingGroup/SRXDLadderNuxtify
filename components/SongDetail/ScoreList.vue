<template>
<v-card>

  <v-toolbar dense>
    <v-toolbar-title>{{difficulty}}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn :disabled="pageIndex == 1" @click="pageIndex--" icon>
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-btn :disabled="(pageIndex-1) >= maxPage" @click="pageIndex++" icon>
      <v-icon>mdi-arrow-right</v-icon>
    </v-btn>
    <v-text-field
      v-model="pageIndex"
      dense
      solo
      hide-details
      label="Page"
      placeholder="1"
      rounded
      filled
      style="max-width: 60px;"
      class="pagenum"
      type="number"
    />

    <v-btn @click="refreshList" icon>
      <v-icon>mdi-refresh</v-icon>
    </v-btn>
    <v-btn :href='`steam://run/1058830//play "${songObj.fileReference}.srtb" difficulty ${difficulty}`' icon>
      <v-icon>mdi-play</v-icon>
    </v-btn>
  </v-toolbar>

  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th>No.</th>
          <th>Score:</th>
          <th>Steam Username:</th>
          <th>Rank:</th>
        </tr>
      </thead>
      <tbody>
        <ScoreListItem v-for="(score) in scoreArr" :scoreObj="score" :key="score.index" />
        <tr v-for="(empty, index) in emptyArr" :key="index">
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
        <tr>
          <th colspan="4">Your Score:</th>
        </tr>
        <ScoreListItem v-if="yourScore.length > 0" :scoreObj="yourScore[0]"/>
        <tr v-else>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</v-card>
</template>

<script>
import BACKBONE from '~/modules/module.backbone.js'
import ScoreListItem from '~/components/SongDetail/ScoreListItem.vue'


export default {
  name: 'ScoreList',
  components: {
    ScoreListItem
  },
  props: {
    'songObj': Object,
    'difficulty': String,
    'hash': String,
  },
  data: function(){
    return{
      maxPage: 0,
      pageIndex: 1,
      scoreArr: [],
      yourScore: [],
      emptyArr: []
    }
  },
  watch: {
  	'pageIndex': function() {
    	this.refreshList();
    }
  },
  mounted() {
    this.refreshList()
  },
  methods: {
    refreshList: async function() {
      let backbone = new BACKBONE;
      this.$data.scoreArr = await backbone.getScores(this.$props.hash, this.$props.difficulty, this.$data.pageIndex - 1, this.$store.state.multiHash, this.$store.state.database)
      if (this.$store.state.steamID != null){
        this.$data.yourScore = await backbone.getUserScore(this.$store.state.steamID,this.$props.hash, this.$props.difficulty, this.$store.state.multiHash, this.$store.state.database)
      }
      this.$data.emptyArr = new Array(12 - this.$data.scoreArr.length)
      if (this.$data.scoreArr[0]) this.$data.maxPage = this.$data.scoreArr[0].maxPage
      console.log("refreshed");
      return;
    }
  },
}
</script>
<style lang="scss" scoped>
.pagenum {
  ::v-deep .v-input__slot {
    padding: 0 0.55em !important;
    input {
      text-align: center;
    }
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    /* Firefox */
    input[type=number] {
      -moz-appearance: textfield;
    }
  }
}
</style>
