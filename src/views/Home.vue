<template>
  <v-parallax
    dark
    height="100%"
    src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
  >
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="3"></v-col>
      <v-col cols="9">
        <ListBoat/>
      </v-col>
    </v-row>
    </v-container >
  </v-parallax>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ListBoat from '@/components/ListBoat.vue';

@Component({
  components: {
    ListBoat,
  },
})
export default class Home extends Vue {}
</script>
<style scoped>
.v-parallax {
    height: 100%;
}
</style>
