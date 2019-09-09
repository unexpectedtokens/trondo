<template>
  <!-- <transition name="fade-todos"> -->
  <div class="todo" :class="data.completed ? 'finished':''">
    <p>{{data.title}}</p>
    <div v-if="!data.completed" @click="complete(data._id)" class="checker">
      <font-awesome-icon icon="circle"></font-awesome-icon>
    </div>
    <div v-else class="checker" @click="complete(data._id)">
      <font-awesome-icon icon="check-circle"></font-awesome-icon>
    </div>
    <div class="delete" @click="remove(data._id)">
      <font-awesome-icon icon="trash"></font-awesome-icon>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: "dtask",
  props: {
    data: Object
  },
  methods: {
    complete(id) {
      this.$store.dispatch("completeDailyTask", { id });
    },
    remove(id) {
      this.$store.dispatch("deleteDailyTask", { id });
    }
  }
};
</script>
<style scoped lang="sass">
.todo 
  padding: 20px
  background: #fff
  transition: background 0.3s ease-in-out, color 0.3s, transform 0.3s, box-shadow 0.3s
  border-radius: 5px
  box-shadow: 0px 0px 25px -3px #b5b5b5
  position: relative
  min-height: 150px
  transform: none
  &.finished
    background: #87ebd0
    color: #fff
    opacity: 0.9
  p
    transition: color 0.3s
    max-width: 70%
    text-transform: capitalize
  div.checker
    position: absolute
    right: 20px
    top: 20px
    cursor: pointer
    z-index: 20
    width: 20px
    height: 20px
  .delete 
    display: inline-block
    border: none
    position: absolute
    top: 20px
    right: 50px
    cursor: pointer
    transition: transform 0.3s
    &:hover
      transform: translateY(-5px)
  &:hover 
    background: #6bc8ff
    color: #fff
    transform: scaleY(0.98) scaleX(0.98)
    box-shadow: none
    .delete,.date,.title,.categ
      color: #fff
    .categ
      border: 3px solid #fff
      transform: rotate(360deg)

</style>
