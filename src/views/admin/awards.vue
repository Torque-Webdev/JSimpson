<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-row>
            <v-col
              v-for="(item, i) in awards.items"
              :key="i"
              md="6"
              lg="4"
            >
              <v-text-field
                v-model.trim="item.name"
                label="Award name"
              />

              <v-text-field
                v-model.trim="item.text"
                label="Award text"
              />

              <v-row
                align="center"
                justify="center"
              >
                <v-icon
                  color="green"
                  @click.native="add()"
                >
                  mdi-plus
                </v-icon>
                <v-icon
                  v-if=" i >= 1"
                  color="red"
                  @click.native="remove(i)"
                >
                  mdi-minus
                </v-icon>
              </v-row>
            </v-col>
          </v-row>

          <v-btn
            class="mt-10"
            @click="update"
          >
            Update awards
          </v-btn>
        </v-col>
      </v-row>
      <ui-message
        class="mt-2"
        :msg.sync="msg"
      />
    </v-container>
  </div>
</template>

<script>
  import { awards } from '@/services/firebase'

  export default {
    data () {
      return {
        awards: {
          items: [{
            name: '',
            text: '',
          }],
        },
        msg: {},
      }
    },
    computed: {
      awardsContent () {
        return this.$store.getters['awards/getContent']
      },
    },
    created () {
      this.awards = this.awardsContent
    },
    methods: {
      update () {
        awards.doc(this.awards.id).update({
          items: this.awards.items,
        }).then(() => {
          this.msg = {
            message: 'Updated content',
            type: 'success',
          }
        })
      },
      add () {
        this.awards.items.push({ name: '', text: '' })
      },
      remove (index) {
        this.awards.items.splice(index, 1)
      },
    },
  }
</script>
