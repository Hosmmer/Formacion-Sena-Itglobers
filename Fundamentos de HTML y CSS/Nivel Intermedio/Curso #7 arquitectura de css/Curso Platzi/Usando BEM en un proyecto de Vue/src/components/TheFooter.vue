<template>
   <div class="wrapper">
  <footer class="footer">
      <ul class="social-media">
        <li
          v-for="(item, index) in networks"
          :key="index"
          class="social-media__list--item"
        >
          <a :href="item.link" target="_blank">{{ item.name }}</a>
      </li>
      </ul>
      <div class="copyright">
        <p class="copyright__location">Guayaquil, Ecuador</p>
        <p class="copyright__signature">2022, DEVELOPED BY LUIS REYES</p>
      </div>
  </footer>
</div>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    let networks = ref([
      { name: "TWITTER", link: "https://twitter.com/lualreye" },
      { name: "GITHUB", link: "https://github.com/lualreye" },
      { name: "INSTAGRAM", link: "https://www.instagram.com/lualreye/" },
    ]);

    return {
      networks: networks,
    };
  },
};
</script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 40vh;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-bottom: 20px;
}
.footer-container {
  width: 70%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2.125rem;
}

.footer-container__social-container {
  width: 280px;
  padding: 0 2.125rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.social-network {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--lightbg-color);
  border-radius: 100%;
  width: 4.5rem;
  height: 4.5rem;
  margin-right: 1rem;
  padding: 1rem;
}

.social-network a {
  text-align: center;
  font-family: var(--font-family);
  color: var(--secundary-color);
  font-size: 0.75rem;
  font-weight: 300;
  text-decoration: none;
}

.footer-container__copyright-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
}

.location {
  text-align: right;
  font-family: var(--font-family);
  color: var(--lightbg-color);
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0;
  margin-bottom: 1rem;
}

.signature {
  text-align: right;
  font-family: var(--font-family);
  color: var(--lightbg-color);
  font-size: 0.75rem;
  font-weight: 300;
  margin: 0;
}

@media only screen and (max-width: 780px) {
  .footer-container__copyright-container {
    align-items: center;
  }

  .social-network {
    margin-right: 0;
  }
}

@media only screen and (max-width: 640px) {
  .footer-container {
    flex-direction: column;
  }

  .footer-container__social-container {
    margin-bottom: 1rem;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  .social-network {
    margin-bottom: 0.75rem;
  }
}

</style>
