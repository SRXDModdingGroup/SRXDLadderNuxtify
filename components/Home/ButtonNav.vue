<template>
<v-app-bar app class="loose">
  <v-text-field
    solo
    hide-details
    filled
    :dense="densed"
    label="Search..."
    placeholder="Press Enter to Search..."
    prepend-inner-icon="mdi-magnify"
    :value="value"
    @change="update"
  />
  <template v-slot:extension>
    <v-row class="flex-nowrap">
      <v-col v-for="(item, key) in items" :key="key" class="pa-1 d-flex">
        <v-btn class="pa-0 grow"
          text
          color="primary"
          style="min-width: auto;"
          :href="item.to ? item.to : ''"
          :to=" item.to && item.to.includes('://') ? '' : item.to"
          :title="item.title"
          @click="item.click ? item.click() : ''"
        >
          <v-icon>{{ item.icon }}</v-icon>
          <img style="max-height: 24px;" v-if="item.icon.includes('://')" :src="item.icon">
        </v-btn>
      </v-col>
    </v-row>
  </template>
</v-app-bar>
</template>
<script>
export default {
  props: ['value'],
  methods: {
    update(e) {
      this.$emit('input', e)
    }
  },
  data () {
    return {
      items: [
        {
          icon: 'mdi-download',
          title: 'Download',
          to: 'https://github.com/SRXDModdingGroup/SRXDLadderModReleases/releases/latest/download/SRXDLadderModBepin.dll'
        },
        {
          icon: 'mdi-help-circle-outline',
          title: 'Help',
          to: 'https://srxdmoddingdocs.readthedocs.io/en/latest/Guides/1.%20Installing%20BepInEx/'
        },
        {
          icon: 'mdi-gavel',
          title: 'Legal',
          to: '/legal'
        },
        {
          icon: 'mdi-brightness-6',
          title: 'Dark/Light Mode',
          click: () => {this.$store.commit('toggleDark')}
        },
        {
          icon: 'https://spinshare.b-cdn.net/assets/img/favicon.png',
          title: 'SpinSha.re',
          to: 'https://spinsha.re/'
        }
      ]
    }
  },
  computed: {
    densed() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
          return true;
        default: return false;
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.loose {
  ::v-deep .v-toolbar__content {
    padding-left: 0.5em !important;
    padding-right: 0.5em !important;
  }
}
</style>

