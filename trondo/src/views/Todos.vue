<template>
  <!-- <div class="todo-container"> -->
  <transition-group class="todo-container" name="fade" tag="div">
    <Todo
      v-for="(todo, index) in todos"
      :key="index + 1"
      :index="index"
      :content="todo"
      :remove="removeTodo"
    />
  </transition-group>
  <!-- </div> -->
</template>
<script>
import Todo from "@/components/Todo.vue";
export default {
  name: "Todos",
  data() {
    return {
      listener: null
    };
  },
  methods: {
    removeTodo(id) {
      this.$store
        .dispatch("removeTodo", { id })
        .then(() => this.$store.dispatch("handleFetchedTodos"));
    }
  },

  computed: {
    todos() {
      return this.$store.getters.getTodos;
    }
  },
  components: {
    Todo
  },
  beforeMount() {
    this.$store.dispatch("handleFetchedTodos");
  }
};
</script>

<style lang="sass" scoped>
.todo-container
  display: grid
  grid-template-columns: 1fr 1fr
  grid-gap: 30px 
  width: 100% 
  min-height: 100px
@media(max-width: 1240px)
  .todo-container
    grid-template-columns: 1fr
    width: 80%
    margin-left: 10%
</style>