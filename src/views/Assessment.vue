<template>
  <v-container>
    <div class="assessment">
      <h1>Assessment</h1>
      <img ref="image" src="../assets/doggo1.jpg" style="width: 100">

      <v-btn large color="primary" :disabled="!isModelReady" @click="predict">Predict</v-btn>
    </div>
    

    <v-layout row>
      <v-flex class="text-center font-weight-black">
        <h1>Upload a photo</h1>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex  md6 offset-sm3 >
        <div>
          <div >
            <v-btn @click="click1">choose a photo</v-btn>
            <input type="file" ref="input1" style="display: none"
              @change="previewImage" accept="image/*" >                
          </div>
  
          <div v-if="imageData!=null">                     
            <img class="preview" height="300" width="300" :src="imgURL">
          <br>
          </div>       
        </div>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex md6 offset-sm3 class="text-center">
        <v-text-field
          solo
          v-model="caption"
          label="Caption goes here">
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex class="text-center">
        <v-btn color="pink" @click="create">upload</v-btn>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
  import * as tf from "@tensorflow/tfjs";
  import '@tensorflow/tfjs-core/dist/public/chained_ops/register_all_chained_ops';
  //import { cloudStore } from "../firebase"
  import firebase from 'firebase';
  import { db } from "../firebase"

  export default {
    data () {
      return {
        isModelReady: false,
        model: null,
      }
    },  
    mounted () {
      this.loadModel();
    },  
    methods: { 
      create() {
        console.log(this.caption)
        const post = {
          photo: this.imgURL,
          caption: this.caption        
        }
        db.collection('PhotoGallery').doc('photo1').set(post)
        //db.collection('PhotoGallery').add(post) --> for auto-generated id
        .then(() => {
          console.log('Write to db succeeded!');
        })
        .catch(err => {
          console.log(err)
        })
      },

      click1() {
        this.$refs.input1.click()   
      },

      previewImage(event) {
        this.uploadValue=0;
        this.imgURL=null;
        this.imageData = event.target.files[0];
        this.onUpload()
      },

      onUpload(){
        this.imgURL=null;
        //const storageRef = cloudStore.ref(`${this.imageData.name}`).put(this.imageData);
        const storageRef=firebase.storage().ref(`${this.imageData.name}`).put(this.imageData);
        storageRef.on(`state_changed`,snapshot => {
            this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
          }, error=>{console.log(error.message)},
          () => {this.uploadValue=100;
            storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                this.imgURL = url;
                console.log("imgURL", this.imgURL)
            });
          }      
        );
      },

      async loadModel() {
        this.isModelReady = false;
        this.model = await tf.loadLayersModel('https://raw.githubusercontent.com/AislingMOReilly/CNN-version1/main/model.json');
        this.isModelReady = true;
        
        alert("Successfully loaded");
      },

      async predict() {
        let lesionImage = new Image();
        lesionImage = this.$refs.image;

        // let modelInput = tf.browser.fromPixels(lesionImage).resizeNearestNeighbor([512, 512]).expandDims(0).toFloat().div(255.0);        
        let modelInput = tf.image.resizeBilinear(tf.browser.fromPixels(lesionImage), [512, 512], true).expandDims(0).toFloat().div(255.0);
        let prediction = await this.model.predict(modelInput).data();

        console.log(prediction[0])
        console.log(prediction[0] * 100)
        //console.log((prediction[0] * 100).toFixed(3))

        if(prediction[0] <= .5) {
          alert(prediction[0]);
        }
        else {
          alert("May display signs of malignancy");
        }
      }
      
    }
  }
</script>