<template>
  <v-container>
    <v-row>
      <v-col v-for="(difficulty, key) in actualDifficulties" :key="key" :id="difficulty">
        <ScoreList :songObj="songObj" :hash="hash" :difficulty="difficulty" :key="SongScoreListRefreshObj[difficulty]" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// @ is an alias to /src
import ScoreList from '~/components/SongDetail/ScoreList.vue'

export default {
  name: 'ScoreListList',
  components: {
    ScoreList
  },
  props: {
    "songObj": Object,
    "hash": String
  },
  data: function () {
    return {
      actualDifficulties: [],
      difficulties:['XD', 'Expert', 'Hard', 'Normal', 'Easy'],
      SongScoreListPageObj: {},
      SongScoreListRefreshObj: {},
    }
  },
  mounted() {
    this.setActualDifficulties();
    this.$on("changePage", e => {
      this.$data.SongScoreListPageObj[e.difficulty] = e.pageChange
      this.getScoreData();
    })
    this.$on("addPage", e => {
      if(e.pageChange == "back") { this.$data.SongScoreListPageObj[e.difficulty] = this.$data.SongScoreListPageObj[e.difficulty] - 1 }
      else if (e.pageChange == "next") { this.$data.SongScoreListPageObj[e.difficulty] = this.$data.SongScoreListPageObj[e.difficulty] + 1 }
      this.getScoreData();
    })
    this.$on("refreshComponent", e => {
      this.$data.SongScoreListRefreshObj[e] += 1
    })
  },
  methods: {
    setActualDifficulties: function() {
      if (this.songObj) {
        this.$data.difficulties.forEach(difficulty => {
          let key = `has${difficulty}Difficulty`;
          if ( key == "hasExpertDifficulty" ) { key = "hasExtremeDifficulty" }
          if (this.$props.songObj[key]) {
            this.$data.actualDifficulties.push(difficulty)
            this.$data.SongScoreListPageObj[difficulty] = 0
            this.$data.SongScoreListRefreshObj[difficulty] = 0
          }
        });
      }
    }
  },
  watch: {
    songObj: function() {
      this.setActualDifficulties();
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
