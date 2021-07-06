<template>
  <v-app dark>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }} SRXDModdingGroup | Commit: {{ commitSha }}</span>
    </v-footer>
  </v-app>
</template>
<script>
  export default {
    data() {
      return {
        commitSha: process.env["GITHASH"]
      }
    },
    computed: {
      dark() {
        return this.$store.state.dark;
      }
    },
    watch: {
      dark(e) {
        this.$vuetify.theme.dark = e;
      }
    },
    mounted() {
      this.$vuetify.theme.dark = this.dark;
    }
  }
</script>
