<template>
  <div id="formcontainer">
    <slot name="form">
      <slot name="formtitle"></slot>
      <slot name="inputs"></slot>
      <slot name="special"></slot>
      <slot name="submit"></slot>
    </slot>
  </div>
</template>
<script>
export default {
  name: "Form"
};
</script>
<style lang="sass" scoped>
    
</style>
