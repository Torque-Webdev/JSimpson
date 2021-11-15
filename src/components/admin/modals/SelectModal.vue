<template>
  <div>
    <v-btn
      class="mx-1"
      @click.native="select"
    >
      Select
    </v-btn>

    <v-dialog
      v-model="selectModel"
      persistent
      scrollable
    >
      <v-card>
        <v-card-title class="pa-0">
          <v-toolbar
            flat
            dark
            color="primary"
          >
            <v-toolbar-title>Select an image</v-toolbar-title>
            <v-spacer />
            <v-btn
              icon
              @click="selectModel = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-items>
              <v-btn
                dark
                text
                :disabled="selected == ''"
                @click.native="saveSelection"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                v-for="(itm, index) in paginatedData"
                :key="index"
                class="p-0"
                cols="3"
              >
                <div
                  class="custom-control custom-radio custom-control text-center"
                >
                  <img
                    :src="itm.url"
                    :alt="itm.alt"
                    class="img-fluid"
                  >
                  <input
                    :id="itm.id"
                    v-model="selected"
                    name="images"
                    type="radio"
                    class="custom-control-input"
                    :value="{ itemData: itm }"
                  >
                  <label
                    class="custom-control-label"
                    :for="itm.id"
                  >
                    {{ itm.alt }}
                  </label>
                </div>
              </v-col>
              <v-col
                cols="12"
                class="text-center"
              >
                <v-btn
                  :class="{ 'd-none': pageNumber == 0 }"
                  class="primary"
                  @click.native="prevPage"
                >
                  <v-icon> mdi-chevron-double-left</v-icon>
                </v-btn>
                {{ pageNumber + 1 }} of {{ pageCount }}
                <v-btn
                  :class="{ 'd-none': pageNumber >= pageCount - 1 }"
                  class="primary"
                  @click.native="nextPage"
                >
                  <v-icon> mdi-chevron-double-right</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            class="mx-1"
            :disabled="selected == ''"
            @click.native="saveSelection"
          >
            Save
          </v-btn>
          <v-btn
            color="error"
            class="mx-1"
            @click="selectModel = false"
          >
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { pagination } from '@/mixins/pagination'
  export default {
    mixins: [pagination],
    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
      items: {
        type: Array,
        default: () => [],
      },
    },
    data () {
      return {
        selected: '',
        selectModel: false,
        itemData: {},
        radios: null,
      }
    },
    methods: {
      select () {
        this.selectModel = true
      },
      saveSelection () {
        this.$emit('update:item', this.selected.itemData)
        this.selectModel = false
      },
    },
  }
</script>
