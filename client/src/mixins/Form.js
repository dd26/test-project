import { Loading } from 'quasar'
export const FormMixin = {
  data () {
    return {
      id: this.$route.params.id,
      insert: true
    }
  },
  async mounted () {
    if (typeof this.beforeMounted === 'function') {
      this.beforeMounted()
    }
    // Si en la ruta hay más de un id obtengo el ultimo valor de la ruta
    // const route = this.$route.fullPath.split('/')
    // const last = route[route.length - 1]

    // this.id = !isNaN(last) ? last : undefined // Si el ultimo valor de la ruta es un número es el ID que usaremos en modo de edición
    console.log(this.id, 'id')
    if (this.id) { // Si es un número entonces es modo de edición sin importar si hay otros ids
      await this.getRecord()
      this.insert = false
    }
    if (typeof this.afterMounted === 'function') {
      this.afterMounted()
    }
  },
  methods: {
    async getRecord () {
      Loading.show()
      console.log('get record')
      await this.$api.get(`${this.route}/${this.id}`).then(res => {
        this.form = res
        if (typeof this.afterGetRecord === 'function') {
          this.afterGetRecord(res)
        }
        Loading.hide()
      })
    },
    save () {
      if (typeof this.beforeValidate === 'function') {
        this.beforeValidate()
      }
      this.$v.form.$touch()
      if (typeof this.afterValidate === 'function') {
        this.afterValidate()
      }
      console.log('save', this.$v.form, this.form, 'form')
      if (!this.$v.form.$error) {
        this.$q.loading.show()
        if (typeof this.beforeSave === 'function') {
          this.beforeSave()
        }
        if (this.insert) { // modo inserción
          this.$api.post(this.route, this.form).then(res => {
            this.$q.loading.hide()
            if (res) {
              if (typeof this.afterSave === 'function') {
                this.afterSave(res)
              }
              if (this.stayAfterSave) {
                this.$router.go(-1)
              }
            }
          })
        } else { // modo edición
          console.log('Modo de edición')
          this.$api.put(`${this.route}/${this.id}`, this.form).then(res => {
            this.$q.loading.hide()
            console.log('typeof this.afterSave', typeof this.afterSave)
            if (res) {
              console.log('typeof this.afterSave', typeof this.afterSave)
              if (typeof this.afterSave === 'function') {
                this.afterSave(res)
              }
              this.$q.notify({
                type: 'positive',
                message: 'Registro modificado exitosamente'
              })
              if (this.stayAfterSave) {
                this.$router.go(-1)
              }
            }
          })
        }
      }
    }
  },

  created () {
  }
}
