<template>
  <v-toolbar flat>
    <v-toolbar-title>List of boat</v-toolbar-title>
    <v-divider class="mx-4" inset vertical></v-divider>
    <v-spacer/>
    <v-dialog v-model="dialogAddBoat" max-width="500px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
          Add  boat
        </v-btn>
      </template>
      <EditBoatModal @close="closeDialogAddBoat" v-if="dialogAddBoat">
        <template #header>
            <span class="headline">New boat </span>
        </template>
      </EditBoatModal>
    </v-dialog>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import EditBoatModal from '@/components/EditBoatModal.vue';

@Component({
  components: {
    EditBoatModal,
  },
})
export default class Toolbar extends Vue {
private dialogAddBoat=false;

closeDialogAddBoat() {
  this.dialogAddBoat = false;
}
}
</script>
