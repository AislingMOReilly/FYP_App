<template>
  <v-container>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
         <v-container>
            <v-layout row>
              <v-flex xs12>
                  <v-file-input 
                  @change="preview_image"
                  v-model="image">
                  </v-file-input>  
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>  
                <!-- <v-img :src="url"></v-img> -->
                <img class="imagePreview" ref="imageInput" :src="url"/>
               </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 mr-xs-2 mr-md-3 mr-xl-4 class="text-center"> 
                <v-btn large color="primary" style="mr" :disabled="!isModelReady" @click="predict">Request Risk Assessment</v-btn>
                <v-btn large color="primary" :disabled="!riskRequested" @click="upload = !upload">Upload</v-btn>
              </v-flex>
              <!-- <v-flex xs12 class="text-right"> 
                <v-btn large color="primary" :disabled="!riskRequested" @click="upload = !upload">Upload</v-btn>
              </v-flex> -->
            </v-layout>
            <v-spacer></v-spacer>
            <!-- <v-layout row>
              <v-flex xs12 class="text-right"> 
                <v-btn large color="primary" :disabled="!riskRequested" @click="upload = !upload">Save</v-btn>
              </v-flex>
            </v-layout> -->
        <v-container>
        
        <v-container v-if="upload">
              <form @submit.prevent="onUpload">
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="location"
                      label="Location on body"
                      id="location"
                      v-model="location"
                      type="location"
                      required>
                      </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-text-field
                      name="description"
                      label="Description/Additional comments"
                      id="description"
                      v-model="description"
                      type="description"
                      required>
                      </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <v-btn type="submit" color="primary">Save</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
      </v-flex>
    </v-layout>
    
  </v-container>
</template>

<script>
  import * as tf from "@tensorflow/tfjs";
  import '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops';
  ///////////import { cloudStore } from "../firebase"
  import firebase from 'firebase';
  import { usersCollection } from "../firebase"

  export default {
    data () {
      return {
        currentUser: this.user(),

        isModelReady: false,
        model: null,
        riskRequested: false,
       
        url: null,
        image: null,
        //imageData: null,

        upload: false,
        //cloudUrl: null,
        location: '',
        description: ''
      }
    },  
    mounted () {
      this.loadModel();
    },
    methods: { 
      user () {
        //console.log(this.$store.getters.user)
        // return this.$store.getters.user
        return {id: 'bpd27bptyvWc4ulqSoC9'}
      },

      preview_image() {
        this.url= URL.createObjectURL(this.image)
        //this.imageData = this.image
        console.log('this.image', this.image)
      },

      onUpload(){
        this.cloudUrl=null;
        //let ready = false;
        console.log('this.image going to Cloud', this.image)
        //const storageRef = cloudStore.ref(`${this.imageData.name}`).put(this.imageData);
        const storageRef=firebase.storage().ref(`images/${this.currentUser.id}/${this.image.name}`).put(this.image);
        storageRef.on(`state_changed`,snapshot => {
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          () => {this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.cloudUrl = url;
                console.log("cloudUrl", this.cloudUrl)
                //ready = true
            });
          }      
        );
        alert(this.cloudUrl, "Stored in cloud");
        //if(ready)
        this.writeToFb() 
      },
      writeToFb() {
        let testDate = Date.now()

        console.log(this.location, testDate)
        console.log("before db write", this.cloudUrl)

        const post = {
          url: this.cloudUrl,
          location: this.location,
          description: this.description,
          risk_result: this.risk_result,
          timestamp: testDate
        }
        //db.collection('lesions').doc('photo1').set(post) // --> to specify doc id
        usersCollection.doc(this.currentUser.id).collection('lesions').add(post)
        .then(() => {
          alert(this.cloudUrl, "Write to db succeeded");
        })
        .catch(err => {
          console.log(err)
        })
      },

      async loadModel() {
        console.log("Loading model")
        this.isModelReady = false;
        this.model = await tf.loadLayersModel('https://raw.githubusercontent.com/AislingMOReilly/CNN-version1/main/model.json');
        this.isModelReady = true;
        
        alert("Successfully loaded");
      },

      async predict() {
        this.riskRequested = false;
        let lesionImage = new Image();
        lesionImage = this.$refs.imageInput;
        
        // let modelInput = tf.browser.fromPixels(lesionImage).resizeNearestNeighbor([512, 512]).expandDims(0).toFloat().div(255.0);        
        let modelInput = tf.image.resizeBilinear(tf.browser.fromPixels(lesionImage), [512, 512], true).expandDims(0).toFloat().div(255.0);
        let prediction = await this.model.predict(modelInput).data();

        console.log(prediction[0])
        console.log(prediction[0] * 100)
        //console.log((prediction[0] * 100).toFixed(6))
        let percentPred = (prediction[0] * 100)

        if(percentPred <= .5) {
          alert(percentPred, "is more likely benign");
        }
        else if(percentPred >= .5) {
          alert(percentPred, "May display signs of malignancy");
        }
        else {
          alert("Error");
        }
        this.risk_result = percentPred;
        this.riskRequested = true;
      }      
    }
  }
</script>

<style scoped lang="scss">
  .imagePreview {
    width: 100%;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>