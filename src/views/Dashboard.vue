<template>
  <v-container rounded class="table-container">

    <v-card v-if="!imageSelected">
      <v-card-title>
        Lesion Images
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>

      <v-data-table dark
        :v-model="selectedRows"
        :headers="headers"
        :search="search"
        :items="lesionCollection"
        :item-key="lesionCollection.id"
      >
        <template v-slot:item="{ item }">
          <tr @click="rowClicked(item)">
              <td>{{item.id}}</td>
              <td>{{item.location}}</td>
              <td>{{item.description}}</td>
              <td>{{item.risk_result}}</td>   
              <td class="pa-3">
                <v-avatar style="width: 7em; height: 7em;" >
                  <img :src="item.url" />
                </v-avatar>
              </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    
      <v-card v-if="imageSelected">
        <v-card-text>
          
            <v-layout row wrap>
              <v-flex xs12>
                <v-carousel>
                  <v-carousel-item
                    v-for="item in lesionCollection"
                    :src="item.url"
                    :key="item.id">
                    <v-layout row ma-1 justify-space-between>
                      <div>ID: {{ item.id }}</div>
                      <!-- <div class="title">{{ item.risk_result }}</div> -->
                      <div>Risk Result: {{ item.risk_result }}</div>
                      <div>Location: {{ item.location }}</div>
                      <div>Description: {{ item.description }}</div>
                    </v-layout>  
                  </v-carousel-item>
                </v-carousel>
              </v-flex>
            </v-layout>
            <!-- <v-container v-for="item in lesionCollection" :key="item.id">
              <v-layout row>
                <v-flex xs12>
                  <h3>Location</h3>
                  <div class="image-info">{{ item.location }}</div>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <h3>Description</h3>
                  <div class="image-info">{{ item.description }}</div>
                </v-flex>
              </v-layout>
              <v-layout row>
                <v-flex xs12>
                  <h3>Risk Result</h3>
                  <div class="image-info">{{ item.risk_result }}</div>
                </v-flex>
              </v-layout>     
            </v-container> -->
            <v-layout row class="mt-6">
                <v-flex xs12>
                  <v-btn large color="primary" @click="imageSelected=false" :disabled="loading" class="ma-2">Back
                    <span slot="loader" class="custom-loader">
                      <v-icon light>mdi-cached</v-icon>
                    </span>
                  </v-btn>
                </v-flex>
              </v-layout>       
          </v-card-text>
        </v-card>                  
    <!-- </v-container> -->
  
  </v-container>
</template>

<script>
  import { usersCollection } from "../firebase"
  
  export default {
    data () {  
      return {
        imageSelected: false,
        rowId: '',
        currentUser: this.user(),
        lesionCollection: this.tableData(),
        search: '',
        selectedRows: [],
        // users: this.readUsers(),
        headers: [
          {text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id'},
          {text: 'Location',
          value: 'location'},
          {text: 'Description',
          value: 'description'},
          {text: 'Risk Result',
          value: 'risk_result'},
          {text: 'URL',
          value: 'url'},
        ],
      }
    },
    computed: {

    },
    methods: {
      rowClicked(row) {
        this.rowId = row.id
        this.imageSelected = true
        // this.$store.dispatch('lesionIDaction', this.rowId)
        // this.$store.getters.lesionID
        
        // this.$router.push('/images/' + row.id)
        //this.$router.push('/images/')
      },
      user () {
        return {id: 'bpd27bptyvWc4ulqSoC9'}
      },
      tableData() {
        let lesionData = []
        // let lesionsSnapshot = usersCollection.doc(this.user().id).collection('lesions').get()
        //this.lesionCollection
        usersCollection.doc('bpd27bptyvWc4ulqSoC9').collection('lesions')
        .get().then((lesionsSnapshot) => {
           lesionsSnapshot.forEach((doc) => {
              lesionData.push({
                id: doc.id,
                location: doc.data().location,
                description: doc.data().description,
                risk_result: doc.data().risk_result,
                url: doc.data().url,
              });
           })
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        })
        console.log('lesionData')
        console.log(lesionData)
        return lesionData
      },

      
      // readUsers () {
      //   let userData = []
      //   usersCollection
      //   .get().then((querySnapshot) => {
      //     querySnapshot.forEach((doc) => {
      //       userData.push({
      //         id: doc.id,
      //         first_name: doc.data().first_name,
      //         last_name: doc.data().last_name,
      //         dob: doc.data().dob,
      //         email: doc.data().email,
      //       });
      //     });
      //   })
      //   .catch((error) => {
      //     console.log("Error getting documents: ", error);
      //   });
      //   console.log('userData')
      //   console.log(userData)
      //   return userData
      // } 
    }  
  }
</script>


<style>
  .table-container {
    background-color: #ccc;
  }
  .v-data-table-header {
    background-color: #1976d2;
  }
  .v-data-footer {
    background-color: #1976d2;
  }

</style>