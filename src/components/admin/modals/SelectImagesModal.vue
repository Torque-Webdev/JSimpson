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
            <v-toolbar-title>Select images</v-toolbar-title>
            <v-spacer />
            <v-btn
              icon
              @click="close"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-items>
              <v-btn
                dark
                text
                :disabled="selectedImages == []"
                @click.native="saveSelection"
              >
                Save
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
        </v-card-title>

        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="9">
                <v-row>
                  <v-col
                    v-for="(img, index) in paginatedData"
                    :key="index"
                    class="p-2"
                    cols="3"
                  >
                    <div
                      class="custom-control custom-checkbox custom-control text-center"
                    >
                      <img
                        :src="img.url"
                        :alt="img.alt"
                        style="width:100%"
                      >
                      <input
                        :id="img.id"
                        v-model="selectedImages"
                        type="checkbox"
                        class="custom-control-input"
                        :value="img"
                      >
                      <label
                        class="custom-control-label"
                        :for="img.id"
                      >
                        {{ img.alt }}
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
              </v-col>
              <v-divider vertical />
              <v-col
                class="fixed"
                cols="2"
              >
                <v-col
                  v-for="(img, index) in selectedImages"
                  :key="index"
                  class="p-2"
                  cols="12"
                >
                  <img
                    :src="img.url"
                    :alt="img.alt"
                    style="width:100%"
                  >
                </v-col>
                <div class="d-flex">
                  <v-btn
                    class="mx-1"
                    color="primary"
                    @click.native="saveSelection"
                  >
                    Confirm
                  </v-btn>
                  <v-btn
                    class="mx-1"
                    color="error"
                    @click.native="close"
                  >
                    Close
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { pagination } from '@/mixins/pagination'
  export default {
    mixins: [pagination],
    props: {
      images: {
        type: Array,
        default: () => [],
      },
    },
    data () {
      return {
        selectedImages: [],
        selectModel: false,
      }
    },
    computed: {
      items () {
        return this.$store.getters['images/getImages']
      },
    },
    methods: {
      select () {
        this.selectModel = true
      },
      close () {
        this.selectModel = false
        this.selectedImages = []
      },
      saveSelection () {
        this.$emit('update:images', this.selectedImages)
        this.close()
      },
    },
  }
</script>
