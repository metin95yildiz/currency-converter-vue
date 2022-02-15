<template>
  <div class="row bg-dark">
    <div class="col-md-8 mx-auto">
        <div class="card card-body text-center mh-100 mt-5 mb-5">
            <form id="currency-form" @submit.prevent="convert" method="post">
                <div class="form-group d-flex flex-nowrap my-4">
                    <div class="input-group d-flex justify-content-start flex-nowrap">
                        <label class="input-group-text" for="firstCurrency">
                            First Currency
                        </label>
                        <select v-model="firstCurrency" class="selectpicker bg-secondary w-25" name="firstCurrency">
                            <option v-for="currency in getCurrencies" :key="currency">
                                {{ currency }}
                            </option>
                        </select>
                    </div>
                    <div class="input-group d-flex justify-content-end flex-nowrap">
                        <label class="input-group-text" for="secondCurrency">
                            Second Currency
                        </label>
                        <select v-model="secondCurrency" class="selectpicker bg-secondary w-25" name="secondCurrency">
                            <option v-for="currency in getCurrencies" :key="currency">
                                {{ currency }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group my-4">
                    <input v-model="amount" type="number" class="form-control"
                    name="amount" placeholder="Amount" min="0" required />
                </div>
                <div class="form-group my-4">
                    <input type="submit" class="btn btn-primary w-100"
                    id="submitbtn" value="Calculate" />
                </div>
            </form>

            <div id="results" class="bg-danger pt-4"  v-if="getCurrencyInfo">
                <h4>Results</h4>
                <div class="form-group">
                    <span class="input-group-text justify-content-center my-4">
                        {{getCurrencyInfo.amount}} {{getCurrencyInfo.firstCurrency}}
                    </span>
                    <div class="form-control my-4" id="result">
                        {{getCurrencyInfo.result}} - {{getCurrencyInfo.secondCurrency}}
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CurrencyConverter",
  data() {
      return {
          firstCurrency: "",
          secondCurrency: "",
          amount: ""
      }
  },
  methods: {
      convert() {
          this.$store.dispatch("convert", {
              firstCurrency: this.firstCurrency,
              secondCurrency: this.secondCurrency,
              amount: this.amount })
      }
  },
  computed: {
      ...mapGetters(["getCurrencyInfo", "getCurrencies"])
  }
}
</script>


<style scoped>

</style>
