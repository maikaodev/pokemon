<template>
  <nav>
    <ul>
      <li><a href="http://github.com/maikaodev" target="_blank">GitHub</a></li>
      <li>
        <a href="https://www.linkedin.com/in/maikaodev/" target="_blank"
          >LinkedIn</a
        >
      </li>
      <li>
        <a href="mailto:maikao.dev@gmail.com" target="_blank"> Gmail </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "SocialNetwork",
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
nav {
  height: 100%;
  margin: auto;

  display: flex;

  align-items: center;
  justify-content: center;
  ul {
    width: 100%;
    display: flex;
    justify-content: space-around;

    list-style: none;

    margin: 0;

    li {
      a {
        transition-property: color;
        transition-duration: 0.75s;
        &:hover {
          color: red;
        }
      }
    }
  }
}

$breakpoint-tablet: 768px;
@media (min-width: $breakpoint-tablet) {
  nav {
    ul {
      width: 500px;
    }
  }
}
</style>
