<script lang="ts" setup>
import { Doughnut } from 'vue-chartjs';
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { useToasterStore } from '~~/store/toaster';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  ArcElement,
);

const startDate = ref<string>(new Date().toISOString());
const endDate = ref<string>(new Date().toISOString());
const { $trpc } = useNuxtApp();
const { setMessage } = useToasterStore();

const { data, refresh } = await useAsyncData(() =>
  $trpc.dashboard.counts.query({
    countType: startDate.value && endDate.value ? 'dateRange' : 'models',
    startDate: startDate.value,
    endDate: endDate.value,
  }),
);

const chartOptions = ref({
  responsive: true,
  cutout: 130,
  plugins: {
    legend: {
      display: false,
    },
  },
});

const setDate = (dateStr: string[] | null) => {
  if (!dateStr) {
    startDate.value = new Date().toISOString();
    endDate.value = new Date().toISOString();
  } else {
    startDate.value = dateStr[0];
    endDate.value = dateStr[1];
  }

  refresh();
};
</script>

<template>
  <div
    class="lg:w-[64%] w-full lg:mb-0 md:mb-10 bg-white small-shadow rounded-[4px] w-full py-4 px-6"
  >
    <div class="md:flex justify-between items-center">
      <h5 class="text-stone mb-4 md:mb-0">Alerts</h5>
      <DatePicker
        @on-error="
          setMessage('Please select both start and end date.', 'error')
        "
        @setDate="setDate"
      ></DatePicker>
    </div>
    <div px-8>
      <div class="flex flex-col justify-between items-center gap-10">
        <div class="relative w-[400px] h-[400px] my-8 tenant-chart">
          <Doughnut
            id="dashboardChart"
            :options="chartOptions"
            :data="{
              labels: ['Emails', 'SMS', 'Alerts'],
              datasets: [
                {
                  data: [
                    data?.emailCount || 0,
                    data?.smsCount || 0,
                    data?.voiceCount || 0,
                    data?.messageCount || 0,
                  ],
                  backgroundColor: [
                    '#960E0E',
                    '#B42424',
                    '#D27C7C',
                    '#7F211B',
                    '#000000',
                    '#B42425',
                  ],
                  borderWidth: 0,
                },
              ],
            }"
          />
          <div
            class="tenant-counting absolute flex items-center top-[12.6rem] left-1/2 w-[12rem] h-[12rem] transform -translate-x-1/2 -translate-y-1/2 rounded-full p-10 shadow-[0_3.20559px_32.0559px_rgba(0,0,0,0.08)]"
          >
            <div flex flex-col items-center mx-auto>
              <p text-silver mb-3>Total Alerts</p>
              <h1>
                {{
                  (data?.emailCount || 0) +
                  (data?.smsCount || 0) +
                  (data?.messageCount || 0)
                }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div
        class="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-1 content-around gap-10 md:mb-0 mb-10"
      >
        <div class="mb-8 flex flex-col items-center md:items-start">
          <div class="flex items-center gap-2 mb-2">
            <img src="/messages.png" alt="" class="h-8" />
          </div>
          <div class="flex items-center mb-2">
            <h4 class="text-carbon mr-2">{{ data?.smsCount || 0 }}</h4>
          </div>
          <div class="flex items-center gap-2">
            <img src="/sms-bullet.png" alt="" />
            <span class="text-silver">SMS</span>
          </div>
        </div>
        <div class="mb-8 flex flex-col items-center md:items-start">
          <div class="flex items-center gap-2 mb-2">
            <img src="/SentEmails.png" alt="" class="h-8" />
          </div>
          <div class="flex items-center mb-2">
            <h4 class="text-carbon mr-2">{{ data?.emailCount || 0 }}</h4>
          </div>
          <div class="flex items-center gap-2">
            <img src="/email-bullet.png" alt="" />
            <span class="text-silver">Emails</span>
          </div>
        </div>
        <div class="mb-8 flex flex-col items-center md:items-start">
          <div class="flex items-center gap-2 mb-2">
            <img src="/alerts.png" alt="" class="h-8" />
          </div>
          <div class="flex items-center mb-2">
            <h4 class="text-carbon mr-2">{{ data?.messageCount || 0 }}</h4>
          </div>
          <div class="flex items-center gap-2">
            <img src="/alert-bullet.png" alt="" />
            <span class="text-silver">Alerts</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.tenant-chart {
  @media screen and (max-width: 450px) {
    display: flex;
    justify-content: center;
    canvas {
      height: 70% !important;
      width: 70% !important;
      position: absolute;
      top: 60px;
    }
  }
}
</style>
