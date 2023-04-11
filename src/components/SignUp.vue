<template>
    <v-container>
        <v-row class="text-center">

        <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3 primary--text">
            Crea una cuenta
        </h1>
        </v-col>
        </v-row>
        <v-sheet class="bg-deep-purple pa-12 " rounded>
        <v-card class="mx-auto px-6 py-8" max-width="800" 
        title="User Registration">
            <v-form
            v-model="form"
            @submit.prevent="onSubmit"
            >
              <v-container>
                    <v-text-field
                    v-model="name"
                    color="primary"
                    label="Nombre"
                    variant="underlined"
                    :rules="[rules.required]"
                    ></v-text-field>
            
                    <v-text-field
                    v-model="matricula"
                    color="primary"
                    label="Matricula"
                    variant="underlined"
                    :rules="[rules.required]"
                    ></v-text-field>
            
                    <v-text-field
                        v-model="email"
                        :rules="[rules.required, rules.email]"
                        class="mb-2"
                        clearable
                        label="Correo Personal"
                    ></v-text-field>

                    <v-text-field
                        v-model="email_inst"
                        :rules="[rules.required, rules.email]"
                        class="mb-2"
                        clearable
                        label="Correo institucional"
                    ></v-text-field>
            
                    <v-text-field
                        v-model="password"
                        :rules="[rules.required, rules.counter, rules.segura]"
                        clearable
                        label="Password"
                        placeholder="Enter your password"
                    ></v-text-field>

                    <v-text-field
                        v-model="con_pass"
                        :rules="[rules.required,rules.counter]"
                        clearable
                        persistent-counter
                        label="Confirmar Password"
                        placeholder="Enter your password"
                    ></v-text-field>
            
            
                    <v-checkbox
                    v-model="terms"
                    color="secondary"
                    :readonly="loading"
                    label="I agree to site terms and conditions"
                    ></v-checkbox>
              </v-container>
      
              <v-divider></v-divider>
      
              <v-card-actions>
                  <v-spacer></v-spacer>
          
                  <v-btn color="primary" @click="onSubmit"
                  :disabled="!form"
                  block>
                  Registrarse
                  <v-icon icon="mdi-chevron-right" end></v-icon>
                  </v-btn >
          </v-card-actions>
        </v-form>
        </v-card>
        </v-sheet>
    </v-container>
  </template>



<script>

import firebase from 'firebase';

export default {
  data: () => ({
    name: null,
    matricula: null,
    email_inst: null,
    email: null,
    password: null,
    con_pass: null,
    terms: false,
    rules: {
          required: value => !!value || 'Required.',
          counter: value => value.length >=8 || 'Minimo 8 caracteres',
          segura: value => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])./.test(value) || 'Password debe terner minimo una mayuscula , minuscula, un numero y un caracter especial',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'Invalid e-mail.'
          },
          igual: value => value === password || 'La contraseña no es la misma',
        },
  }),

  methods: {
     async onSubmit () {
        if (!this.form) return

        if(this.form){
          await firebase.auth().createUserWithEmailAndPassword(this.email_inst,this.password)
          const imagen = await firebase.storage().ref('user.juan.jpeg').getDownloadURL().catch((error) => {alert(error.message)})

          await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).set({
            'nombre':this.name,
            'matricula':this.matricula,
            'email':this.email,
            'email_inst':this.email_inst,
            'imagen':imagen
          }).catch((error) => {alert(error.message)})

          console.log(firebase.auth().currentUser.uid)

          this.$router.push("/")
          
        }
        setTimeout(() => (this.loading = false), 2000)
      },
      
    },
}
</script>