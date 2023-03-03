<script lang="ts" setup>
import Multiselect from '@vueform/multiselect';
import type { Message } from '~~/services/message.service';

interface AlertData {
  title: string;
  message: string;
}

const messageService = useService('message');
const data = reactive({
  importanceLevel: 'low',
  title: '',
  message: '',
  isSms: false,
  isEmail: false,
  isVoice: false,
});

const communicationChannel = ref<string[]>([]);
const successResponse = ref({ id: null });
const channels: string[] = ['Sms', 'Email', 'Voice'];
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};
const activeTab = ref('emails');

const submitHandler = async () => {
  const formData = {
    ...data,
    isSms: communicationChannel.value.includes(channels[0]),
    isEmail: communicationChannel.value.includes(channels[1]),
    isVoice: communicationChannel.value.includes(channels[2]),
    isPredefined: false,
  };
  const response = await messageService.sendMessage(formData);
  successResponse.value = response;
};

const useTemplate = (template: AlertData) => {
  data.title = template.title;
  data.message = template.message;
};
</script>

<template>
  <div>
    <FormKit
      type="form"
      id="sendSms"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <div class="flex justify-between items-center mb-10">
        <div>
          <h4 class="mb-4 text-stone">Messages</h4>
          <p class="text-silver">
            Communicator / Email / Messages / Messages /
            <span class="text-primary">Create New Messages</span>
          </p>
        </div>
      </div>
      <div w-full>
        <div class="success alert-success" v-if="successResponse.id">
          Message Successfully Sent
        </div>
        <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
          <div bg-white small-shadow p-6 col-span-2>
            <div md:flex flex-wrap justify-between items-center>
              <h5 text-stone>Create New Message</h5>
              <div flex flex-wrap items-center gap-5>
                <h6 text-stone>Priority</h6>
                <div flex flex-wrap items-center gap-3>
                  <FormKit
                    name="importanceLevel"
                    v-model="data.importanceLevel"
                    type="radio"
                    validation="required"
                    outer-class="radio-fieldset"
                    input-class="form-check-input"
                    :options="['high', 'normal', 'low']"
                  />
                </div>
              </div>
            </div>
            <div grid md:grid-cols-2 grid-cols-1 gap-5 mt-8>
              <button
                class="border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[1rem] text-silver items-center p-[1rem] col-span-2"
                @click="toggleModal"
              >
                <span>TO</span>
                <img src="/plus.png" alt="plus" />
              </button>
              <FormKit
                type="text"
                v-model="data.title"
                name="title"
                validation="required"
                placeholder="Subject"
                input-class="form-control"
                outer-class="mb-5 col-span-2"
              />
            </div>

            <div class="w-full mb-7">
              <FormKit
                v-model="data.message"
                name="message"
                validation="required"
                type="textarea"
                rows="10"
                placeholder="Message"
                outer-class="w-full"
                input-class="form-control"
              />
            </div>
            <div flex flex-wrap items-center gap-5 mb-6>
              <h6 text-stone>Communication Channels</h6>
              <div flex items-center gap-6>
                <FormKit
                  name="communicationChannel"
                  type="checkbox"
                  v-model="communicationChannel"
                  :options="channels"
                  validation="required|min:1"
                  outer-class="radio-fieldset"
                  input-class="form-check-input"
                />
              </div>
            </div>
            <div class="flex items-center justify-end mt-5 md:w-auto w-full">
              <button class="btn btn-primary md:w-auto w-full">Send</button>
            </div>
          </div>
          <div bg-white small-shadow>
            <div px-6 pt-6>
              <h5 text-stone>Predefined Templates</h5>
              <div class="flex justify-start py-6">
                <div class="flex items-center gap-1 md:gap-0 flex-wrap">
                  <div
                    class="tab"
                    :class="{ active: activeTab === 'all' }"
                    @click="activeTab = 'all'"
                  >
                    All
                  </div>
                  <div
                    class="tab"
                    :class="{ active: activeTab === 'emails' }"
                    @click="activeTab = 'emails'"
                  >
                    Messages
                  </div>
                  <div
                    class="tab"
                    :class="{ active: activeTab === 'sms' }"
                    @click="activeTab = 'sms'"
                  >
                    Sms
                  </div>
                  <div
                    class="tab"
                    :class="{ active: activeTab === 'voice' }"
                    @click="activeTab = 'voice'"
                  >
                    Voice
                  </div>
                  <div
                    class="tab whitespace-nowrap"
                    :class="{ active: activeTab === 'notification' }"
                    @click="activeTab = 'notification'"
                  >
                    Push Notification
                  </div>
                </div>
              </div>
            </div>
            <PredefinedTemplates
              :type="activeTab"
              :use="useTemplate"
            ></PredefinedTemplates>
          </div>
        </div>
        <TheModal
          title="Select Recipient and Groups"
          :show="showModal"
          @close="toggleModal"
        >
          <div class="mt-10">
            <div flex items-center gap-3>
              <Multiselect
                :options="['test1', 'test2']"
                searchable="true"
                mode="tags"
                :create-option="true"
                :close-on-select="false"
                placeholder="Search"
              />
              <button class="form-control w-[3.5rem] cursor-pointer">
                <img src="/add-user.png" alt="" />
              </button>
            </div>
            <div flex justify-end mt-5>
              <button class="btn btn-primary">Add</button>
            </div>
          </div>
        </TheModal>
      </div>
    </FormKit>
  </div>
</template>

<style lang="scss"></style>
