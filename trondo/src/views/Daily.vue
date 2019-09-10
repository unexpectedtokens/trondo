<template>
  <div class="projectscontainer">
    <transition name="fade" tag="div">
      <div>
        <transition-group tag="ul" name="fade-projects" class="projectlist" v-if="defaultView">
          <dtask v-for="(task, index) in tasks" :key="index + 1" :data="task" />
        </transition-group>
        <div id="formcontainer" v-else>
          <form @submit.prevent="addNewDtask">
            <div class="formgroup">
              <input type="text" class="text" v-model="title" placeholder="Title" />
            </div>
            <button type="submit">+ add</button>
          </form>
        </div>
      </div>
    </transition>
    <button v-if="defaultView" class="smallgtaddbutton" @click="showAdd">+ add</button>
  </div>
</template>

<script>
import dtask from "@/components/DailyTodo.vue";
export default {
  name: "dailytasks",
  components: {
    dtask
  },
  data() {
    return {
      defaultView: true,
      title: ""
    };
  },
  methods: {
    addNewDtask() {
      if (this.title) {
        this.$store.dispatch("addDailyTask", { title: this.title });
        this.defaultView = true;
        this.title = "";
      }
    },
    showAdd() {
      this.defaultView = false;
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.getDailyTasks;
    }
  },
  created() {
    this.$store.dispatch("getDailyTasks");
  }
};
</script>

<style lang="scss" scoped>
.projectscontainer {
  width: 100%;
}
.smallgtaddbutton {
  display: block;
}
.projectlist {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  box-sizing: border-box;
  padding: 20px 0;
  grid-gap: 15px;
  li {
    list-style: none;
    width: 100%;
    a {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      color: inherit;
      text-decoration: none;
      display: block;
      background: #fefefe;
      padding: 15px;
      border-radius: 8px;
      text-align: center;
      transition: background 0.3s, color 0.3s;
      &:hover {
        background: #5fb5e8;
        color: #fefefe;
      }
    }
  }
}
.fade-projects-enter-active,
.fade-projects-leave-active {
  transition: opacity 0.3s;
}
.fade-projects-enter,
.fade-projects-leave-to {
  opacity: 0;
}
@media (max-width: 1240px) {
  .projectscontainer {
    width: 80%;
    margin: 0 10%;
    .projectlist {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
}
@media (max-width: 700px) {
  .projectscontainer {
    .projectlist {
      grid-template-columns: 1fr;
    }
  }
}
</style>
