<template>
  <div id="formcontainer">
    <form @submit.prevent="register">
      <h2>Sign up</h2>
      <div class="formgroup">
        <input v-model="name" type="text" placeholder="name" class="text" ref="register" />
      </div>
      <div class="formgroup">
        <input v-model="email" type="text" placeholder="email" class="text" ref="register" />
      </div>
      <div class="formgroup">
        <input type="password" v-model="password" placeholder="password" class="text" />
      </div>
      <button type="submit">Sign up</button>
      <p>
        Already have an account?
        <br />
        <router-link to="/login" class="blue">Log in instead.</router-link>
      </p>
    </form>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register() {
      if (this.name && this.email && this.password)
        this.$store
          .dispatch("register", {
            email: this.email,
            password: this.password,
            name: this.name
          })
          .then(() => this.$router.push("/"));
    }
  },
  mounted() {
    this.$refs.register.focus();
  }
};
</script>

// <style lang="sass" scoped>
//     #formcontainer
//       background: #fff
//       padding: 60px 50px
//       border-radius: 5px
//       box-shadow: 0px 0px 25px -3px #b5b5b5
//       width: 300px
//       min-height: 300px
//       box-sizing: border-box
//       button
//         padding: 10px
//         width: 150px
//         border-radius: 50px
//         background: #6bc8ff
//         color: #fff
//         border: none
//         transition: background 0.3s, transform 0.3s
//         cursor: pointer
//         margin: 20px auto
//         font-size: 0.8em
//         &:hover
//           background: #5fb5e8
//           transform: translateY(-3px)
//       h2
//         margin-bottom: 20px
//         font-weight: 500
//       .formgroup
//         padding: 10px 0
//         width: 100%
//         position: relative
//         input.text
//           padding: 8px 15px
//           width: 150px
//           display: block 
//           border: none
//           border-radius: 15px
//           background: #dcedff
//         select
//           padding: 8px 15px
//           background: #dcedff
//           border: none
//           border-radius: 15px
//           appearance: none
//         select:focus
//           outline: none
//       .formgroup:last-of-type      
//         min-height: 30px
//       .fade-input-enter-active, .fade-input-leave-active 
//         transition: opacity .5s
//         position: absolute
//       .fade-input-enter, .fade-input-leave-to
//         opacity: 0
//     @media (max-width: 1240px)
//       #formcontainer
//         width: 80%
//         margin-left: 10%
//         padding: 60px 35px
// </style>
