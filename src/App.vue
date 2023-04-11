<template>
  <v-app>
    <div v-if="routname == 'login' || routname == 'signup' ">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logoTec.png"
          transition="scale-transition"
          width="180"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn text color="white" to="/">
        Iniciar sesión
      </v-btn>
      <v-btn text color="white" to="/signup">
        Registro
      </v-btn>

    </v-app-bar>
  </div>

  <div v-if="routname == 'home' || routname == 'about' ">
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="./assets/logoTec.png"
          transition="scale-transition"
          width="180"
        />
      </div>

      <v-spacer></v-spacer>
      <v-btn text color="white" to="/home">
        Inicio
      </v-btn>
      <v-btn text color="white" to="/about">
        Materias
      </v-btn>
      <v-btn text color="white" @click="logout">
        cerrar sesión
      </v-btn>

    </v-app-bar>
  </div>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
 import firebase from 'firebase';
export default {
  name: 'App',

  data: () => ({
    //
  }),

  computed:{
    routname(){
      return this.$route.name
    }
  },
  methods:{
    async logout(){
     await firebase.auth().signOut()
     this.$router.push("/")
  
    }
    }
  }
  
</script>
