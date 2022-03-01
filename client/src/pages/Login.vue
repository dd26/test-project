<template>
  <q-card class="flex flex-center row absolute-full bg-grey-2">
    <q-card class="col-xs-12 col-sm-7 q-pa-md row q-py-xl">
      <div class="col-12 text-center text-h5">Inicia Sesion</div>

      <section class="col-12 row q-gutter-y-xs q-pt-md">

        <div class="col-12 row justify-center">
          <q-input
            v-model="form.email"
            placeholder="Correo electronico"
            outlined
            class="col-xs-12 col-sm-8"
            :error="$v.form.email.$error"
            @blur="$v.form.email.$touch"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="primary" />
            </template>
          </q-input>
        </div>

        <div class="col-12 row justify-center">
          <q-input
            v-model="form.password"
            placeholder="Contraseña"
            outlined
            class="col-xs-12 col-sm-8"
            :error="$v.form.password.$error"
            @blur="$v.form.password.$touch"
            :type="isPwd ? 'password' : 'text'"
          >
            <template v-slot:append>
              <q-icon
                class="cursor-pointer"
                :name="isPwd ? 'visibility' : 'visibility_off'"
                color="primary"
                @click="isPwd = !isPwd"
              />
            </template>
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
          </q-input>
        </div>

        <div class="col-12 justify-center row">
          <q-btn
            color="primary"
            class="col-6"
            :loading="loading"
            @click="onSubmit"
            push
            label="Iniciar Sesion"
            no-caps
          />
        </div>

      </section>
    </q-card>
  </q-card>
</template>

<script>
import { mapMutations } from 'vuex'
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      form: {
        email: null,
        password: null
      },
      isPwd: true,
      loading: false
    }
  },
  methods: {
    ...mapMutations('generals', ['login']),
    async onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.loading = true
      this.$q.loading.show()
      await this.$api.post('login', this.form).then(res => {
        this.$q.loading.hide()
        this.loading = false
        console.log(res, 'ressss')
        if (res && res.token) {
          this.login(res)
          this.$router.push('/')
        } else {
          this.$q.notify({
            color: 'negative',
            textColor: 'white',
            message: 'Usuario o contraseña incorrectos'
          })
        }
      })
    }
  },
  validations () {
    return {
      form: {
        password: { required },
        email: { required }
      }
    }
  }
}
</script>

<style>

</style>
