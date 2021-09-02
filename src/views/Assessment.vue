<template>
  <v-container>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
          <v-container>
            <v-layout row v-if="!isModelReady">
              <v-flex xs12 class="text-center text-subtitle-1"> 
                  Loading the model
              </v-flex>
              <v-progress-linear
                color="light-blue accent-4"
                indeterminate
                rounded
                striped
                height="6">
              </v-progress-linear>
            </v-layout>

            <v-layout row>
              <v-flex xs12>
                  <v-file-input 
                  show-size
                  label="Image input"
                  @change="preview_image"
                  v-model="image"
                  accept="image/*"
                  :rules="[inputRules]"
                  >
                  </v-file-input>  
              </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12>  
                <!-- <v-img :src="url"></v-img> -->
                <img style="width: 100%; max-width: 512px;"  ref="imageInput" :src="url"/>
               </v-flex>
            </v-layout>
            <v-layout row>
              <v-flex xs12 class="text-center"> 
                <v-btn large color="primary" class="ma-3" :disabled="!isModelReady || !imageSelected" @click="predict">Request Risk Assessment</v-btn>
                <v-btn large color="primary" class="ma-3" :disabled="!riskRequested" @click="upload = !upload">Upload</v-btn>
              </v-flex>
            </v-layout>
          </v-container>
          <v-spacer></v-spacer>
          <v-container v-if="riskRequested">
            <v-layout row>
              <v-flex xs12 > 
                <span class="border border-primary">
                  <p ref="predResult" class="ma-3 subheading">{{ this.predMsg }}</p>
                </span>
              </v-flex>
            </v-layout>
           </v-container>
        
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
        imageSelected: false,
        riskRequested: false,
       
        url: null,
        image: null,

        upload: false,
        location: '',
        description: '',
        percentPred: 0,
        predMsg: ''
      }
    },  
    mounted () {
      this.loadModel();
    },
    computed: { 
      inputRules() {
        return v => !v || v.size < 2000000 || 'Please supply image less than 2MB'
      }
    },
    methods: { 
      user () {
        //console.log(this.$store.getters.user)
        // return this.$store.getters.user
        return {id: 'bpd27bptyvWc4ulqSoC9'}
      },

      preview_image() {
        this.url= URL.createObjectURL(this.image)
        this.imageSelected = true
        console.log('this.image', this.image)
      },

      onUpload(){
        this.cloudUrl=null;
        console.log('this.image going to Cloud', this.image)
        //const storageRef = cloudStore.ref(`${this.imageData.name}`).put(this.imageData);
        const storageRef=firebase.storage().ref(`images/${this.currentUser.id}/${this.image.name}`).put(this.image);
        storageRef.on(`state_changed`,snapshot => {
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, 
          error=>{console.log(error.message)},
          () => {
            this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.cloudUrl = url;
                console.log("cloudUrl", this.cloudUrl)
                this.writeToFb() 
            });
          }      
        );
        
      },
      writeToFb() {
        let testDate = Date.now()

        const post = {
          url: this.cloudUrl,
          location: this.location,
          description: this.description,
          risk_result: this.percentPred,
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
        this.model = await tf.loadLayersModel('https://raw.githubusercontent.com/AislingMOReilly/CNN-model/main/model.json');
        this.isModelReady = true;
      },

      async predict() {
        this.riskRequested = false;
        let lesionImage = new Image();
        lesionImage = this.$refs.imageInput;
        
        let modelInput = tf.image.resizeBilinear(tf.browser.fromPixels(lesionImage), [512, 512], true).expandDims(0).toFloat().div(255.0);
        let prediction = await this.model.predict(modelInput).data();

        console.log(prediction[0] * 100)
        let percent = (prediction[0] * 100)

        if(percent <= 50) {
          this.predMsg = String(percent) + "% => Result is more likely benign"
        }
        else if(percent >= 50) {
          this.predMsg = String(percent) + "% => May display signs of malignancy"
        }
        else {
          console.log("Error");
        }
        this.percentPred = percent;
        this.riskRequested = true;

        return this.predMsg
      }      
    }
  }
</script>

<style scoped lang="scss">
  .subheading {
    background-color: #a8e0ff82;
    //background-position: center center;
}
</style>