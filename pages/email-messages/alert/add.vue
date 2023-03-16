<script lang="ts" setup>
import { useToasterStore } from '~~/store/toaster';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';
const { setMessage } = useToasterStore();
const { $trpc } = useNuxtApp();
const router = useRouter();

interface AlertData {
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

interface initialStateData {
  importanceLevel: string;
  title: string;
  message: string;
  isSms: boolean;
  isEmail: boolean;
  isVoice: boolean;
}

const importanceLevel = ref<ImportanceLevel>(ImportanceLevel.LOW);
const initialState: initialStateData = {
  importanceLevel: ImportanceLevel.LOW,
  title: '',
  message: '',
  isSms: false,
  isEmail: false,
  isVoice: false,
};

const data = reactive({ ...initialState });
const communicationChannel = ref<string[]>([]);
const successResponse = ref({ id: null });
const channels: string[] = ['Sms', 'Email', 'Voice'];
const recipients = ref<RecipientData[] | []>([]);
const groups = ref<GroupData[] | []>([]);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};
const activeTab = ref('emails');

function resetForm() {
  Object.assign(data, initialState);
  recipients.value = [];
  groups.value = [];
}
const submitHandler = async () => {
  try {
    const response = await $trpc.message.create.mutate({
      title: data.title,
      message: data.message,
      importanceLevel: importanceLevel.value,
      isSms: communicationChannel.value.includes(channels[0]),
      isEmail: communicationChannel.value.includes(channels[1]),
      isVoice: communicationChannel.value.includes(channels[2]),
      isPredefined: false,
      recipients: recipients.value.map(({ id }) => id),
      groups: groups.value.map(({ id }) => id),
    });
    if (response) {
      setMessage('Message created successfully.', 'success');
      resetForm();
      router.push('/email-messages/alert');
    } else {
      router.push('/email-messages/alert/add');
      setMessage('Something went wrong unable to create Messages.', 'error');
    }
  } catch (error) {
    console.error(new Error('Whoops, something went wrong.'));
  }
};

const useTemplate = (template: AlertData) => {
  data.title = template.title;
  data.message = template.message;
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
    <FormKit id="sendSms" type="form" :actions="false" @submit="submitHandler">
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
        <div v-if="successResponse.id" class="success alert-success">
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
                    v-model="data.importanceLevel"
                    name="importanceLevel"
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
                class="relative border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex text-[1rem] text-silver items-center p-[1rem] col-span-2"
                type="button"
                @click="toggleModal"
              >
                <span class="mr-3">TO</span>
                <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                  <span
                    v-for="recipient in recipients"
                    :key="recipient.id"
                    class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                  >
                    {{ recipient.firstName }} {{ recipient.lastName }}
                  </span>

                  <span
                    v-for="group in groups"
                    :key="group.id"
                    class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] mr-3 text-primary"
                  >
                    {{ group.groupName }}
                  </span>
                </div>
                <img
                  class="absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  src="/plus.png"
                  alt="plus"
                />
              </button>
              <FormKit
                v-model="data.title"
                type="text"
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
                  v-model="communicationChannel"
                  name="communicationChannel"
                  type="checkbox"
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
              <div class="flex justify-start py-6">
                <div class="flex items-center gap-1 md:gap-0 flex-wrap">
                  <div
                    v-for="(tabValue, key) in {
                      all: 'All',
                      email: 'Email',
                      sms: 'SMS',
                      voice: 'Voice',
                      notification: 'Push Notification',
                    }"
                    :key="key"
                    class="tab"
                    :class="{ active: activeTab === key }"
                    @click="activeTab = key"
                  >
                    {{ tabValue }}
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
            <SelectRecipients
              :recipients="recipients"
              :groups="groups"
              @set-groups-recipients="setGroupRecipients"
            ></SelectRecipients>
          </div>
        </TheModal>
      </div>
    </FormKit>
  </div>
</template>

<style lang="scss"></style>
