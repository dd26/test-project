<template>
  <q-page class="q-pa-lg">
    <listable
      :columns="columns"
      :apiroute="route"
      :btnNewObject="btnNewObject"
    />
  </q-page>
</template>

<script>
import Listable from '../../components/Listable.vue'
export default {
  components: {
    Listable
  },
  data () {
    return {
      route: 'clients',
      btnNewObject: { title: 'Nuevo Cliente', url: this.$route.path + '/form' },
      columns: [
        { name: 'name', label: 'Nombre', field: 'name', sortable: false, align: 'left' },
        { name: 'email', label: 'Email', field: 'email', sortable: false, align: 'left' },
        { name: 'dni', label: 'DNI', field: 'dni', sortable: false, align: 'left' },
        { name: 'address', label: 'Direccion', field: 'address', sortable: false, align: 'left' },
        { name: 'phone', label: 'Telefono', field: 'phone', sortable: false, align: 'left' },
        { name: 'city', label: 'Ciudad', field: 'city', sortable: false, align: 'left' },
        { name: 'actions', label: 'Opciones', field: 'actions', sortable: false, align: 'center' }
      ]
    }
  }
}
</script>
