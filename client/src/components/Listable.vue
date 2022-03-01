<template>
  <q-card class="bg-white no-shadow" style="border: none !important">
    <q-card-section>
      <div class="row full-width">
        <div class="column full-width">
          <div class="text-h6 text-bold" style="line-height: 22px"> Busqueda </div>
          <div class="text-caption q-pb-sm"> Filtrar por cualquier informacion que se encuentre en la tabla </div>
          <div class="row full-width">
            <div>
              <q-input dense class="box-shadow-search-listable" v-model="filter" placeholder="Buscar..." borderless>
                <template v-slot:append>
                  <q-icon v-if="filter === ''" name="search" />
                  <q-icon v-else name="bi-x" class="cursor-pointer" @click="filter = ''" />
                </template>
              </q-input>
            </div>
            <q-space />
            <div v-if="newObjectBtnProps">
              <q-btn
                :label="newObjectBtnProps.title"
                icon="add"
                rounded
                color="secondary"
                push
                no-caps
                :to="newObjectBtnProps.url ? newObjectBtnProps.url : null"
                @click="execute(newObjectBtnProps.action)"
              />
            </div>
          </div>

        </div>
      </div>
    </q-card-section>
    <q-card-section class="q-pa-none">
      <q-table :data="data" :columns="columnsView" flat :visible-columns="visibleColumns" no-results-label="No hay Datos"
        hide-bottom :loading="loading" class="" :filter="filter" row-key="_id" ref="tabla_listable" :separator="'vertical'"
        :pagination.sync="pagination" hide-pagination dense
      >
        <template v-slot:body-cell-actions="props" v-if="checkIfActions">
          <q-td :props="props" :class="props.rowIndex % 2 === 0 ? 'bg-grey-1' : 'bg-white'">
            <div class="row no-wrap q-gutter-x-xs justify-center">
              <q-btn
                v-for="n in props.row.actions"
                :key="n.title"
                :icon="n.icon"
                style="width:120px"
                class="text-white"
                dense
                size="11px"
                :label="n.title"
                push
                :to="n.url ? n.url : null"
                @click="execute(n.action, props.row.id, props.row, n)"
                :color="n.color ? n.color : 'primary'"
              />
            </div>
          </q-td>
        </template>

      </q-table>
    </q-card-section>
    <q-card-section>
      <div class="row q-mt-md">
      <q-space />
      <q-pagination
        v-model="pagination.page"
        color="black"
        :max="pagesNumber"
        size="sm"
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
        round
        active-color="black"
        active-text-color="white"
      />
    </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'TableActions',
  computed: {
    pagesNumber () {
      return Math.ceil(this.data.length / this.pagination.rowsPerPage)
    },
    checkIfActions () {
      return this.columnsView.find((element) => element.name === 'actions')
    },
    newObjectBtnProps () {
      return this.btnNewObject
    }
  },
  props: {
    btnNewObject: {
      default: null
    },
    apiroute: {
      type: String,
      default: ''
    },
    columns: {
      type: Array
    },
    selectedItem: {
      type: Boolean,
      default: false
    },
    nameModule: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      mostrarColumnas: false,
      avatar: false,
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 25
      },
      filter: '',
      loading: false,
      data: [],
      visibleColumns: [],
      columnsView: []
    }
  },
  async mounted () {
    this.columnsView = this.columns
    this.visibleColumns = this.columnsView.map((element) => element.name)
    await this.getRecord()
  },
  methods: {
    async getRecord () {
      this.$q.loading.show()
      await this.$api.get(this.apiroute).then(res => {
        this.$q.loading.hide()
        if (res) {
          console.log(res, 'res')
          this.data = res.map(itm => {
            return {
              ...itm,
              actions: [
                { title: 'Editar', icon: 'edit', color: 'primary', action: 'edit', url: `${this.$route.path}/form/${itm.id}` },
                { title: 'Eliminar', icon: 'delete', color: 'negative', action: 'delete' }
              ]
            }
          })
        }
      })
    },
    execute (name, id, row, action) {
      console.log(name, 'name', id, 'id', row, 'row', action, 'action')
      if (typeof this[name] === 'function') {
        console.log('entra aqui')
        this[name](id, row, action)
      }
    },
    delete (id) {
      this.$q.dialog({
        title: '¡Atención!',
        message: '¿Eliminar el registro?',
        cancel: {
          label: 'Cancelar',
          outline: true
        },
        persistent: true,
        ok: {
          label: 'Eliminar',
          push: true
        }
      }).onOk(() => {
        this.confirmDelete(id)
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    async confirmDelete (id) {
      this.$q.loading.show()
      await this.$api.delete(this.apiroute + '/' + id).then(res => {
        this.$q.loading.hide()
        if (res) {
          this.getRecord()
          this.$q.notify({
            message: 'Eliminado Correctamente',
            color: 'positive'
          })
        }
      })
    },
    async sacarMod (ind) {
      // sacar mod para el color de la fila
      if (ind % 2 === 0) {
        console.log(ind, '0')
        return 'bg-white'
      } else {
        return 'bg-red'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.style-btn-actions {
  border-radius: 10px
}

.container {
  width: auto;
  position: relative;
}

.border {
  margin-left: 15px;
  margin-right: 15px;
}

.input-filters {
  min-width: 100px;
  border-radius: 12px;
  border: 0;
  border-bottom: 1px solid #ccc;
  padding: 5px;
  height:40px;
  background: $red-1;
}

.input-filters ~ .border {
 position: absolute;
 bottom: 0;
 left: 50%;
 width: 0;
 height: 2px;
 background-color: $secondary;
}

.input-filters:focus {
  outline: none;
}

.input-filters:focus ~ .border {
  width: calc(100% - 35px);
  transition: 0.4s;
  left: 0;
}
</style>
