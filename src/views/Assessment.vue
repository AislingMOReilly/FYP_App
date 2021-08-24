<template>
  <div class="assessment">
    <h1>Assessment</h1>
    <img ref="image" src="../assets/logo.png" max-height="150" max-width="200">

    <v-btn large color="primary" :disabled="!isModelReady" @click="predict()">Predict</v-btn>
  </div>
</template>

<script>
  import * as tf from "@tensorflow/tfjs";

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
      async loadModel() {
        this.isModelReady = false;
        this.model = await tf.loadLayersModel('https://raw.githubusercontent.com/AislingMOReilly/CNN-version1/main/model.json');
        this.isModelReady = true;
        
        alert("Successfully loaded");
      },

      async predict() {
        let lesionImage = this.$refs.image;
        //let modelInput = tf.browser.fromPixels(lesionImage).resizeNearestNeighbor([512, 512]).toFloat().expandDims();
        let modelInput = tf.image.resizeBilinear(tf.browser.fromPixels(lesionImage), [512, 512], true).toFloat().div(tf.scalar(127)).expandDims();
        console.log(modelInput);
        let prediction = await this.model.predict(modelInput).data();
        console.log(prediction);

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