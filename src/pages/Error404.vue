<template>
  <div class="fullscreen bg-dark text-center q-pa-md flex flex-center">
    <div>
      <div class='text-accent' style="font-size: 30vh">
        404
      </div>

      <div class="text-h2 text-white" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        text-color="dark"
        unelevated
        to="/"
        label="Go Home"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Error404'
}
</script>
