<script lang="ts" setup>
import Multiselect from '@vueform/multiselect';
import type { Sms } from '~~/services/sms.service';

interface SmsData {
  title: string;
  message: string;
}
const smsService = useService('sms');
const importanceLevel = ref('low');
const successResponse = ref({ id: null });
const title = ref('');
const message = ref('');
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

const resetForm = () => {
  message.value = '';
  title.value = '';
  importanceLevel.value = '';
};

const submitHandler = async (formData: []) => {
  const data = {
    ...formData,
    sender: 'test',
    tenantId: 'test',
    isPredefined: false,
  };
  const response = await smsService.sendSms(data);
  successResponse.value = response;
  resetForm();
};

const useTemplate = (template: SmsData) => {
  title.value = template.title;
  message.value = template.message;
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
          <h4 class="mb-4 text-stone">SMS</h4>
          <p class="text-silver">
            Communicator / Email / Messages / SMS /
            <span class="text-primary">Create New SMS</span>
          </p>
        </div>
      </div>
      <div w-full>
        <div class="success alert-success" v-if="successResponse.id">
          SMS Successfully Sent
        </div>
        <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
          <div bg-white small-shadow p-6 col-span-2>
            <div md:flex flex-wrap justify-between items-center>
              <h5 text-stone>Create New SMS</h5>
              <div flex flex-wrap items-center gap-5>
                <h6 text-stone>Priority</h6>
                <div flex flex-wrap items-center gap-3>
                  <FormKit
                    name="importanceLevel"
                    v-model="importanceLevel"
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
                class="col-span-2 border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
                @click="toggleModal"
              >
                <span>Recepient</span>
                <img src="/plus.png" alt="plus" />
              </button>

              <FormKit
                type="text"
                name="title"
                placeholder="Title of the Message"
                validation="required"
                v-model="title"
                input-class="form-control"
                outer-class="mb-5 col-span-2"
              />
            </div>
            <div class="w-full mb-5">
              <FormKit
                type="textarea"
                name="message"
                validation="required"
                v-model="message"
                rows="10"
                placeholder="Message"
                outer-class="w-full"
                input-class="form-control"
              />
            </div>
            <div flex flex-wrap justify-between items-center>
              <div class="flex items-center mt-5 md:w-auto w-full">
                <FormKit
                  type="submit"
                  input-class="btn btn-primary md:w-auto w-full"
                >
                  Send SMS
                </FormKit>
              </div>
            </div>
          </div>
          <PredefinedTemplates
            type="sms"
            :use="useTemplate"
          ></PredefinedTemplates>
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
