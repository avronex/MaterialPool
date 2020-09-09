<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class='shadow-5'>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="drawer = !drawer"
        />

        <q-toolbar-title>
          Erik Elze - Events
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="800"
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item to='/' exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                Material
              </q-item-section>
            </q-item>
            <q-item to='/vermietung' exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                Vermietung
              </q-item-section>
            </q-item>
          </q-list>
          <div class="darkSwitch">
            <q-toggle
            v-model="darkMode"
            @click='setDarkMode' />
          </div>
        </q-scroll-area>

        <q-img class="absolute-top bg-primary shadow-5" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
            <div class="text-weight-bold">Erik Elze</div>
            <div>24, Hannover</div>
          </div>
        </q-img>
      </q-drawer>

    <q-page-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      darkMode: false,
      drawer: false
    }
  },
  methods: {
    setDarkMode () {
      this.$q.dark.set(this.darkMode)
    }
  }
}
</script>
