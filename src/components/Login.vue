<template>
    <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3 primary--text">
          Inicio de Sesión 
        </h1>
      </v-col>
      </v-row>

    <v-sheet class="bg-deep-purple pa-12 " rounded>
      <v-card class="mx-auto px-6 py-8" max-width="800">
        <v-form
          v-model="form"
          @submit.prevent="onSubmit"
        >
          <v-text-field
            v-model="email"
            :rules="[rules.required, rules.email]"
            class="mb-2"
            clearable
            label="Correo"
            placeholder="Ingresa tu correo institucional"
          ></v-text-field>
  
          <v-text-field
            v-model="password"
            type="password"
            :rules="[rules.required, rules.counter]"
            clearable
            persistent-counter
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
          ></v-text-field>
  
          <br>
  
          <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            @click="onSubmit"
          >
            Iniciar sesión
          </v-btn>
        </v-form>
      </v-card>
    </v-sheet>
</v-container>
  </template>




<script>
import firebase from 'firebase';
  export default {
    data: () => ({
      form: false,
      email: null,
      password: null,
      loading: false,
    rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length >=8 || 'Minimo 8 caracteres',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
        },

    }),

    methods: {
      async onSubmit () {
        if (!this.form) return

        if(this.form){
          await firebase.auth().signInWithEmailAndPassword(this.email,this.password).catch((error) => {alert(error.message)})
          await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).update({
            last_login: firebase.firestore.FieldValue.serverTimestamp()
          })
          this.$router.push("/home")
        }
        setTimeout(() => (this.loading = false), 2000)
      },
      
    },

  }
</script>
  