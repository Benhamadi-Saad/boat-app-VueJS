<template>
  <v-container fluid>
    <ValidationProvider
      name="description"
      :rules="{
        required: true,
      }"
      v-slot="{ errors }"
      :disabled="readonly"
    >
      <v-textarea
        outlined
        label="Description of boat"
        auto-grow
        :counter="!readonly"
        :clearable="!readonly"
        :readonly="readonly"
        :error-messages="errors"
        v-model="description"
        data-test="data-description"
      >
        <template #message="{ message }">
          <div class="caption error--text" data-test="data-description-error">
            {{ message }}
          </div>
        </template>
      </v-textarea>
    </ValidationProvider>
  </v-container>
</template>

<script lang="ts">
import { BoatDetail } from '@/store/modules/boat/model';
import {
  Component, Vue, Prop, Watch,
} from 'vue-property-decorator';
import { ValidationProvider } from 'vee-validate';
import { namespace } from 'vuex-class';

const boatModule = namespace('boat');

@Component({
  components: {
    ValidationProvider,
  },
})
export default class DescriptionBoat extends Vue {
  @Prop({ required: true }) public id!: number;

  @Prop({ required: false }) public readonly!: boolean;

  @boatModule.State boats!: BoatDetail[];

  private localValue: string |null = '';

  public get description(): string| null {
    return this.boats.find((boat) => boat.id === this.id)?.description || this.localValue;
  }

  public set description(value: string|null) {
    this.localValue = value;
  }

  @Watch('localValue') onValueChanged(value: string) {
    this.$emit('input', value);
  }
}
</script>
