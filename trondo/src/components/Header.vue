<template>
  <div class="nav">
    <button v-if="getUrl" @click="toggleSidebar" :class="{active: checkSidebar}">filter</button>
    <div class="logocontainer">
      <h1 @click="goHome()">
        trondo
        <span>.</span>
      </h1>
    </div>
    <ul :class="{navlinks: true, open: menuClass}">
      <li v-if="!checkIfAuth" @click="toggleMenu">
        <router-link to="/login">Log In</router-link>
      </li>
      <li v-if="!checkIfAuth" @click="toggleMenu">
        <router-link to="/register">Sign up</router-link>
      </li>
      <li v-if="checkIfAuth" @click="toggleMenu()">
        <router-link to="/daily">Daily Tasks</router-link>
      </li>
      <li v-if="checkIfAuth">Logged in as {{getUser.name}}</li>
      <li v-if="checkIfAuth" @click="toggleMenu()">
        <router-link to="/settings">Settings</router-link>
      </li>
      <li @click="logOut" v-if="checkIfAuth">Log out</li>
    </ul>
    <font-awesome-icon :class="{hamburger: true, open: menuClass}" icon="bars" @click="toggleMenu"></font-awesome-icon>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      open: false
    };
  },
  methods: {
    goHome() {
      this.$router.push("/");
      // this.$store.dispatch("notify", { message: "test", type: "error" });
    },
    logOut() {
      this.$store.dispatch("logOut");
      this.$router.push("login");
      this.toggleMenu();
    },
    toggleMenu() {
      this.open = !this.open;
      if (this.$store.getters.getSidebarState) {
        this.$store.dispatch("toggleSidebar");
      }
    },
    toggleSidebar() {
      if (this.open) {
        this.open = !this.open;
      }
      this.$store.dispatch("toggleSidebar");
    }
  },
  computed: {
    checkIfAuth() {
      return this.$store.getters.checkIfAuth;
    },
    getUser() {
      return this.$store.getters.getCurrentUser;
    },
    menuClass() {
      return this.open;
    },
    checkSidebar() {
      return this.$store.getters.getSidebarState;
    },
    getUrl() {
      return this.$store.getters.getUrl == "/";
    }
  }
};
</script>
<style lang="sass" scoped>
  .nav
    width: 100%
    z-index: 300
    position: fixed
    min-height: 50px
    padding: 6px
    background: #fff
    box-shadow: 0px 0px 25px -3px #b5b5b5
    display: flex
    flex-direction: row
    justify-content: space-between
    button
      display: none
    .logocontainer
      display: inline-block
      // margin: auto
      margin-left: 30px
      padding-left: 20px
    .hamburger
      display: none
    .navlinks
      float: right
      li
        display: inline-block
        cursor: pointer
        padding: 17px 25px 17px 5px
        a
          color: inherit
          text-decoration: none
          padding: 10px
    h1  
      padding: 10px 0px 0px
      cursor: pointer
      font-family: "Montserrat"
      display: block
      span
        color: #6bc8ff
        display: inline-block
    h1::after
      content: ""
      display: block
      width: 0
      height: 3px
      background: #6bc8ff
      transition: width .3s
    &:hover
      h1::after
        width: 112px
  @media(max-width: 1240px)
    .nav
      .logocontainer
        margin-left: 0
      button
        height: 40px
        display: block
        margin-left: 20px
        padding: 10px 20px
        background: #fff
        border: 3px solid #6bc8ff
        border-radius: 4px
        color: #6bc8ff
        align-self: center
        cursor: pointer
        transition: background 0.3s, color 0.3s
        &:hover
          background: #6bc8ff
          color: #fff
        &.active
          background: #6bc8ff
          color: #fff
        &.show
          opacity: 1
          pointer-events: auto;
      h1
        margin: auto
        text-align: center
        display: block
      .navlinks
        float: none
        width: 100%
        position: absolute
        top: 100%
        height: 0
        overflow: hidden
        transition: height 0.5s
        left: 0
        li
          display: block
          text-align: center
          background: #fff
        &.open
          height: 215px
      .hamburger
        transition: transform 0.5s
        display: inline-block
        float: right
        font-size: 30px    
        margin: 15px 42px 0
        cursor: pointer
        &.open
          transform: rotate(360deg)

</style>
