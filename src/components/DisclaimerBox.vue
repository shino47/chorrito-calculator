<template>
  <div class="container my-3">
    <p class="text-muted mb-1">
      <b>{{ note }}</b>: {{ content }}
    </p>

    <p class="text-muted">
      {{ calculation }}
    </p>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        note: 'Nota',
        content: `Los datos mostrados aquí son meras aproximaciones. No nos hacemos responsables \
          por reclamos hechos en Recursos Humanos.`,
        calculation: `* Para los cálculos de I.S.R. y Seguro Social se ha asumido el mismo \
          salario durante todo el año, sin contar horas extras, comisiones, tardanzas, ausencias \
          y otros factores.`,
      }
    }
  }
</script>
