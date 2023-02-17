<template>
  <div class="container">
    <Alert
      message="Página não encontrada"
      backTo="Voltar para página inicial"
    />
  </div>
</template>

<script>
import Alert from "../components/Alert/index.vue";

export default {
  name: "NotFound",
  components: { Alert },
};
</script>

<style lang="scss" scoped>
.container {
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
