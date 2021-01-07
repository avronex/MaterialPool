<template>
  <q-page class='bg-dark column'>
    <div class="bg-dark q-pa-sm row">
      <q-input
      class="q-pr-sm"
      dark
      @keyup.enter="validateForm"
      v-model="newObject"
      placeholder="Material"
      dense
      standout="bg-grey-3 text-grey-10"
      style="width: 50%;"
      >
      </q-input>
      <q-input
      dark
      @keyup.enter="validateForm"
      v-model="newPrice"
      placeholder="Preis"
      suffix="€"
      type="number"
      dense
      standout="bg-grey-3 text-grey-10"
      style="width: 50%;"
      >
        <template v-slot:after>
          <q-btn
            @click='validateForm'
            icon="add"
            dense
            flat
            round />
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
            {{ object.title }} - {{ object.price }}€
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
      <q-chip v-if="objects.length" class='shadow-5' size="xl" icon="euro_symbol">
        {{ sumObjects }}
      </q-chip>
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
      newPrice: '',
      newObject: '',
      objects: []
    }
  },

  methods: {
    getObjects() {
      this.$axios.get(`${ process.env.API }/objects`).then(response => {
        this.objects = response.data
      }).catch(err => {
        this.$q.dialog({
          title: 'Error',
          message: 'Could not connect to database'
        })
      })
    },
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
      var objPrice = parseInt(this.newPrice.replace(/\D/g, ''))
      var newObjectName = JSON.stringify(this.newObject).replace(/[^0-9A-Za-z-_\s]/g, '')

      let formData = new FormData()
      formData.append('title', newObjectName)
      formData.append('price', objPrice)
      formData.append('packed', false)

      this.$axios.post(`${ process.env.API }/addObject`, formData).then(response => {
        console.log('response', response)
      })

      this.newObject = ''
      this.newPrice = ''
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
      if (this.newObject == "" || this.newPrice == "") {
        this.$q.notify({
          message: 'Feld leer!',
          icon: 'announcement',
          color: 'accent'
        });
      }
      else {
        this.addObject();
      }
    }
  },

  created() {
    this.getObjects()
  },

  computed: {
    sumObjects () {
      var packedObjects = this.objects.filter(object => (object.packed === true));
      var total = packedObjects.reduce((all, add) => all + add.price, 0);
      return total;
    },
  },
}
</script>
<style lang='scss'>
.no-objects {
  opacity: 0.5;
}

/* input:invalid {
  color: red !important;
} */
</style>
