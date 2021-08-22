<template>
  <div class="assessment">
    <h1>This is the assessment page</h1>

    <v-btn large color="primary" @click="loadModel()">View Files</v-btn>
  </div>
</template>

<script>
  export default {
    data () {
    },
    methods: {
      async loadModel() {
        model = await tf.loadLayersModel('URL to github/model.json');
        console.log("model loaded");
      }
      //loadModel();
    }
  }
</script>