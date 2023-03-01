<script lang="ts" setup>
import Multiselect from '@vueform/multiselect';
import type { Email } from '~~/services/email.service';

const emailService = useService('email');
const importanceLevel = ref('low');
const successResponse = ref({ id: null });
const errorBody = ref(false);
const subject = ref('');
const body = ref('');
const MessageHeaders = ['Title', 'Message'];
const MessageRows = [
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
  {
    title: 'Keyword',
    message: 'This is a test message ',
  },
];
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

const setField = (data: string) => {
  errorBody.value = false;
  body.value = data;
};

const resetForm = () => {
  body.value = '';
  subject.value = '';
  importanceLevel.value = '';
};

const checkvalidation = () => {
  if (!body.value) {
    errorBody.value = true;
    return false;
  }

  return true;
};

const submitHandler = async (formData: []) => {
  if (checkvalidation()) {
    const data = {
      ...formData,
      body: body.value,
      sender: 'test',
      isPredefined: false,
    };
    const response = await emailService.sendEmail(data);

    successResponse.value = response;
    resetForm();
  }
};
</script>

<template>
  <div>
    <FormKit
      type="form"
      id="sendEmail"
      @submit="submitHandler"
      :actions="false"
      #default="{ value }"
    >
      <div class="flex justify-between items-center mb-10">
        <div>
          <h4 class="mb-4 text-carbon">Email</h4>
          <p class="text-silver">
            Communicator / Email /
            <span class="text-primary">Compose New Email</span>
          </p>
        </div>
      </div>
      <div w-full>
        <div class="success alert-success" v-if="successResponse.id">
          Email Successfully Sent
        </div>
        <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
          <div bg-white small-shadow p-6 md:col-span-2 col-span-1>
            <div md:flex flex-wrap justify-between items-center>
              <h5 text-stone>Compose New Email</h5>
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
                    :options="['low', 'medium', 'high']"
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
              <button
                class="border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
                @click="toggleModal"
              >
                <span>CC</span>
                <img src="/plus.png" alt="plus" />
              </button>
              <button
                class="border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
                @click="toggleModal"
              >
                <span>BCC</span>
                <img src="/plus.png" alt="plus" />
              </button>
              <FormKit
                name="subject"
                type="text"
                validation="required"
                v-model="subject"
                placeholder="Subject"
                input-class="form-control"
                outer-class="mb-5 md:col-span-2 col-span-1"
              />
            </div>
            <div mb-5>
              <ClientOnly>
                <RichTextEditor
                  v-model="body"
                  :contentValue="body"
                  @update:contentValue="
                    (newValue) => {
                      setField(newValue);
                    }
                  "
                />
              </ClientOnly>
              <span class="error" v-if="errorBody">Please Enter Body</span>
            </div>
            <div flex flex-wrap justify-between items-center>
              <FormKit
                type="file"
                accept=".pdf,.doc,.docx,.xml,.md,.csv"
                multiple="true"
                inner-class="file-uploader"
                prefix-icon="link"
                prefix-icon-class="mr-3"
                outer-class="md:min-w-[20em] min-w-full"
              />
              <div class="flex items-center mt-5 md:w-auto w-full">
                <FormKit
                  type="submit"
                  input-class="btn btn-primary md:w-auto w-full"
                >
                  Send Email
                </FormKit>
              </div>
            </div>
          </div>

          <div bg-white small-shadow>
            <div px-6 pt-6>
              <h5 text-stone mb-5>Predefined Templates</h5>
              <FormKit
                prefix-icon="search"
                type="search"
                placeholder="Search"
                input-class="form-control pl-[3.5rem]"
                prefix-icon-class="search-icon"
              />
            </div>
            <DashboardTable
              mt-3
              mb-8
              :headers="MessageHeaders"
              :rows="MessageRows"
            />
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
