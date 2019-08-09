<template>
  <!-- <transition name="fade-todos"> -->
  <div class="todo">
    <div class="categ">{{content.kind === "business"?"B":"P"}}</div>
    <p class="title">{{content.title}}</p>
    <p class="date" v-if="content.due">{{content.due}}</p>
    <div class="delete" @click="remove(content._id)">
      <font-awesome-icon icon="trash"></font-awesome-icon>
    </div>
  </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: "Todo",
  props: {
    content: Object,
    remove: Function,
    index: Number
  },
  methods: {
    checkKind(content) {
      const letter = content === "business" ? "B" : "P";
      return letter;
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
  p
    transition: color 0.3s
  .categ
    font-size: 3em
    margin: 10px 0 70px
    display: inline-block
    width: 30px 
    height: 30px
    padding: 20px
    color: #6bc8ff
    border: 3px solid #6bc8ff
    border-radius: 50%
    line-height: 30px
    transition: border 0.3s, transform 0.5s
  .title
    color: #505a5b
    font-size: 1.2em
  .date
    color: #c9c9c9
    font-size: 0.7em
  .delete 
    display: inline-block
    padding: 10px 16px
    border: none
    position: absolute
    top: 5px
    right: 5px
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
