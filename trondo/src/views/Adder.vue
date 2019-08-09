<template>
  <div id="formcontainer">
    <form @submit.prevent="post">
      <h2>Add a new task</h2>
      <div class="formgroup">
        <input v-model="title" type="text" placeholder="task" class="text" ref="title" />
      </div>
      <div class="formgroup">
        <input type="text" v-model="due" placeholder="deadline (optional)" class="text" />
      </div>
      <div class="formgroup">
        <select v-model="kind">
          <option value="personal">personal</option>
          <option value="business">business</option>
        </select>
      </div>
      <button type="submit" :class="showButton">+ add</button>
    </form>
  </div>
</template>


<script>
export default {
  data() {
    return {
      title: "",
      due: "",
      kind: "personal",
      sendable: false
    };
  },
  mounted() {
    this.$refs.title.focus();
  },
  methods: {
    post() {
      const user = this.$store.getters.getCurrentUser;
      if (this.title.trim() !== "") {
        this.$store
          .dispatch("addTodo", {
            title: this.title,
            kind: this.kind,
            due: this.due,
            id: user.id
          })
          .then(() => this.$store.dispatch("handleFetchedTodos"));

        this.$router.push("/");
      }
    }
  },
  computed: {
    showButton() {
      if (!this.title.trim()) {
        return "disabled";
      }
      return "";
    }
  }
};
</script>


<style lang="sass" scoped>
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
