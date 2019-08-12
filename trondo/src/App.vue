<template>
  <div id="app" :class="getBackground">
    <Header />
    <div class="notificationholder">
      <transition-group name="card" tag="ul">
        <Notification
          v-for="(notification,index) in getNotifications"
          :key="index+1"
          :type="notification.type"
          :content="notification.message"
          :index="index"
          :deleteThis="removeNotification"
        ></Notification>
      </transition-group>
    </div>
    <transition name="fade" mode="out-in">
      <Sidebar v-if="this.$router.history.current.path === '/'" />
    </transition>

    <!-- <input v-model="newTodo" />
    <button @click="addTodo">Add new todo</button>-->
    <!-- <router-link to="/" exact>home</router-link>
    <router-link to="/add">add</router-link>-->
    <div id="container">
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
      <transition name="fade">
        <button v-if="getUrl === '/' " class="smallgtaddbutton" @click="goToAdd">+ add</button>
        <button
          v-else-if="getUrl === '/projects'"
          class="smallgtaddbutton projectadder"
          @click="goToAddProject"
        >Add project</button>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Sidebar from "./components/Sidebar.vue";
import Notification from "./components/common/Notification";
import axios from "axios";
export default {
  name: "app",
  components: {
    Header,
    Sidebar,
    Notification
  },
  methods: {
    goToAdd() {
      this.$router.push("/add");
    },
    goToAddProject() {
      this.$router.push("/newproject");
    },
    removeNotification(index) {
      this.$store.dispatch("removeNotification", { index });
    }
  },
  computed: {
    getNotifications() {
      return this.$store.getters.getNotifications;
    },
    getBackground() {
      return this.$store.getters.getBackground;
    },
    getUrl() {
      return this.$store.getters.getUrl;
    }
  },
  created() {
    this.$store
      .dispatch("checkIfAuth")
      .then(() => this.$store.dispatch("handleFetchedTodos"))
      .catch(e => this.$router.push("/login"));
  },
  updated() {
    this.$store.dispatch("changeUrl", this.$router.history.current.path);
  }
};
</script>





<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Montserrat:400,700&display=swap')
@import url('https://fonts.googleapis.com/css?family=Lato&display=swap')
* 
    margin: 0
    padding: 0
input 
  filter: none
body
    // background: url("./assets/backgrounds/fog.jpg"), linear-gradient(#dcedffe6,#dcedffe6)
    font-family: "Lato"
    color: #343f3e
    font-size: 1em
    transition: background 0.5s
    .blue
      color: #6bc8ff
      font-weight: 700
  
#app
    background: #dcedff
    min-height: 100vh
    width: 100%
    background-size: cover
    background-repeat: no-repeat
    background-position: center
    transition: background-image 0.3s
    &.default 
      background: #dcedff
    &.mountains
      background-image: linear-gradient(rgba(255,255,255, 0.7),rgba(255,255,255, 0.7)),url("./assets/backgrounds/mountains.jpg")
    &.fog
      background-image:  linear-gradient(rgba(255,255,255, 0.7),rgba(255,255,255, 0.7)),url("./assets/backgrounds/fog.jpg")
    &.road
      background-image: linear-gradient(rgba(255,255,255, 0.7),rgba(255,255,255, 0.7)),url("./assets/backgrounds/road.jpg") 
    &.wave
      background-image:  linear-gradient(rgba(255,255,255, 0.7),rgba(255,255,255, 0.7)),url("./assets/backgrounds/wave.jpg")
    .notificationholder
        position: fixed
        top: 80px
        width: 60%
        left: 50%
        transform: translateX(-50%)
        z-index: 200
        .card-enter-active, .card-leave-active 
          transition: opacity .3s, transform .5s
          transform: translateX(0px)
        .card-enter, .card-leave-to /* .fade-leave-active below version 2.1.8 */ 
          opacity: 0
          transform: translateX(-10px)  
          position: absolute
    #container
      max-width: 1040px
      padding: 100px 0 50px
      width: calc(80% - 250px)
      position: relative
      margin-left: 250px
      min-height: 100px
      .smallgtaddbutton  
        display: none
        position: fixed
        top: 88%
        right: 5%
        padding: 10px
        width: 150px
        border-radius: 50px
        background: #6bc8ff
        color: #fff
        border: none
        transition: background 0.3s, transform 0.3s
        cursor: pointer
        margin: 20px auto
        font-size: 1.1em
        &.projectadder
          display: block
        &:hover
          background: #5fb5e8
          transform: translateY(-3px)

    
.fade-enter-active, .fade-leave-active 
  transition: opacity .3s, transform .5s
  position: absolute
  transform: translateY(0px)

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ 
  opacity: 0
  transform: translateY(-10px)
@media (max-width: 1240px)
  #app
    .notificationholder
      width: 90%
    #container
      width: 100%
      padding: 100px 0
      margin-left: 0
      .smallgtaddbutton
        display: block
</style>
