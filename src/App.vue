<template>
  <div id="app">
    <section>
      <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item">
            <b-tag rounded style="padding: 18px;">
              <div style="display: flex; flex-direction: row; align-items: center;">
                <div>
                  <i class="fa fa-bezier-curve"></i>
                  &nbsp;
                </div>
                <div>
                  <span style="font-weight: bold;">
                    pathfinder
                  </span>
                </div>
              </div>
            </b-tag>
          </a>
        </div>
      </nav>
      <div style="flex: 1;">
        <router-view></router-view>
      </div>
      <footer class="footer" style="padding: 2rem 1.5rem 2rem;">
        <div class="content has-text-centered">
          <p>
            <strong>pathfinder</strong><span style="color:#00d1b2;">#</span><span style="color:#7957d5">v{{ version }}</span> by <a href="https://brngdsn.github.io">Braun Goodson</a>.
            <br />
            The source code is licensed <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
            The website content is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
          </p>
        </div>
      </footer>
    </section>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters([
        'version'
      ])
    }
  }

</script>

<style lang="css" scoped>
  @import "~buefy/dist/buefy.css";
  @import "~bulma/css/bulma.css";

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
  }
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }

  section {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
