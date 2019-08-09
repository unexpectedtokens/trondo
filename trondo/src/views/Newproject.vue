<template>
  <div id="formcontainer">
    <form @submit.prevent="addNewProject">
      <h2>Add a new project</h2>

      <div class="formgroup">
        <input v-model="title" type="text" placeholder="title" class="text" ref="login" />
      </div>
      <!-- <h2>Choose a background for your project</h2>
      <div class="formgroup imagegrid">
        <div
          :class="{default:true, active: classChecker('default')}"
          @click="changeBackgroundValue('default')"
        ></div>
        <div :class="{fog:true, active: classChecker('fog')}" @click="changeBackgroundValue('fog')"></div>
        <div
          :class="{mountain:true,  active: classChecker('mountain')}"
          @click="changeBackgroundValue('mountain')"
        ></div>
        <div
          :class="{road: true, active: classChecker('road')}"
          @click="changeBackgroundValue('road')"
        ></div>
        <div
          :class="{wave:true, active: classChecker('wave')}"
          @click="changeBackgroundValue('wave')"
        ></div>
      </div>-->
      <button type="submit">Add project</button>
    </form>
  </div>
</template>
<script>
export default {
  name: "Newproject",
  data() {
    return {
      title: "",
      background: "default"
    };
  },
  methods: {
    addNewProject() {
      this.$store.dispatch("addNewProject", { title: this.title }).then(() => {
        this.$store.dispatch("getUserProjects");
        this.$router.push("/projects");
      });
    },

    changeBackgroundValue(image) {
      this.background = image;
    }
  },
  computed: {
    classChecker() {
      return image => image === this.background;
    }
  }
};
</script>
<style lang="sass">
    #formcontainer
      background: #fff
      padding: 60px 50px
      border-radius: 5px
      box-shadow: 0px 0px 25px -3px #b5b5b5
      width: 300px
      min-height: 300px
      box-sizing: border-box
      button
        padding: 10px
        width: 150px
        border-radius: 50px
        background: #6bc8ff
        color: #fff
        border: none
        transition: background 0.3s, transform 0.3s
        cursor: pointer
        margin: 20px auto
        font-size: 0.8em
        &:hover
          background: #5fb5e8
          transform: translateY(-3px)
      h2
        margin-bottom: 20px
        font-weight: 500
      .formgroup
        padding: 10px 0
        width: 100%
        position: relative
        input.text
          padding: 8px 15px
          width: 150px
          display: block 
          border: none
          border-radius: 15px
          background: #dcedff
        select
          padding: 8px 15px
          background: #dcedff
          border: none
          border-radius: 15px
          appearance: none
        select:focus
          outline: none
      // .imagegrid
      //   display: grid
      //   grid-template-columns: 1fr 1fr 1fr
      //   grid-gap: 20px
      //   div
      //     transition: all 0.3s
      //     height: 100px
      //     box-sizing: border-box
      //     border-radius: 15px
      //     background-size: cover
      //     background-repeat: no-repeat
      //     background-position: center
      //     border: 5px solid transparent
      //     cursor: pointer
      //     &.default 
      //       background: #dcedff
      //     &.mountain
      //       background-image: url("../assets/backgrounds/mountains.jpg")
      //     &.fog
      //       background-image: url("../assets/backgrounds/fog.jpg")
      //     &.road
      //       background-image: url("../assets/backgrounds/road.jpg")
      //     &.wave
      //       background-image: url("../assets/backgrounds/wave.jpg")
      //     &.active
      //       border: 5px solid #5fb5e8
      .formgroup:last-of-type      
        min-height: 30px
      .fade-input-enter-active, .fade-input-leave-active 
        transition: opacity .5s
        position: absolute
      .fade-input-enter, .fade-input-leave-to
        opacity: 0
    @media (max-width: 1240px)
      #formcontainer
        width: 80%
        margin-left: 10%
        padding: 60px 35px

</style>
