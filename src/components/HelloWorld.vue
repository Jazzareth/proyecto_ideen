<template>
  <v-container>
    <v-row class="text-center">

      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3 primary--text">
          Información del Alumno
        </h1>
      </v-col>
      <v-col cols="12">
      <v-avatar size=large>
        <v-img
          :src="user.imagen"
          class="my-3"
          contain
        />
        </v-avatar>
      </v-col>
      </v-row>


      <v-row no-gutters class="text-center">
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <h3>Nombre Completo </h3>
          <p>{{user.nombre}}</p>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <h3>Matricula</h3>
          <p>{{user.matricula}}</p>
        </v-sheet>
      </v-col>
      </v-row>

      <v-row no-gutters class="text-center">
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <h3>Correo institucional </h3>
          <p>{{user.email_inst}}</p>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <h3>Carrera</h3>
          <p>ISC</p>
        </v-sheet>
      </v-col>
      </v-row>

      <v-row no-gutters class="text-center">
      <v-col>
        <v-sheet class="pa-2 ma-2">
          <h3>Correo personal </h3>
          <p>{{user.email}}</p>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet class="pa-2 ma-2">
        </v-sheet>
      </v-col>
    </v-row>


    </v-container>
</template>



<script>
import firebase from 'firebase';
  export default {
    name: "helloworld",

    async created(){
      this.user= await this.getuser()
    },

    data(){
      return{
        user:null

      }
    },
   methods:{
    async getuser(){
      const user = await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
      return user.data()
    }
    }
  }

  
</script>