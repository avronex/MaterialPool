<template>
  <q-page class='bg-grey-3 column'>
    <div class="bg-white q-pa-sm">
      <q-input
      @keyup.enter="addObject"
      v-model="newObject"
      label="Material hinzufügen"
      dense>
        <template v-slot:append>
          <q-btn
          @click='addObject'
          round
          dense
          flat
          icon="add" />
        </template>
      </q-input>
    </div>
    <q-list
      class='bg-white'
      separator
      bordered>
      <q-item
        v-for='(object, index) in objects'
        :key='object.title'
        @click='object.packed = !object.packed'
        :class="{ 'packed bg-grey-3' : object.packed }"
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-checkbox
          v-model="object.packed"
          class="no-pointer-events"
          color="secondary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ object.title }}
          </q-item-label>
        </q-item-section>
        <q-item-section
        v-if="object.packed"
        side>
          <q-btn
          @click.stop='deleteObject(index)'
          flat
          round
          color="primary"
          icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-if="!objects.length" class="no-objects text-center absolute-center">
      <q-icon
      name="check"
      size="100px"
      color="primary"
      />
      <div class="text-h6 text-primary text-center">
        Kein Material
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      newObject: '',
      objects: [
        // {
        //   title: 'PA',
        //   packed: false
        // },
        // {
        //   title: 'LED',
        //   packed: true
        // },
        // {
        //   title: 'Nebel',
        //   packed: false
        // }
      ]
    }
  },
  methods: {
    deleteObject (index) {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Material entfernen?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.objects.splice(index, 1)
      })
    },
    addObject () {
      this.objects.push({
        title: this.newObject,
        packed: false
      })
      this.newObject = ''
    }
  }
}
</script>
<style lang='scss'>
.no-objects {
  opacity: 0.5;
}
</style>
