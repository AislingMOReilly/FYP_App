<v-layout row>
  <v-flex  md6 offset-sm3 >
      <div>
        <div >
           <v-btn @click="click1">choose a photo</v-btn>
           <input type="file" ref="input1"
            style="display: none"
            @change="previewImage" accept="image/*" >                
        </div>
 
        <div v-if="imageData!=null">                     
          <img class="preview" height="268" width="356" :src="img1">
        <br>
        </div>   
      
      </div>
  </v-flex>
</v-layout>
