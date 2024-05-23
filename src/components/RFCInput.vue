<template>
  <div>
    <input v-model="inputValue" @input="validateRFC" placeholder="Enter RFC" />
    <p class="invalid" v-if="!isValid">RFC no válido</p>
    <p v-if="rfcType">Tipo de RFC: {{ rfcType }}</p>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

//Prop recibida por el componente
const props = defineProps({
  RFC: String
})

//Variables reactivas
const inputValue = ref(props.RFC || '')
const isValid = ref(true)
const rfcType = ref('')

//Función para validar el RFC
function validateRFC() {
  const fisicaPattern = /^[A-ZÑ&]{4}\d{6}[A-Z\d]{3}$/i
  const moralPattern = /^[A-ZÑ&]{3}\d{6}[A-Z\d]{3}$/i

  if (fisicaPattern.test(inputValue.value)) {
    rfcType.value = 'Persona Física'
    isValid.value = true
  } else if (moralPattern.test(inputValue.value)) {
    rfcType.value = 'Persona Moral'
    isValid.value = true
  } else {
    rfcType.value = ''
    isValid.value = false
  }

  console.log(`RFC: ${inputValue.value}, Validez: ${isValid.value}, Tipo: ${rfcType.value}`)
}

//Observador para cambiar el estado de validez cuando el valor del RFC cambia
watch(
  () => props.RFC,
  (newValue) => {
    inputValue.value = newValue
    validateRFC()
  }
)

watch(inputValue, validateRFC)
</script>

<style scoped>
.invalid {
  color: red;
}
</style>
