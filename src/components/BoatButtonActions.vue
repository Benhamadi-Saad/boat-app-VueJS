<template>
  <div>
    <v-icon small data-test="btn-edit" class="mr-2" @click="editItem">
      mdi-pencil
    </v-icon>
    <v-icon small data-test="btn-delete" @click="openConfirmModal">
      mdi-delete
    </v-icon>
    <ConfirmModal
      v-if="showConfirmModal"
      @confirm="deleteItem(id)"
      @cancel="closeConfirmModal"
    />
    <EditBoatModal v-if="showEditModal" :id="id" @close="closeEditBoatModal">
      <template #header>
        <span class="headline">Edit boat </span>
      </template>
    </EditBoatModal>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import ConfirmModal from '@/components/ConfirmModal.vue';
import EditBoatModal from '@/components/EditBoatModal.vue';
import { namespace } from 'vuex-class';

const boatModule = namespace('boat');
@Component({
  components: {
    ConfirmModal,
    EditBoatModal,
  },
})
export default class BoatButtonActions extends Vue {
  @Prop({ required: true }) public id!: number;

  @boatModule.Action deleteBoatById!: (id: number) => Promise<void>;

  private showConfirmModal = false;

  private showEditModal = false;

  openConfirmModal() {
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.showConfirmModal = false;
  }

  async deleteItem(id: number) {
    this.closeConfirmModal();
    await this.deleteBoatById(id);
  }

  editItem() {
    this.showEditModal = true;
  }

  closeEditBoatModal() {
    this.showEditModal = false;
  }
}
</script>
