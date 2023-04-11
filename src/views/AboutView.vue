<template>
  <v-container>
    <v-row justify="center">

      <v-col cols="8">

        <h1 text-center class="display-2 font-weight-bold mb-3 primary--text"> Materias inscritas </h1>

        <v-container v-for="(course,index) in courses" :key="index">
          <v-card>
            <v-card-title>
              <h2 class="font-weight-bold mb-3 primary--text">{{course.name}}</h2>
            </v-card-title>
            <v-card-text>
              <p>Profesor: {{course.teacher}}</p>
            </v-card-text>
            <v-card-actions>

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog[course.name]" width="auto">
              <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-bind="attrs"
                    v-on="on"
                    class="body-2 font-weight-bold text-capitalize"
                    color="primary"
                    text
                    >Ver Detalles
                  
                  </v-btn>
                </template>
               
              
                <v-card>
                  <v-card-title>
                    <h1>{{course.name}}</h1>
                  </v-card-title>
                  <v-card-text>
                    <p>Profesor:{{course.teacher}}</p>
                    <p>Salon:{{course.c_room}}</p>
                    <p>Fecha:{{course.c_dates}}</p>
                    <p>Horario:{{course.c_time}}</p>
                  </v-card-text>
                  <v-card-actions>
                    <v-btn color="primary" block @click="dialog[course.name] = false">Cerrar</v-btn>
                  </v-card-actions>
                </v-card>

              </v-dialog>

            </v-card-actions>
          </v-card>
        </v-container>


      </v-col>

    </v-row>
  </v-container>
</template>







<script>

import firebase from 'firebase';

  export default {
    name: "coursList",
    async mounted(){
      await this.getCourses();
    },
    data(){
      return{
        courses:[],
        dialog:{},
      }
    },
   methods:{
    async getCourses(){
      firebase.firestore().collection('courses').get().then((querySnapshot)=>{
        querySnapshot.forEach((doc)=>{
          this.courses.push(doc.data());
        });
      });
    },

    }
  }

  
</script>