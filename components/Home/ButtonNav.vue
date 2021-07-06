<template>
<v-app-bar app>
  <Settings :value="true" />
  <v-text-field
    solo
    hide-details
    filled
    :dense="densed"
    label="Search..."
    placeholder="Press Enter to Search..."
    :value="value"
    @change="update"
  />
  <template v-slot:extension>
    <v-row class="flex-nowrap">
      <v-col v-for="(item, key) in items" :key="key" class="pa-2 d-flex">
        <v-btn class="grow pa-0"
          :href="item.to ? item.to : ''"
          :to="item.to && item.to.includes('://') ? '' : item.to "
          :title="item.title"
          @click="item.title == 'Settings' ? options() : ''"
          dense
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
import Settings from '~/components/Home/Settings.vue'
export default {
  components: {
    Settings
  },
  props: ['value'],
  methods: {
    update(e) {
      this.$emit('input', e)
    },
    options() {
      console.log("f")
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
          icon: 'mdi-cog',
          title: 'Settings'
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
