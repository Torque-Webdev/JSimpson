<template>
  <div>
    <v-container>
      <v-row>
        <v-col>
          <v-textarea
            v-model.trim="skills.title"
            rows="4"
            label="Skills Headline"
          />

          <a
            href="https://materialdesignicons.com/"
            target="_blank"
          >List of icons</a>

          <v-row>
            <v-col
              v-for="(item, i) in skills.items"
              :key="i"
              md="6"
              lg="4"
            >
              <v-icon>{{ 'mdi-'+item.icon }}</v-icon>

              <v-text-field
                v-model.trim="item.icon"
                label="Enter material design icon name"
              />

              <v-text-field
                v-model.trim="item.title"
                label="Skill name"
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
            Update skills
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
  import { skills } from '@/services/firebase'

  export default {
    data () {
      return {
        skills: {
          items: [{
            title: '',
            icon: '',
          }],
          title: '',
        },
        msg: {
          message: '',
          type: '',
        },
      }
    },
    computed: {
      skillsContent () {
        return this.$store.getters['skills/getContent']
      },
    },
    created () {
      this.skills = this.skillsContent
    },
    methods: {
      update () {
        skills.doc(this.skills.id).update({
          items: this.skills.items,
          title: this.skills.title,
        }).then(() => {
          this.msg = {
            message: 'Updated content',
            type: 'success',
          }
        })
      },
      add () {
        this.skills.items.push({ icon: '', title: '' })
      },
      remove (index) {
        this.skills.items.splice(index, 1)
      },
    },
  }
</script>
