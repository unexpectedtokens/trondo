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


