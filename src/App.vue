<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center">
    <div class="max-w-xl mx-auto">
      <div class="p-8 bg-white shadow-lg rounded-3xl">
        <div>
          <div class="text-3xl mb-4">PV-Anlage Übersicht</div>
        </div>

        <div class="py-8 text-base leading-6 space-y-4 text-gray-700">
          <div class="flex justify-between space-x-6">
            <p class="text-xl">PV Erzeugung:</p>
            <p class="text-xl">{{ `${pPV} kW` }}</p>
          </div>
          <div class="flex justify-between space-x-6">
            <p class="text-xl">Stromverbrauch:</p>
            <p class="text-xl">{{ `${pLoad} kW` }}</p>
          </div>
          <div class="flex justify-between space-x-6">
            <p class="text-xl">Akku {{ pAkku < 0 ? "Entladung" : "Ladung" }}:</p>
            <p class="text-xl">{{ `${pAkku} kW` }}</p>
          </div>
          <div class="flex justify-between space-x-6">
            <p class="text-xl">Strombilanz Haus:</p>
            <p class="text-xl">{{ `${pGrid} kW` }}</p>
          </div>
          <div class="flex justify-between space-x-6">
            <p class="text-xl">Akku Ladezustand:</p>
            <p class="text-xl">{{ `${akkuSoc} %` }}</p>
          </div>
        </div>

        <button
          class="bg-cyan-600 hover:bg-cyan-800 text-white font-bold py-2 px-4 rounded"
          @click="this.fetchData"
        >
          Aktualisieren
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import * as API from "./fronius/api";

export default {
  name: "App",
  data() {
    return {
      pAkku: 0,
      pGrid: 0,
      pLoad: 0,
      pPV: 0,
      akkuSoc: 0,
      akkuTime: 0,
      akkuTarget: 0,
    };
  },
  created() {
    this.fetchData();
    this.timer = setInterval(this.fetchData, 3000);
  },
  beforeDestroy() {
    this.cancelAutoUpdate();
  },
  methods: {
    cancelAutoUpdate() {
      clearInterval(this.timer);
    },
    fetchData() {
      console.log("Fetching data...");
      this.fetchBatteryData();
      this.fetchPowerFlow();
    },
    fetchPowerFlow() {
      fetch(API.BASE_URL + API.FLOW + "/")
        .then((response) => response.json())
        .then((res) => {
          const status = API.HEADER_STATUS_CODES[res.Head.Status.Code];
          const data = res.Body.Data.Site;
          console.log("Status:", status);
          this.pAkku = ((-1 * Math.round(data.P_Akku)) / 1000).toFixed(2);
          this.pGrid = (Math.round(data.P_Grid) / 1000).toFixed(2);
          this.pLoad = ((-1 * Math.round(data.P_Load)) / 1000).toFixed(2);
          this.pPV = (Math.round(data.P_PV) / 1000).toFixed(2);
        })
        .catch((err) => console.log(err));
    },
    fetchBatteryData() {
      fetch(API.BASE_URL + API.BATTERY + "/")
        .then((response) => response.json())
        .then((res) => {
          const status = API.HEADER_STATUS_CODES[res.Head.Status.Code];
          console.log("Status:", status);
          this.akkuSoc = res.Body.Data[0].Controller.StateOfCharge_Relative;
        })
        .catch((err) => console.log(err));
    },
    fetchData1() {
      console.log("Fetching data...");
      fetch(API.BASE_URL + API.INVERTER + "/")
        .then((response) => response.json())
        .then((res) => {
          const status = API.HEADER_STATUS_CODES[res.Head.Status.Code];
          console.log("Status:", status);
          console.log(res.Body.Data);
        })
        .catch((err) => console.log(err));
    },
    fetchData2() {
      console.log("Fetching data...");
      fetch(API.BASE_URL + API.METER + "/")
        .then((response) => response.json())
        .then((res) => {
          const status = API.HEADER_STATUS_CODES[res.Head.Status.Code];
          console.log("Status:", status);
          console.log(res.Body.Data);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style>
battery-indicator {
  width: 48px;
  height: 48px;
  --charge-fill: #000;
  --charge-fill-opacity: 1;
  --background-fill: #000;
  --background-fill-opacity: 0.3;
  --status-fill: #fff;
  --status-fill-opacity: 1;
}
</style>
