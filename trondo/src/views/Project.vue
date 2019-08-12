<template>
  <div class="projectcontainer">
    <h2>{{project.title}}</h2>
    <div class="divider">
      <div>
        <h4>To do</h4>
        <ul>
          <li draggable="draggable" v-for="(project,index) in uncompleted" :key="index">{{project}}</li>
          <li class="newTodoContainer">
            <div>
              <input type="text" v-model="newTodo" placeholder="Add a new task to this project..." />
            </div>
          </li>
        </ul>
      </div>
      <div>
        <h4>Done</h4>

        <ul>
          <li v-for="(project,index) in completed" :key="index" draggable="true">{{project}}</li>
        </ul>
      </div>
    </div>
    {{newTodo}}
  </div>
</template>

<script>
export default {
  name: "Project",
  data() {
    return {
      project: {},
      newTodo: ""
    };
  },
  computed: {
    uncompleted() {
      return [0, 0, 0];
    },
    completed() {
      return [1, 1, 1];
    }
  },
  beforeMount() {
    this.$store.dispatch("getUserProjects").then(projects => {
      const singleProject = projects.filter(
        project => project._id === this.$route.params.id
      );
      this.project = singleProject[0];
    });
  }
};
</script>


<style lang="scss" scoped>
.projectcontainer {
  width: 100%;
  padding-top: 20px;
  .divider {
    margin-top: 50px;
    display: grid;
    grid-gap: 100px;
    grid-template-columns: 1fr 1fr;
    border-radius: 8px;
    > div {
      background: #eee;
      padding: 10px;
      border-radius: 8px;
      box-shadow: 0px 0px 25px -3px #b5b5b5;
      transition: all 0.3s;
      h4 {
        margin: 10px;
      }
      &:hover {
        // transform: scale(0.99);
        box-shadow: 0px 0px 15px -3px #b5b5b5;
      }
      ul {
        background: #eee;
        padding: 2px;
        border-radius: 8px;

        li {
          list-style: none;
          background: #fff;
          margin: 5px;
          padding: 10px;
          border-radius: 2px;
          cursor: pointer;
          &.newTodoContainer {
            padding: 0px 0px 3px;
            input {
              width: 98%;
              height: 20px;
              transition: height 0.3s;
              text-indent: 5px;
              border: none;
              cursor: pointer;
              &:focus {
                height: 70px;
                cursor: text;
              }
            }
          }
        }
      }
    }
  }
}
</style>