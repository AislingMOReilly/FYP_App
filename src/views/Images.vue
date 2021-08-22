<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" color="primary">View Files</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" color="secondary">Upload Image</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" color="secondary">Request Assessment</v-btn>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel style="cursor: pointer;">
          <v-carousel-item
            v-for="mole in moles"
            :src="mole.imageUrl"
            :key="mole.id">
            <!-- @click="onLoadMeetup(meetup.id)" -->
            <div class="title">
              {{ mole.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>
    <v-layout row wrap  class="mt-2">
      <v-flex xs12 class="text-xs-center">
       <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
        return {
          moles: [
            {
              imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg',
              id: 'afajfjadfaadfa323',
              title: 'Meetup in New York',
              //date: new Date(),
              location: 'Upper Back',
              description: 'Darker around edges '
            },
            {
              imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/Paris_-_Blick_vom_gro%C3%9Fen_Triumphbogen.jpg',
              id: 'aadsfhbkhlk1241',
              title: 'Meetup in Paris',
              //date: new Date(),
              location: 'Left Shoulder',
              description: 'Raised surface'
            }
        ]
      }
    }
    // computed: {
    //   meetups () {
    //     return this.$store.getters.featuredMeetups
    //   }
    // },
    // methods: {
    //   onLoadMeetup (id) {
    //     this.$router.push('/meetups/' + id)
    //   }
    // }
  }
</script>

<style scoped>
  .title {
    position: absolute;
    bottom: 50px;
    background-color: rgba(0,0,0,0.5);
    color: white;
    font-size: 2em;
    padding: 20px;
  }
</style>