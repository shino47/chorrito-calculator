<template>
  <div class="container my-4">
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="card">
          <h5 class="card-header bg-info text-white">{{ label.data }}</h5>

          <div class="card-body">
            <div class="form-group">
              <label for="salary">{{ label.salary }}</label>

              <input id="salary"
                class="form-control"
                type="number"
                step=".01"
                min="0.01"
                v-model="salary"/>
            </div>

            <div class="form-row">
              <div class="form-group col-sm-6">
                <label for="months">{{ label.months }}</label>

                <input id="months"
                  class="form-control"
                  type="number"
                  step="1"
                  min="1"
                  v-model="months"/>
              </div>

              <div class="form-group col-sm-6">
                <label for="factor">{{ label.factor }}</label>

                <input id="factor"
                  class="form-control"
                  type="number"
                  step=".01"
                  v-model="factor" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 mb-3">
        <info-box :box="this.getResultBox()"></info-box>
      </div>
    </div>

    <div class="row">
      <div class="col-md-4 mb-3">
        <info-box :box="this.getDecimoBox()"></info-box>
      </div>

      <div class="col-md-4 mb-3">
        <info-box :box="this.getAguinaldoBox()"></info-box>
      </div>

      <div class="col-md-4 mb-3">
        <info-box :box="this.getChorritoBox()"></info-box>
      </div>
    </div>
  </div>
</template>

<script>
  import InfoBox from './InfoBox.vue'
  import Calculator from './../scripts/calculator.js'

  const label = {
    total: 'Total',
    data: 'Datos',
    results: 'Resultados',
    chorrito: 'Partipación de Utilidades',
    aguinaldo: 'Aguinaldo',
    decimo: 'Décimo',
    salary: 'Salario mensual',
    months: 'Meses trabajando',
    factor: 'Factor de bonificación',
    isr: 'I.S.R.',
    seguro_social: 'Seguro social',
    seguro_educativo: 'Seguro educativo',
    base: 'Base',
    ingreso_bruto: 'Ingreso bruto',
    time_ratio: 'Proporción por antigüedad',
  };

  export default {
    components: {
      'info-box': InfoBox,
    },
    data () {
      return {
        salary: null,
        months: null,
        factor: 2.5,
        label: label,
      }
    },
    computed: {
      decimo_bruto () {
        return Calculator.getDecimoBruto(this.salary);
      },
      decimo_isr () {
        return Calculator.getDecimoIsr(this.salary);
      },
      decimo_ss () {
        return Calculator.getDecimoSeguroSocial(this.salary);
      },
      decimo () {
        return Calculator.getDecimo(this.salary);
      },
      time_ratio () {
        return Calculator.getTimeRatio(this.months);
      },
      aguinaldo_base () {
        return Calculator.getAguinaldoBase(this.salary);
      },
      aguinaldo_bruto () {
        return Calculator.getAguinaldoBruto(this.salary, this.months);
      },
      aguinaldo_isr () {
        return Calculator.getAguinaldoIsr(this.salary, this.months);
      },
      aguinaldo () {
        return Calculator.getAguinaldo(this.salary, this.months);
      },
      chorrito_base () {
        return Calculator.getChorritoBase(this.salary, this.factor);
      },
      chorrito_bruto () {
        return Calculator.getChorritoBruto(this.salary, this.factor, this.months);
      },
      chorrito_isr () {
        return Calculator.getChorritoIsr(this.salary, this.factor, this.months);
      },
      chorrito () {
        return Calculator.getChorrito(this.salary, this.factor, this.months);
      },
      total_bonus () {
        return (this.chorrito + this.aguinaldo + this.decimo);
      },
    },
    watch: {
      salary (newValue, oldValue) {
        this.salary = Math.abs(newValue);
      },
      months (newValue, oldValue) {
        this.months = Math.abs(Math.floor(newValue));
      },
      factor (newValue, oldValue) {
        this.factor = Math.abs(newValue);
      },
    },
    methods: {
      getResultBox () {
        return {
          title: this.label.results,
          total_label: label.total,
          total_value: this.total_bonus,
          data: [
            {
              label: this.label.decimo,
              value: this.decimo,
            },
            {
              label: this.label.aguinaldo,
              value: this.aguinaldo,
            },
            {
              label: this.label.chorrito,
              value: this.chorrito,
            },
          ]
        };
      },
      getDecimoBox () {
        return {
          title: this.label.decimo,
          total_label: label.total,
          total_value: this.decimo,
          data: [
            {
              label: this.label.salary,
              value: this.salary,
            },
            {
              label: this.label.base,
              value: this.decimo_bruto,
            },
            {
              label: this.label.isr,
              value: -this.decimo_isr,
            },
            {
              label: this.label.seguro_social,
              value: -this.decimo_ss,
            },
          ]
        }
      },
      getAguinaldoBox () {
        return {
          title: this.label.aguinaldo,
          total_label: label.total,
          total_value: this.aguinaldo,
          data: [
            {
              label: this.label.salary,
              value: this.salary,
            },
            {
              label: this.label.factor,
              value: Calculator.getAguinaldoRatio(),
              filter: 'percent',
            },
            {
              label: this.label.base,
              value: this.aguinaldo_base,
            },
            {
              label: this.label.time_ratio,
              value: this.time_ratio,
              filter: 'percent',
            },
            {
              label: this.label.ingreso_bruto,
              value: this.aguinaldo_bruto,
            },
            {
              label: this.label.isr,
              value: -this.aguinaldo_isr,
            },
          ]
        }
      },
      getChorritoBox () {
        return {
          title: this.label.chorrito,
          total_label: label.total,
          total_value: this.chorrito,
          data: [
            {
              label: this.label.salary,
              value: this.salary,
            },
            {
              label: this.label.factor,
              value: this.factor,
              filter: false,
            },
            {
              label: this.label.base,
              value: this.chorrito_base,
            },

            {
              label: this.label.time_ratio,
              value: this.time_ratio,
              filter: 'percent',
            },
            {
              label: this.label.ingreso_bruto,
              value: this.chorrito_bruto,
            },
            {
              label: this.label.isr,
              value: -this.chorrito_isr,
            },
          ]
        }
      },
    }
  }
</script>
