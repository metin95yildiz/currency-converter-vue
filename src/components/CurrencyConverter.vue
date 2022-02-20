<template>
  <div class="row bg-dark">
    <div class="col-md-8 mx-auto">
        <div class="card card-body text-center mh-100 mt-5 mb-5">
            <form id="currency-form" @submit.prevent="convert" method="get">
                <div class="form-group d-flex flex-nowrap my-4">
                    <div class="input-group d-flex justify-content-start flex-nowrap">
                        <label class="input-group-text" for="firstCurrency">
                            First Currency
                        </label>
                        <select v-model="firstCurrency" class="selectpicker bg-secondary w-25" name="firstCurrency">
                            <option v-for="currency, key in getCurrencies" :key="key">
                                {{ key }}
                            </option>
                        </select>
                    </div>
                    <div class="input-group d-flex justify-content-end flex-nowrap">
                        <label class="input-group-text" for="secondCurrency">
                            Second Currency
                        </label>
                        <select v-model="secondCurrency" class="selectpicker bg-secondary w-25" name="secondCurrency">
                            <option v-for="currency, key in getCurrencies" :key="key">
                                {{ key }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group my-4">
                    <input v-model="amount" type="number" class="form-control"
                    name="amount" placeholder="Amount" min="1" required />
                </div>
                <div class="form-group my-4">
                    <input type="submit" class="btn btn-primary w-100"
                    id="submitbtn" value="Calculate" />
                </div>
            </form>

            <transition name="fade" mode="out-in" appear>
                <div id="results" class="card card-body bg-danger pt-4" v-if="getCurrencyInfo">
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
                <div v-else-if="isThereError">Please check currencies and amount...</div>
                <div class="alert alert-warning" v-else>Choose currencies and determine amount to convert...</div>
            </transition>
        </div>

        <div id="currencyList" class="card card-body bg-light pt-4">
            <h3>Currency List</h3>
            <br>
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">Code</th>
                    <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(currency, key) in getCurrencies" :key="key">
                    <th scope="row">{{key}}</th>
                    <td>{{currency}}</td>
                    </tr>
                </tbody>
            </table>
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
          amount: "",
          isThereError: false
      }
  },
  methods: {
      convert() {
          !this.firstCurrency || !this.secondCurrency || !this.amount ?
            this.isThereError = true
          :
          this.$store.dispatch("convert", {
              firstCurrency: this.firstCurrency,
              secondCurrency: this.secondCurrency,
              amount: this.amount })
            this.isThereError = false;
      }
  },
  computed: {
      ...mapGetters(["getCurrencyInfo", "getCurrencies"])
  },
}
</script>


<style scoped>
.card {
    transition: height 1s;
}
.fade-enter {
    opacity: 0;
}
.fade-enter-active {
    transition: opacity 1s 0.5s;
}
.fade-leave-active {
    transition: opacity 1s 0.5s;
    opacity: 0;
}
</style>
