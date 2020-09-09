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
        dark
      >
        <q-scroll-area style="height: calc(100% - 150px); margin-top: 150px; border-right: 1px solid #ddd">
          <q-list padding>
            <q-item
              v-ripple
              active-class="my-menu-link"
              clickable
              exact
              to='/'>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                Pool
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              active-class="my-menu-link"
              clickable
              exact
              to='/packliste'>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                Packliste
              </q-item-section>
            </q-item>
            <q-item
              v-ripple
              active-class="my-menu-link"
              clickable
              exact
              to='/vermietung'>
              <q-item-section avatar>
                <q-icon name="list" />
              </q-item-section>
              <q-item-section>
                Vermietung
              </q-item-section>
            </q-item>
          </q-list>
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
      drawer: false
    }
  }
}
</script>

<style lang='scss'>
.my-menu-link {
  color: white;
  background-color: $accent;
}
</style>
