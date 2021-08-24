<template>
  <v-container>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">First Name</th>
            <th class="text-left">Last Name</th>
            <th class="text-left">Age</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in userData" :key="item.last_name">
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>{{ item.age }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>


    <!-- <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table dark
        :headers="headers"
        :search="search"
        :items="desserts"
      ></v-data-table>
    </v-card>
    <v-btn large color="primary" @click="readUsers">Show Users</v-btn> -->

    <v-layout row wrap v-for="lesion in lesions" :key="lesion.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-card-media
                  :src="lesion.imageUrl"
                  height="130px"
                ></v-card-media>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ lesion.title }}</h5>
                    <div>{{ lesion.date | date }}</div>
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/lesions/' + lesion.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View File
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>

</template>

<script>
  import { usersCollection } from "../firebase"
  
  export default {
    data () {
      return {
        userData: [
          { first_name: 'A', last_name: 'B', age: '1' },
          { first_name: 'C', last_name: 'D', age: '2' },
          { first_name: 'E', last_name: 'F', age: '3' }
        ],
      }
    },
    computed: {
      lesions () {
        return this.$store.getters.loadedLesions
      }
    },
    mounted () {
      this.readUsers();
    }, 
    methods: {
      readUsers () {
        let userData2 = []
        usersCollection
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userData2.push({
              id: doc.id,
              first_name: doc.data().first_name,
              last_name: doc.data().last_name,
              age: doc.data().age,
            });
            console.log(doc.id, " => ", doc.data());
          });
          console.log(userData2)
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
        //return userData
      } 
    }  
  }
</script>