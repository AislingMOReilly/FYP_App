<template>
  <v-container>
  <div>
    <div
      class="imagePreview"
      :style="{ 'background-image': `url(${previewImage})` }"
      @click="selectImage">
    </div>

    <input
      ref="fileInput"
      type="file"
      @input="pickFile">
  
      <!-- <img class="preview" height="300" width="300" src="url(${previewImage})" ref="image"> -->
  </div>



    <!-- <v-layout row>
      <v-flex class="text-center">
         <v-btn large color="primary" :disabled="!isModelReady" @click="predict">Request Risk Assessment</v-btn>
         <v-btn large color="primary" @click="loadModel">Request Risk Assessment</v-btn>
      </v-flex>
    </v-layout> -->
    <!-- ////////////////////////////////////////////////// -->
    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </v-flex>
    </v-layout>
    <v-spacer></v-spacer>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-text>
            <v-container>
              <!-- <form @submit.prevent="writeToFb"> -->
              <form @submit.prevent="onUpload">  
                <v-layout row>
                  <v-flex xs12 >
                        <v-btn :disabled="!isModelReady" @click="click1">Choose a photo</v-btn>
                        <input type="file" ref="input1" style="display: none" @change="previewImage" accept="image/*" >                
                  </v-flex>
                </v-layout>
                <!-- <v-layout row>
                  <v-flex xs12>
                        <v-flex xs12 class="text-center">
                          <v-text-field
                            solo
                            v-model="location"
                            label="Location on body"
                            type="location"
                            required>
                          </v-text-field>
                        </v-flex>
                  </v-flex>
                </v-layout> -->
                <v-layout row>
                  <v-flex xs12>
                    <div v-if="imageData!=null">                     
                      <img class="preview" height="300" width="300" :src="imgURL" ref="image">
                    </div>       
                  </v-flex>
                </v-layout>
              
                <v-layout xs12 row>
                  <v-flex class="text-center">
                    <!-- <v-btn color="blue" @click="writeToFb" >upload</v-btn> -->
                    <v-btn color="primary" type="submit" :disabled="!previewVisible">upload</v-btn>
                  </v-flex>
                </v-layout>
              </form>
            
           
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <v-spacer></v-spacer>

    <v-layout row>
      <v-flex class="text-center">
        <!-- <v-btn large color="primary" :disabled="!isModelReady" @click="predict">Request Risk Assessment</v-btn> -->
        <!-- <img ref="image" src="../assets/doggo1.jpg" style="width: 100px"> -->
        <v-btn large color="primary" :disabled="!previewVisible" @click="predict">Predict</v-btn>
        <!-- <v-btn large color="primary" @click="loadModel">Predict</v-btn> -->
      </v-flex>
    </v-layout>
    
 
  </v-container>
</template>

<script>
  // import * as tf from "@tensorflow/tfjs";
  // import '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops';
  ///////////import { cloudStore } from "../firebase"
  // import firebase from 'firebase';
  // import { usersCollection } from "../firebase"

  export default {
    data () {
      return {
    //     isModelReady: false,
    //     previewVisible: false,
    //     model: null,
    //     currentUser: this.user(),
    //     //location: ''
        previewImage: null
      }
    },  
    // mounted () {
    //   this.loadModel();
    // },
    methods: { 
      selectImage () {
          this.$refs.fileInput.click()
      },
      pickFile () {
        let input = this.$refs.fileInput
        let file = input.files
        if (file && file[0]) {
          let reader = new FileReader
          reader.onload = e => {
            this.previewImage = e.target.result

          }
          console.log('preview', this.previewImage)
          console.log('url(preview)', 'url(${previewImage})')
          reader.readAsDataURL(file[0])
          this.$emit('input', file[0])
        }
      }

      // user () {
      //   //console.log(this.$store.getters.user)
      //   //return this.$store.getters.user
      //   return {id: 'bpd27bptyvWc4ulqSoC9'}
      // },
      // click1() {
      //   this.$refs.input1.click()   
      // },
      // previewImage(event) {
      //   this.uploadValue=0;
      //   this.imgURL=null;
      //   this.imageData = event.target.files[0];
      //   this.previewVisible = true;
      //   this.onUpload()
      // },
      // onUpload(){
      //   this.imgURL=null;
      //   //const storageRef = cloudStore.ref(`${this.imageData.name}`).put(this.imageData);
      //   const storageRef=firebase.storage().ref(`images/${this.currentUser.id}/${this.imageData.name}`).put(this.imageData);
      //   storageRef.on(`state_changed`,snapshot => {
      //       this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
      //     }, error=>{console.log(error.message)},
      //     () => {this.uploadValue=100;
      //       storageRef.snapshot.ref.getDownloadURL().then((url)=>{
      //           this.imgURL = url;
      //           console.log("imgURL", this.imgURL)
      //       });
      //     }      
      //   );
      //   alert(this.imgURL, "Stored in cloud");
      //   //this.writeToFb() 
      // },
      // writeToFb() {
      //   let testDate = Date.now()

      //   console.log(this.location, testDate)
      //   console.log("before db write", this.imgURL)
      //   const post = {
      //     url: this.imgURL,
      //     //location: this.location,
      //     location: "",
      //     risk_result: null,
      //     timestamp: Date.now()
      //   }
      //   //db.collection('lesions').doc('photo1').set(post) // --> to specify doc id
      //   usersCollection.doc(this.currentUser.id).collection('lesions').add(post)
      //   .then(() => {
      //     alert(this.imgURL, "Write to db succeeded");
      //   })
      //   .catch(err => {
      //     console.log(err)
      //   })
      // },

      // async loadModel() {
      //   console.log("Loading model")
      //   this.isModelReady = false;
      //   this.model = await tf.loadLayersModel('https://raw.githubusercontent.com/AislingMOReilly/CNN-version1/main/model.json');
      //   this.isModelReady = true;
        
      //   alert("Successfully loaded");
      // },

      // async predict() {
      //   let lesionImage = new Image();
      //   lesionImage = this.$refs.image;

      //   // let modelInput = tf.browser.fromPixels(lesionImage).resizeNearestNeighbor([512, 512]).expandDims(0).toFloat().div(255.0);        
      //   let modelInput = tf.image.resizeBilinear(tf.browser.fromPixels(lesionImage), [512, 512], true).expandDims(0).toFloat().div(255.0);
      //   let prediction = await this.model.predict(modelInput).data();

      //   console.log(prediction[0])
      //   console.log(prediction[0] * 100)
      //   //console.log((prediction[0] * 100).toFixed(3))

      //   if(prediction[0] <= .5) {
      //     alert(prediction[0]);
      //   }
      //   else {
      //     alert("May display signs of malignancy");
      //   }
      // }
      
    }
  }
</script>

<style scoped lang="scss">
  .imagePreview {
    width: 250px;
    height: 250px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
</style>