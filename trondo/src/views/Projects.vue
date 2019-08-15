<template>
  <div class="projectscontainer">
    <h4>This part of the app is under maintainance</h4>
    <!-- <h4>Your projects</h4>
    <transition-group tag="ul" name="fade-projects" class="projectlist">
      <li v-for="(project) in projects" :key="Math.random()">
        <router-link :to="'/project/'+project._id">
          <img src="/favicon.ico" alt="logo" />
          <p>{{shortenTitle(project.title)}}</p>
        </router-link>
      </li>
    </transition-group>
    -->
  </div>
</template>
<script>
export default {
  name: "Projects",
  //   data() {
  //     return {

  //     };
  //   },
  computed: {
    projects() {
      return this.$store.getters.getProjects;
    },
    shortenTitle(title) {
      return title => {
        if (title.length > 8) {
          return (
            title
              .split("")
              .slice(0, 9)
              .join("") + "..."
          );
        }
        return title;
      };
    }
  },
  created() {
    this.$store.dispatch("getUserProjects");
  }
};
</script>

<style lang="scss" scoped>
.projectscontainer {
  width: 100%;
}
.projectlist {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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
      grid-template-columns: 1fr 1fr;
    }
  }
}
</style>
