<template>
  <v-dialog v-model="dialogDelete" max-width="500px">
    <v-card>
      <v-card-title class="headline"
        >Are you sure you want to delete this item?</v-card-title
      >
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" data-test="btn-cancel" text @click="closeDelete">Cancel</v-btn>
        <v-btn color="blue darken-1" data-test="btn-confirm" text @click="deleteItemConfirm">OK</v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class ConfirmModal extends Vue {
    private dialogDelete=true;

    closeDelete() {
      this.dialogDelete = false;
      this.$emit('cancel');
    }

    deleteItemConfirm() {
      this.dialogDelete = false;
      this.$emit('confirm');
    }
}
</script>
