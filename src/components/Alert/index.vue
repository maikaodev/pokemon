<template>
  <div data-testid="alert" class="alert">
    <h2 data-testid="alert_message">{{ message }}</h2>
    <router-Link data-testid="alert_link" to="/" v-show="backTo">
      {{ backTo ? backTo : "" }}
    </router-Link>
  </div>
</template>
<script>
import { RouterLink } from "vue-router";

export default {
  name: "Alert",
  props: ["message", "backTo"],
};
</script>
<style lang="scss" scoped>
@keyframes shake-horizontal {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70% {
    transform: translateX(-10px);
  }
  20%,
  40%,
  60% {
    transform: translateX(10px);
  }
  80% {
    transform: translateX(8px);
  }
  90% {
    transform: translateX(-8px);
  }
}
.alert {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 16px;
  a {
    animation: shake-horizontal 0.8s cubic-bezier(0.455, 0.03, 0.515, 0.955)
      both;
    background: none;
    color: white;

    padding: 16px;

    font-weight: 700;

    border: 1px solid red;

    cursor: pointer;

    transition-property: background-color;
    transition-duration: 0.75s;

    &:hover {
      background-color: red;
    }
  }
}
</style>
