<template>
  <div>
    <div class="mb-12">
      <h2 class="mb-4">Dashboard</h2>
      <p class="text-silver-chalice">
        Smart Suit / Communicator /
        <span class="text-primary">Dashboard</span>
      </p>
    </div>
    <div class="w-full flex gap-8 mb-8">
      <div class="card-communicator flex justify-between items-center">
        <div>
          <h1 class="text-primary mb-2">25</h1>
          <p>Short Messages</p>
        </div>
        <div>
          <img
            src="~/assets/images/Messages.png"
            class="h-10 border-4 border-indigo-600 mr-2 flex justify-center items-center"
          />
        </div>
      </div>

      <div class="card-communicator flex justify-between items-center">
        <div>
          <h1 class="text-primary mb-2">150</h1>
          <p>Email</p>
        </div>
        <div>
          <img
            src="~/assets/images/Recipients-and-Groups.png"
            class="h-10 border-4 border-indigo-600 mr-2 flex justify-center items-center"
          />
        </div>
      </div>
      <div class="card-communicator flex justify-between items-center">
        <div>
          <h1 class="text-primary mb-2">230</h1>
          <p>Alert</p>
        </div>
        <div>
          <img
            src="~/assets/images/Alerts.png"
            class="h-10 border-4 border-indigo-600 mr-2 flex justify-center items-center"
          />
        </div>
      </div>
      <div class="card-communicator flex justify-between items-center">
        <div>
          <h1 class="text-primary mb-2">2367</h1>
          <p>Library</p>
        </div>
        <div>
          <img
            src="~/assets/images/Library.png"
            class="h-10 border-4 border-indigo-600 mr-2 flex justify-center items-center"
          />
        </div>
      </div>
    </div>
    <div class="flex gap-8">
      <div>
        <div class="card card-message mb-8">
          <h2>Messages</h2>
          <div class="flex justify-between m-8 items-center">
            <div>
              <img src="~/assets/images/Library.png" />
            </div>
            <div>
              <p class="font-bold mb-2">
                150 <span class="font-normal">(48%)</span>
              </p>
              <p class="mb-4">Sent Messages</p>
              <p class="font-bold mb-2">
                150 <span class="font-normal">(48%)</span>
              </p>
              <p class="mb-4">Messages Received</p>
              <p class="font-bold mb-2">
                150 <span class="font-normal">(48%)</span>
              </p>
              <p>Opened Messages</p>
            </div>
          </div>
        </div>
        <div class="card card-group">
          <h2>Recent Recipients and Groups</h2>
          <table>
            <tr class="h-10">
              <th>Group Name</th>
              <th>Group Members</th>
              <th>Edit</th>
            </tr>
            <tr>
              <td>Covid 19 Updates</td>
              <td>145</td>
            </tr>
            <tr>
              <td>Covid 19 Updates</td>
              <td>145</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <div class="card card-email">
          <h2>Recent Emails</h2>
          <table>
            <tr class="h-10">
              <th>User Email</th>
              <th>Email Subject</th>
              <th>Email</th>
            </tr>
            <tr>
              <td>abc@gmail.com</td>
              <td>Request for API endpoint</td>
              <td>
                It depends largely on how much emphasis there is on visual
                design
              </td>
            </tr>
            <tr>
              <td>abc@gmail.com</td>
              <td>Request for API endpoint</td>
              <td>
                It depends largely on how much emphasis there is on visual
                design
              </td>
            </tr>
            <tr>
              <td>abc@gmail.com</td>
              <td>Request for API endpoint</td>
              <td>
                It depends largely on how much emphasis there is on visual
                design
              </td>
            </tr>
            <tr>
              <td>abc@gmail.com</td>
              <td>Request for API endpoint</td>
              <td>
                It depends largely on how much emphasis there is on visual
                design
              </td>
            </tr>
            <tr>
              <td>abc@gmail.com</td>
              <td>Request for API endpoint</td>
              <td>
                It depends largely on how much emphasis there is on visual
                design
              </td>
            </tr>
            <tr>
              <td>abc@gmail.com</td>
              <td>Request for API endpoint</td>
              <td>
                It depends largely on how much emphasis there is on visual
                design
              </td>
            </tr>
            <tr>
              <td>abc@gmail.com</td>
              <td>Request for API endpoint</td>
              <td>
                It depends largely on how much emphasis there is on visual
                design
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "default",
});
</script>

<style lang="scss">
table {
  margin-top: 20px;
  border: 1px solid black;
  tr {
    height: 60px;
    th {
      height: 60px;
    }
  }
}

.card {
  box-shadow: 0 6px 16px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: 250px;
  height: 280px;
  button {
    background-color: #b42424;
    color: #ffffff;
    padding: 12px 23px;
    border: none;
    border-radius: 4px;
    margin-top: 20px;
    cursor: pointer;
  }
}

.card-communicator {
  box-shadow: 0 6px 16px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: 250px;
  height: 98px;
  padding: 20px;
}

.card-message {
  width: 532px;
  height: 304px;
  padding: 20px;
}
.card-group {
  width: 100%;
  height: 304px;
  padding: 20px;
}

.card-email {
  width: 912px;
  height: 642px;
  padding: 20px;
}
</style>
