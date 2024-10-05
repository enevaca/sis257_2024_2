<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { computed, ref } from 'vue'

const titulo = ref<string>('Prueba')
const contador = ref<number>(0)
const colores = ref([
  { clave: 'red', valor: 'Rojo' },
  { clave: 'yellow', valor: 'Amarillo' },
  { clave: 'green', valor: 'Verde' },
  { clave: 'black', valor: 'Negro' }
])
const colorIngles = ref<string>('')
const colorEspanol = ref<string>('')

function incrementar() {
  contador.value++
}

function agregarColor() {
  colores.value.push({ clave: colorIngles.value, valor: colorEspanol.value })
  colorIngles.value = ''
  colorEspanol.value = ''
}

const parImpar = computed(() => (contador.value % 2 == 0 ? 'Par' : 'Impar'))
</script>

<template>
  <div>
    <h1>{{ titulo }} - {{ contador }} - {{ parImpar }}</h1>
    Cambiar título: <InputText type="text" v-model="titulo" />
    <Button @click="incrementar" label="Incrementar" icon="pi pi-plus" /><br />
    <p v-if="contador % 2 == 0">Es Par</p>
    <p v-else>Es Impar</p>
    Color Inglés: <InputText type="text" v-model="colorIngles" /> Color Español:
    <InputText type="text" v-model="colorEspanol" />
    <Button @click="agregarColor" label="Agregar Color" icon="pi pi-plus" />
    <ul>
      <li v-for="(color, index) in colores" :key="index" :style="'color:' + color.clave">
        {{ color.valor }}
      </li>
    </ul>
  </div>
</template>

<style scoped></style>
