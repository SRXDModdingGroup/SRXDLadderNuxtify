<template>
<v-app-bar app>
      <v-text-field
        solo
        hide-details
        filled
        label="Search..."
        placeholder="Press Enter to Search..."
        :value="value"
        @change="update"
      ></v-text-field>
      <template v-slot:extension>
          <v-container>
          <v-row class="flex-nowrap">
            <v-col v-for="(item, key) in items" :key="key" class="d-flex">
              <v-btn class="grow"
                :href="item.to"
                :to=" item.to.includes('://') ? '' : item.to "
                :title="item.title"
              >
                <v-icon>{{ item.icon }}</v-icon>
                <img style="max-height: 24px;" v-if="item.icon.includes('://')" :src="item.icon">
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
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
          icon: 'https://spinshare.b-cdn.net/assets/img/favicon.png',
          title: 'SpinSha.re',
          to: 'https://spinsha.re/'
        }
      ]
    }
  }
}
</script>

