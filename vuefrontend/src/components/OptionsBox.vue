<template>
  <v-checkbox
    dark
    v-model="checked"
    @change="changedState()"
  ></v-checkbox>
</template>

<script>
export default {
  data() {
    return {
      checked: this.$store.state.options.find(item => item === this.title)
    }
  },
  props: {
    title: String,
  },
  methods: {
    changedState () {
      if (this.$store.state.options.includes(this.title)) {
        this.$store.commit('removeOptionsValue', this.title)
        return;
      }
      this.$store.commit('addOptionsValue', this.title)
    }
  },
};
</script>
