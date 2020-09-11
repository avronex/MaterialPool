<template>
  <q-page class='bg-dark column'>
    <div class="bg-dark q-pa-sm">
      <q-input
      @keyup.enter="validateForm"
      v-model="newObject"
      label="Material hinzufügen"
      standout="bg-grey-3 text-grey-10"
      dense
      dark>
        <template v-slot:append>
          <q-btn
          @click='validateForm'
          round
          dense
          flat
          icon="add" />
        </template>
      </q-input>
    </div>
    <q-list
      class='bg-grey-3'
      separator>
      <q-item
        v-for='(object, index) in objects'
        :key='object.title'
        @click='object.packed = !object.packed'
        :class="{ 'packed bg-secondary text-grey-3' : object.packed }"
        clickable
        v-ripple>
        <q-item-section avatar>
          <q-checkbox
          v-model="object.packed"
          class="no-pointer-events"
          color="accent" />
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
          color="grey-3"
          icon="delete" />
        </q-item-section>
      </q-item>
    </q-list>
    <div class="text-center fixed-bottom-center q-ma-md">
      <q-btn @click.stop='deleteAllObjects(index)' class='shadow-5 absolute-bottom-right q-ma-lg' dark round color="primary" icon="delete" />
    </div>
    <div v-if="!objects.length" class="no-objects text-center absolute-center">
      <q-icon
      name="check"
      size="100px"
      color="accent"
      />
      <div class="text-h6 text-grey-1 text-center">
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
/*          {
           title: 'PA',
           packed: false
         },
         {
           title: 'LED',
           packed: true
         },
         {
           title: 'Nebel',
          packed: false
         } */
      ]
    }
  },
  methods: {
    deleteObject (index) {
      this.$q.dialog({
        title: 'Bestätige',
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
    },
    deleteAllObjects () {
      this.$q.dialog({
        title: 'Alle löschen',
        message: 'Alle Materialien entfernen!?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.objects.splice(0)
      })
    },
    validateForm () {
      if (this.newObject == "") {
        this.$q.notify({
          message: 'Textfeld leer!',
          icon: 'announcement',
          color: 'accent'
        });
      }
      else {
        this.addObject();
      }
    }
  }
}
</script>
<style lang='scss'>
.no-objects {
  opacity: 0.5;
}
</style>
