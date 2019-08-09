<template>
  <li :class="setClass">
    <p>{{content}}</p>
    <span @click="deleteThis(index)">
      <font-awesome-icon icon="times"></font-awesome-icon>
    </span>
  </li>
</template>


<script>
export default {
  name: "notification",
  props: {
    type: String,
    content: String,
    deleteThis: Function,
    index: Number
  },
  computed: {
    setClass() {
      return this.type === "success"
        ? "notification success"
        : "notification error";
    }
  }
};
</script>
<style lang="sass" scoped>
  li
    list-style: none
    width: 100%
    background: #6bc8ff
    opacity: 0.8
    border-radius: 2px
    margin-bottom: 10px
    color: #fff
    display: flex
    transition: opacity 0.3s
    justify-content: space-between
    &:hover
      opacity: 1
    span
      align-self: center
      cursor: pointer
      padding: 10px 40px
      font-size: 1.5em
    p
      padding: 20px
      border-radius: 4px
      font-size: 1.5em
      font-weight: 700

    //   align-self: center
    //   justify-self: flex-start
    &.success
      border: 1px solid #6bc8ff
    &.error
      border: 1px solid red
      background: rgba(250,0,0,0.7)
</style>
