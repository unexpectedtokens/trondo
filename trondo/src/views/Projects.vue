<template>
  <div>
    <p v-for="(project,index) in projects" :key="index">{{project.title}}</p>
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
    }
  },
  created() {
    this.$store.dispatch("getUserProjects");
  }
};
</script>

<style lang="sass">

</style>
