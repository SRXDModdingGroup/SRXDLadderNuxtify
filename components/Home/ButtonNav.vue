<template>
  <v-container>
    <v-row class="flex-nowrap">
      <v-col v-for="(item, key) in items" :key="key" class="d-flex">
        <v-btn class="grow"
          :href="item.to"
          :to=" item.to.toLowerCase().includes('://') ? '' : item.to "
          :title="item.title"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
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
          icon: 'mdi-chart-bubble',
          title: 'SpinSha.re',
          to: 'https://spinsha.re/'
        }
      ]
    }
  }
}
</script>

