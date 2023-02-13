<template>
  <div class="alert">
    <h2>{{ message }}</h2>
  </div>
</template>
<script>
export default {
  name: "Alert",
  props: ["message"],
};
</script>
<style lang="scss" scoped>
.alert {
  height: 20vh;
  display: grid;
  place-items: center;
}
</style>
