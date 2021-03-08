<template>
  <v-dialog v-model="showDialog" max-width="800px">
    <v-card>
      <ValidationObserver ref="observer" v-slot="{ invalid,handleSubmit,valid }">
        <v-card-title>
          <slot name="header" />
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <ValidationProvider
                  name="name"
                  :rules="{ required: true }"
                  v-slot="{ errors }"
                >
                  <v-text-field
                    v-model="editedBoat.name"
                    filled
                    counter="90"
                    label="Name"
                    required
                    :error-messages="errors"
                    outlined
                    dense
                    data-test="data-name"
                  >
                    <template #message="{ message }">
                      <div class="caption error--text" data-test="data-name-error">
                        {{ message }}
                      </div>
                    </template>
                  </v-text-field>
                </ValidationProvider>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <DescriptionBoat
                  :id="id"
                  @input="setDescription"
                >
                </DescriptionBoat>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" @click="close"> Cancel </v-btn>
          <v-btn color="blue darken-1" data-test="btn-save" text :disabled="invalid" @click="handleSubmit(save)">
            Save
          </v-btn>
          <div>{{valid}}</div>
        </v-card-actions>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { namespace } from 'vuex-class';
import { BoatDetail } from '@/store/modules/boat/model';
import { ValidationProvider, ValidationObserver } from 'vee-validate';
import DescriptionBoat from '@/components/DescriptionBoat.vue';

const boatModule = namespace('boat');

@Component({
  components: {
    ValidationProvider,
    ValidationObserver,
    DescriptionBoat,
  },
})
export default class EditBoatModal extends Vue {
  @Prop({ required: false, default: null }) public id!: number | null;

  @boatModule.State boats!: BoatDetail[];

  @boatModule.Action createBoat!: (newBoat: BoatDetail) => Promise<void>;

  @boatModule.Action updateBoat!: (editedBoat: BoatDetail) => Promise<void>;

  @boatModule.Action fetchDetailBoatById!: (id: number) => Promise<void>;

  private editedBoat: BoatDetail = {
    id: this.id,
    name: null,
    description: null,
  };

  public get showDialog(): boolean {
    return (
      this.editedBoat.description !== null
      || this.editedBoat.description === null
    );
  }

  public set showDialog(value: boolean) {
    if (!value) {
      this.close();
    }
  }

  public setDescription(value: string) {
    this.editedBoat.description = value;
  }

  async save() {
    console.log('this.id', this.id);
    if (this.id !== null) {
      await this.updateBoat(this.editedBoat);
    } else {
      await this.createBoat(this.editedBoat);
    }
    this.close();
  }

  async close() {
    this.$emit('close');
  }

  async mounted() {
    if (this.id !== null) {
      await this.fetchDetailBoatById(this.id);

      const { name = '', description = '' } = this.boats.find((boat) => boat.id === this.id) || {};
      this.editedBoat = { ...this.editedBoat, name, description };
    }
  }
}
</script>
