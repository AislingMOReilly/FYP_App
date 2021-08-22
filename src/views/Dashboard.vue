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
  </v-container>
</template>

<script>
  import { usersCollection } from "../firebase"
  
  export default {
    data () {
      return {
        //userData: [],
        search: '',
        headers: [
          {
            text: 'Dessert (100g serving)',
            align: 'start',
            filterable: false,
            value: 'name',
          },
          { text: 'Calories', value: 'calories' },
          { text: 'Fat (g)', value: 'fat' },
          { text: 'Carbs (g)', value: 'carbs' },
          { text: 'Protein (g)', value: 'protein' },
          { text: 'Iron (%)', value: 'iron' },
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%',
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%',
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%',
          },
        ],
      }
    },
    computed: {
      lesions () {
        return this.$store.getters.loadedLesions
      }
    },
    // mounted () {
    //   this.readUsers();
    // }, 
    methods: {
      readUsers () {
        userData = []
        usersCollection
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userData.push({
              id: doc.id,
              first_name: doc.data().first_name,
              last_name: doc.data().last_name,
              age: doc.data().age,
            });
            console.log(doc.id, " => ", doc.data());
          });
          console.log(userData)
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
        return userData
      } 
    }  
  }
</script>