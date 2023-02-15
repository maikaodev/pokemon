<template>
  <div data-testid="alert" class="alert">
    <h2 data-testid="alert_message">{{ message }}</h2>
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
