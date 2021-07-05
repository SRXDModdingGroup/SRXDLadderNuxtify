<template>
<div>
  <v-snackbar color="primary" v-model="multiHashWarningSnackbar" timeout="2000">
    The multiHash mode for querying is still quite experimental. Results may not reflect absolute reality.
    <template v-slot:action="{ attrs }">
      <v-btn color="green" v-bind="attrs" @click="multiHashWarningSnackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</div>
</template>

<script>
export default {
  props: ['value'],
  data: function () {
    return {
      multiHashWarningSnackbar: false
    }
  },
  methods: {
  },
  watch: {
    value: function(e) {
      if (e) {
        this.$data.multiHashWarningSnackbar = true;
      }
    }
  }
}
</script>
