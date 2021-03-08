<template>
  <v-container>
    <v-row class="text-center" max-with="800px">
      <v-data-table
        :headers="headers"
        :items="boats"
        :loading="loading"
        loading-text="Loading... Please wait"
        no-results-text="Please add new boat"
        sort-by="name"
        :single-expand="true"
        show-expand
        class="elevation-1"
        @item-expanded="showDescription"
      >
        <template v-slot:top>
          <Toolbar />
        </template>

        <template v-slot:item.actions="{ item }">
          <BoatButtonActions :id="item.id" />
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <DescriptionBoat :readonly="true" :id="item.id" />
          </td>
        </template>
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Boat } from '@/store/modules/boat/model';
import { Component, Vue } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue';
import DescriptionBoat from '@/components/DescriptionBoat.vue';

import BoatButtonActions from '@/components/BoatButtonActions.vue';
import { namespace } from 'vuex-class';

const boatModule = namespace('boat');

@Component({
  components: {
    BoatButtonActions,
    DescriptionBoat,
    Toolbar,
  },
})
export default class ListBoat extends Vue {
  @boatModule.State public boats!: Boat[];

  @boatModule.Action fetchAllBoats!: () => Promise<void>;

  @boatModule.Action fetchDetailBoatById!: (id: number) => Promise<void>;

  private loading = false;

  async showDescription(payload: ExpandedEvent) {
    const { value, item } = payload;

    if (value && item.id !== null) {
      this.loading = true;

      await this.fetchDetailBoatById(item.id);
      this.loading = false;
    }
  }

  private headers = [
    {
      text: 'Reference',
      align: 'start',
      value: 'id',
      width: 400,
    },
    { text: 'Name of boat', value: 'name', width: 400 },
    {
      text: 'Actions',
      value: 'actions',
      width: 200,
      sortable: false,
    },
  ];

  async mounted() {
    this.loading = true;

    await this.fetchAllBoats();
    this.loading = false;
  }
}

interface ExpandedEvent{
 value: boolean;
 item: Boat;
}
</script>
