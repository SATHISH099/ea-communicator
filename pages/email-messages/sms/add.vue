<script lang="ts" setup>
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();
const router = useRouter();

interface SmsData {
  title: string;
  message: string;
}
interface RecipientData {
  id: number;
  firstName: string;
  lastName: string;
}

interface GroupData {
  id: number;
  groupName: string;
}
const smsService = useService('sms');
const importanceLevel = ref('low');
const successResponse = ref({ id: null });
const title = ref('');
const message = ref('');
const recipients = ref<RecipientData[] | []>([]);
const groups = ref<GroupData[] | []>([]);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

const resetForm = () => {
  message.value = '';
  title.value = '';
  importanceLevel.value = '';
  recipients.value = [];
  groups.value = [];
};

const submitHandler = async (formData: []) => {
  const data = {
    ...formData,
    sender: 'test',
    tenantId: 'test',
    isPredefined: false,
    recipients: recipients.value.map(({ id }) => ({
      recipientId: id,
    })),
    groups: groups.value.map(({ id }) => ({
      groupId: id,
    })),
  };
  try {
    const response = await smsService.sendSms(data);
    if (response) {
      setMessage('Sms created successfully.', 'success');
      resetForm();
      router.push('/email-messages/sms');
    } else {
      router.push('/email-messages/sms/add');
      setMessage('Something went wrong unable to create Sms.', 'error');
    }
  } catch (error) {
    console.error(new Error('Whoops, something went wrong.'));
  }
};

const useTemplate = (template: SmsData) => {
  title.value = template.title;
  message.value = template.message;
};

const setGroupRecipients = (
  recipientSelected: RecipientData[],
  groupSelected: GroupData[],
) => {
  recipients.value = recipientSelected;
  groups.value = groupSelected;
  showModal.value = false;
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
                    :options="{
                      low: 'Low',
                      medium: 'Medium',
                      high: 'High',
                    }"
                  />
                </div>
              </div>
            </div>
            <div grid md:grid-cols-2 grid-cols-1 gap-5 mt-8>
              <button
                class="col-span-2 border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
                title="Click Me"
                @click="toggleModal"
              >
                <div class="flex items-center">
                  <span class="mr-3">Recipient</span>
                  <div
                    class="flex flex-wrap items-center gap-2 overflow-x-auto"
                  >
                    <span
                      v-for="recipient in recipients"
                      :key="recipient.id"
                      class="p-[0.2rem] border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                    >
                      {{ recipient.firstName }} {{ recipient.lastName }}
                    </span>
                  </div>
                </div>

                <span v-for="group in groups" :key="group.id">
                  {{ group.groupName }}
                </span>
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
            <div flex flex-wrap justify-end items-center>
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
            <SelectRecipients
              :recipients="recipients"
              :groups="groups"
              @set-groups-recipients="setGroupRecipients"
            >
            </SelectRecipients>
          </div>
        </TheModal>
      </div>
    </FormKit>
  </div>
</template>

<style lang="scss"></style>
