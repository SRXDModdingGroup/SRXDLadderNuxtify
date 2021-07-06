<template>
    <tr>
      <td>{{scoreObj.index}}</td>
      <td>{{scoreObj.score}}</td>
      <td><a :href="'https://steamcommunity.com/profiles/'+ this.$props.scoreObj.steamID">{{scoreObj.steamUsername}}</a></td>
      <td>{{rank}}</td>
    </tr>
</template>

<script>
import axios from 'axios';

export default {
  name: 'SongDetailScore',
  components: {
  },
  props: {
    'scoreObj': Object
  },
  data: function(){
    return{
      rank: this.$props.scoreObj.rank
    }
  },
  mounted() {
    if (Number.isInteger(this.$data.rank)) {
      this.$data.rank = this.getRank(this.$data.rank)
    }
  },
  methods: {
    getRank: function(rankIndex) {
      switch (rankIndex)
      {
          case 1: return "D";
          case 2: return "C";
          case 3: return "C+";
          case 4: return "B";
          case 5: return "A";
          case 6: return "A+";
          case 7: return "S";
          case 8: return "S+";
          default: return "Err";
      }
    }
  }
}
</script>
