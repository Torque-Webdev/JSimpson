<template>
  <section
    id="get-in-touch"
    class="overflow-hidden"
  >
    <v-row
      class="info white--text"
      no-gutters
    >
      <v-col
        class="hidden-sm-and-down"
        md="6"
      >
        <v-img
          :src="require('@/assets/contact.png')"
          height="100%"
        />
      </v-col>

      <v-col
        class="pa-5"
        cols="12"
        md="6"
      >
        <base-bubble-1 />

        <base-heading class="mb-5">
          Get In Touch
        </base-heading>

        <v-sheet
          color="transparent"
          max-width="600"
        >
          <form
            class="mx-auto"
            @submit.prevent="submit"
          >
            <v-text-field
              v-model="name"
              color="info"
              label="Name"
              name="name"
              :error-messages="nameErrors"
              solo
              flat
              @input="$v.name.$touch()"
              @blur="$v.name.$touch()"
            />

            <v-text-field
              v-model="email"
              color="info"
              label="Email"
              name="email"
              :error-messages="emailErrors"
              solo
              flat
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
            />

            <v-text-field
              v-model="subject"
              color="info"
              label="Subject"
              name="subject"
              solo
              flat
              :error-messages="subjectErrors"
              @input="$v.subject.$touch()"
              @blur="$v.subject.$touch()"
            />

            <v-textarea
              v-model="message"
              color="info"
              label="Message"
              name="message"
              :error-messages="messageErrors"
              solo
              flat
              @input="$v.message.$touch()"
              @blur="$v.message.$touch()"
            />

            <v-btn
              color="secondary"
              rounded
              type="submit"
            >
              submit
            </v-btn>
            <alert-message :msg="msg" />
          </form>
        </v-sheet>
      </v-col>
    </v-row>
  </section>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  import emailjs from 'emailjs-com'
  import AlertMessage from '@/components/home/AlertMessage.vue'

  export default {
    name: 'GetInTouch',

    components: {
      AlertMessage,
    },

    mixins: [validationMixin],

    validations: {
      name: { required },
      email: { required, email },
      subject: { required },
      message: { required },
    },

    data: () => ({
      name: '',
      subject: '',
      email: '',
      message: '',
      msg: {
        type: 'error',
        message: '',
        status: false,
      },
    }),

    computed: {
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      subjectErrors () {
        const errors = []
        if (!this.$v.subject.$dirty) return errors
        !this.$v.subject.required && errors.push('Please enter a subject.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
      messageErrors () {
        const errors = []
        if (!this.$v.message.$dirty) return errors
        !this.$v.message.required && errors.push('A message is required.')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.msg = {
            type: 'error',
            message: 'Message not sent. Please fill the form correctly!',
            status: true,
          }
        } else {
          this.msg = {
            type: 'info',
            message: 'Sending ...',
            status: true,
          }
          const templateParams = {
            name: this.name,
            subject: this.subject,
            message: this.message,
            email: this.email,
          }

          this.sendEmail(templateParams)
        }
      },
      sendEmail (params) {
        emailjs
          .send(
            'service_mqk22oq',
            'js_template_zafqdvx',
            params,
            'user_nzDfhN2MWfSPkCKqEp7Td',
          )
          .then(
            (result) => {
              console.log('SUCCESS!', result.status, result.text)
              console.log(params)
              this.msg = {
                type: 'success',
                message: 'Message sent someone will be in touch shortly',
                status: true,
              }
            },
            (error) => {
              console.log('FAILED...', error)
              this.msg = {
                type: 'error',
                message: error,
                status: true,
              }
            },
          )
          .then(() => {
            this.clear()
          })
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.subject = ''
        this.email = ''
        this.message = ''
        this.msg = {
          type: '',
          message: '',
        }
      },
    },
  }
</script>
