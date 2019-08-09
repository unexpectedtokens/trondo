<template>
  <div :class="{sidebar: true, open: checkSidebar}">
    <div class="filter">
      <p class="filterheader">filter</p>
      <div :class="setClassBasedOnFIlter('none')" @click="setFilter('none')">
        <div class="pin"></div>
        <p>none</p>
      </div>
      <div :class="setClassBasedOnFIlter('personal')" @click="setFilter('personal')">
        <div class="pin"></div>
        <p>personal</p>
      </div>
      <div :class="setClassBasedOnFIlter('business')" @click="setFilter('business')">
        <div class="pin"></div>
        <p>business</p>
      </div>
    </div>
    <button @click="goToAdd">+ Add</button>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  methods: {
    goToAdd() {
      this.$router.push("/add");
    },
    setFilter(kind) {
      this.$store.dispatch("setFilter", kind);
      this.$store.dispatch("toggleSidebar");
    },
    setClassBasedOnFIlter(kind) {
      if (kind === this.$store.getters.getCurrentFilter) {
        return "filterbutton active";
      } else {
        return "filterbutton";
      }
    }
  },
  computed: {
    checkSidebar() {
      return this.$store.getters.getSidebarState;
    }
  }
};
</script>
<style lang="sass" scoped>
  .sidebar
    box-sizing: border-box
    width: 250px
    position: fixed
    top: 100px
    height: calc(100% - 100px)
    padding: 20px
    .filter
      margin-bottom: 100px
      border-top: 1px solid #8f91a2
      border-bottom: 1px solid #8f91a2
      color: #505a5b
      .filterheader
        padding: 10px 0
      .filterbutton
        display: grid
        grid-template-columns: 10px 1fr
        grid-gap: 20px
        padding-bottom: 10px
        cursor: pointer
        p
          line-height: 11px
        .pin
          border: 2px solid #8f91a2
          height: 10px
          width: 10px
          border-radius: 50%
          transition: background 0.3s, border 0.3s
        &.active
          .pin
            background: #8f91a2
        &:hover
          .pin
            background: #8f91a2
    button  
      padding: 10px
      width: 125px
      border-radius: 50px
      background: #6bc8ff
      color: #fff
      border: none
      transition: background 0.3s, transform 0.3s
      cursor: pointer
      margin: 20px auto
      display: block
      box-shadow: 0px 0px 25px -3px rgba(227, 227, 227, 1)
      font-size: 0.9em
      &:hover
        background: #5fb5e8
        transform: translateY(-3px)
  @media(max-width: 1240px)
    .sidebar
      transition: transform 0.5s
      transform: translateX(-250px)
      z-index: 100
      background: #fff
      top: 64px
      height: 100%
      button
        display: none
      &.open
        transform: translateX(0)

</style>
