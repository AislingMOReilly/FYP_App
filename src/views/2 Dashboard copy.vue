<template>
  <v-container>
    <v-simple-table dark>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">First Name</th>
            <th class="text-left">Last Name</th>
            <th class="text-left">DOB</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item.last_name">
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>{{ item.dob }}</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>


    <v-card>
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
        :item-key="id"
      ></v-data-table>
    </v-card>
    <v-btn large color="primary" @click="readUsers">Show Users</v-btn>


<!-- ///////////////////// From example
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
                  <v-btn text :to="'/lesions/' + lesion.id">
                    <v-icon left light>mdi-arrow-forward</v-icon>
                    View File
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout> -->

  </v-container>

</template>

<script>
  import { usersCollection } from "../firebase"
  
  export default {
    data () {  
      return {
        currentUser: this.user(),
        lesionCollection: {},
        users: this.readUsers()
      }
    },
    computed: {
      lesions () {
        return this.$store.getters.loadedLesions
      },
      headers() {
        return Object.keys(this.lesionCollection)
      }
    },
    mounted: {
      async tableData() {
        let lesionsSnapshot = await usersCollection.doc(this.currentUser.id).collection('lesions').get()
        //this.lesionCollection
        lesionsSnapshot.forEach(doc => {
          this.lesionCollection[doc.id] = doc.data()
        })
        return this.lesionCollection
      }
    }, 
    methods: {
      user () {
        return {id: 'bpd27bptyvWc4ulqSoC9'}
      },
      // headers() {
        // return Object.keys(this.lesionCollection)
        // usersCollection.doc(this.currentUser.id).collection('lesions')
        // .onSnapshot((lesionSnapshot) => {
        //   var lesions = []
        //   lesionSnapshot.forEach((doc) => {
        //     lesions.push(doc.data())
        //   })
        // })
      // },
      
      readUsers () {
        let userData = []
        usersCollection
        .get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            userData.push({
              id: doc.id,
              first_name: doc.data().first_name,
              last_name: doc.data().last_name,
              dob: doc.data().dob,
              email: doc.data().email,
            });
          });
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
        return userData
      } 
    }  
  }
</script>