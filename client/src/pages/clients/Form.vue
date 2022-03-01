<template>
  <q-page class="q-pa-lg bg-grey-1 row">
    <q-card class="row justify-center">

      <section class="col-7 row q-pa-xl justify-center">
        <div class="col-12 text-center text-h5 q-pb-lg">Ingresa datos</div>
        <div class="col-12 justify-center row">
          <q-input
              label="Nombre"
              v-model="form.name"
              :error="$v.form.name.$error"
              @blur="$v.form.name.$touch()"
              outlined
              class="col-xs-12 col-sm-12"
          />
        </div>

        <div class="col-12 justify-center row">
          <q-input
              label="Email"
              v-model="form.email"
              :error="$v.form.email.$error"
              @blur="$v.form.email.$touch()"
              outlined
              class="col-xs-12 col-sm-12"
          />
        </div>

        <div class="col-12 justify-center row">
          <q-input
              label="Dni"
              v-model="form.dni"
              :error="$v.form.dni.$error"
              @blur="$v.form.dni.$touch()"
              outlined
              class="col-xs-12 col-sm-12"
          />
        </div>

        <div class="col-12 justify-center row">
          <q-input
              label="Direccion"
              v-model="form.address"
              :error="$v.form.address.$error"
              @blur="$v.form.address.$touch()"
              outlined
              type="textarea"
              class="col-xs-12 col-sm-12"
          />
        </div>

        <div class="col-12 justify-center row">
          <q-input
              label="Telefono"
              v-model="form.phone"
              :error="$v.form.phone.$error"
              @blur="$v.form.phone.$touch()"
              outlined
              class="col-xs-12 col-sm-12"
          />
        </div>

        <div class="col-12 justify-center row">
          <q-input
              label="Ciudad"
              v-model="form.city"
              :error="$v.form.city.$error"
              @blur="$v.form.city.$touch()"
              outlined
              class="col-xs-12 col-sm-12"
          />
        </div>

        <div class="col-12 row justify-center">
          <q-btn
            color="primary"
            class="col-6"
            @click="save"
            push
            label="Guardar"
            no-caps
          />
        </div>
      </section>

    </q-card>
  </q-page>
</template>

<script>
import { FormMixin } from '../../mixins/Form'
import { required, email } from 'vuelidate/lib/validators'
export default {
  mixins: [FormMixin],
  data () {
    return {
      form: {
        name: null,
        email: null,
        dni: null,
        address: null,
        phone: null,
        city: null
      },
      route: 'clients',
      stayAfterSave: true
    }
  },
  validations: {
    form: {
      name: { required },
      email: { required, email },
      dni: { required },
      address: { required },
      phone: { required },
      city: { required }
    }
  }
}
</script>

<style>

</style>
