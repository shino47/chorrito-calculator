<template>
  <div class="card">
    <h5 class="card-header bg-info text-white">{{ box.title }}</h5>

    <div class="card-body p-0">
      <table class="table m-0">
        <tfoot>
          <tr class="bg-light font-weight-bold">
            <td>{{ box.total_label }}</td>

            <td class="text-right" :class="getClassForNumber(box.total_value, true)">
              {{ box.total_value | currency }}
            </td>
          </tr>
        </tfoot>

        <tbody>
          <tr v-for="(item, index) in box.data" :key="index">
            <td>{{ item.label }}</td>

            <td class="text-right" :class="getClassForNumber(item.value)">
              <span v-if="'percent'== item.filter">
                {{ item.value | percent}}
                </span>

              <span v-else-if="false == item.filter">
                {{ item.value }}
              </span>

              <span v-else>
                {{ item.value | currency }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      box: {
        options: Object
      }
    },
    methods: {
      getClassForNumber (number, renderPositive=false) {
        if (number < 0) {
          return ['text-danger'];
        }
        if (number > 0 && renderPositive) {
          return ['text-success'];
        }
        return [];
      }
    }
  }
</script>
