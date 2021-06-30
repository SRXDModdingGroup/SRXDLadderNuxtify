<template>

</template>

<script>
// @ is an alias to /src

export default {
  name: 'ScoreList',
  components: {
  },
  props: {
    "SongInfoObj": Object,
    "hash": String
  },
  data: function () {
    return {
      truth: [
        this.$props.SongInfoObj.hasXDDifficulty,
        this.$props.SongInfoObj.hasExtremeDifficulty,
        this.$props.SongInfoObj.hasHardDifficulty,
        this.$props.SongInfoObj.hasNormalDifficulty,
        this.$props.SongInfoObj.hasEasyDifficulty
      ],
      difficulties:['XD', 'Expert', 'Hard', 'Normal', 'Easy'],
      SongScoreListObj: {'XD': [], 'Expert': [], 'Hard': [], 'Normal': [], 'Easy': []},
      SongScoreListPageObj: {'XD': 0, 'Expert': 0, 'Hard': 0, 'Normal': 0, 'Easy': 0},
      SongScoreListRefreshObj: {'XD': 0, 'Expert': 0, 'Hard': 0, 'Normal': 0, 'Easy': 0},
    }
  },
  mounted() {
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
  }
}
</script>
<style lang="scss" scoped>

</style>
