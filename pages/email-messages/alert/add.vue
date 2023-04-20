<script lang="ts" setup>
import { useToasterStore } from '~~/store/toaster';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';
const { setMessage } = useToasterStore();
const { $trpc } = useNuxtApp();
const router = useRouter();

definePageMeta({
  middleware: 'permission',
});

interface AlertData {
  title: string;
  message: string;
}
interface RecipientData {
  id: number;
  name: string;
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
const channels: string[] = ['Sms', 'Email'];
const recipients = ref<RecipientData[] | []>([]);
const groups = ref<GroupData[] | []>([]);
const showModal = ref(false);
const errorRecipients = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};
const activeTab = ref<'email' | 'sms'>('email');

const checkvalidation = () => {
  let check = true;
  if (recipients.value.length < 1 && groups.value.length < 1) {
    errorRecipients.value = true;
    check = false;
  } else {
    errorRecipients.value = false;
  }
  return check;
};
const submitHandler = async () => {
  if (checkvalidation()) {
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
        setMessage('Message created successfully', 'success');
        router.push('/email-messages/alert');
      } else {
        router.push('/email-messages/alert/add');
        setMessage('Something went wrong unable to create Messages.', 'error');
      }
    } catch (error) {
      console.error(new Error('Whoops, something went wrong.'));
    }
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

const count = ref(0);
const countLimit = computed(() => {
  if (count.value < 160) {
    return count.value > 0 ? 1 : 0;
  }

  return Math.ceil(count.value / 160);
});

const messageCount = () => {
  count.value = data.message.length;
};

const removeFromRecipient = (id: number) => {
  recipients.value = recipients.value.filter(function (
    recipient: RecipientData,
  ) {
    return recipient.id !== id;
  });
};

const removeFromGroup = (id: number) => {
  groups.value = groups.value.filter(function (group: any) {
    return group.id !== id;
  });
};
</script>

<template>
  <div>
    <FormKit id="sendSms" type="form" :actions="false" @submit="submitHandler">
      <div class="flex justify-between items-center mb-10">
        <div>
          <h4 class="mb-4 text-stone">Messages</h4>
          <p class="text-silver">
            <NuxtLink to="/" class="text-silver sub-heading"
              >Communicator</NuxtLink
            >
            <span class="text-silver">/</span>
            <NuxtLink to="/email-messages" class="text-silver sub-heading">
              Communications</NuxtLink
            >
            <span class="text-silver">/</span>
            <NuxtLink
              to="/email-messages/alert"
              class="text-silver sub-heading"
            >
              Alerts</NuxtLink
            >
            <span class="text-silver">/</span>
            <span class="text-primary"> Create New Alert</span>
          </p>
        </div>
      </div>
      <div w-full>
        <div v-if="successResponse.id" class="success alert-success">
          Alert Successfully Sent
        </div>
        <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
          <div bg-white small-shadow p-6 col-span-2>
            <div md:flex flex-wrap justify-between items-center>
              <h5 text-stone>Create New Alert</h5>
              <div flex flex-wrap items-center gap-5>
                <h6 text-stone>Priority</h6>
                <div flex flex-wrap items-center gap-3>
                  <FormKit
                    v-model="importanceLevel"
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
              <div col-span-2 w-full>
                <button
                  type="button"
                  class="w-full relative border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex text-[1rem] text-silver items-center p-[1rem]"
                >
                  <span class="mr-3">TO</span>
                  <div
                    class="flex flex-wrap items-center gap-2 overflow-x-auto"
                  >
                    <span
                      v-for="recipient in recipients"
                      :key="recipient.id"
                      class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary flex"
                    >
                      {{ recipient.name }}
                      <button
                        class="border-none outline-none bg-transparent text-primary"
                        type="button"
                        @click="removeFromRecipient(recipient.id)"
                      >
                        <span
                          class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-white bg-primary rounded-full ml-3"
                          >x</span
                        >
                      </button>
                    </span>

                    <span
                      v-for="group in groups"
                      :key="group.id"
                      class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] mr-3 text-primary flex"
                    >
                      {{ group.groupName }}
                      <button
                        type="button"
                        class="border-none outline-none bg-transparent text-primary mr-2"
                        @click="removeFromGroup(group.id)"
                      >
                        <span
                          class="inline-flex items-center justify-center w-4 h-4 ml-2 text-xs font-semibold text-white bg-primary rounded-full ml-3"
                          >x</span
                        >
                      </button>
                    </span>
                  </div>
                  <img
                    class="absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    src="/plus.png"
                    alt="plus"
                    @click="toggleModal"
                  />
                </button>
                <p v-if="errorRecipients" class="text-primary mt-2">
                  Please Enter Recipient/Group
                </p>
              </div>
              <FormKit
                v-model="data.title"
                type="text"
                name="title"
                validation="required|length:3,100"
                placeholder="Subject*"
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
                placeholder="Message*"
                outer-class="w-full"
                input-class="form-control"
                @input="messageCount"
                @paste="messageCount"
              />
              <div class="mt-2">Alert Count: {{ count }}/{{ countLimit }}</div>
            </div>
            <div flex flex-wrap items-center gap-5 mb-6>
              <h6 text-stone>Communication Channels</h6>
              <div flex items-center gap-6>
                <FormKit
                  v-model="communicationChannel"
                  name="communicationChannel"
                  :validation-messages="{
                    required: 'Communication Channel is required.',
                  }"
                  type="checkbox"
                  :options="channels"
                  validation="required|min:1"
                  outer-class="radio-fieldset"
                  input-class="form-check-input"
                />
              </div>
            </div>
            <div class="flex items-center justify-end mt-5 md:w-auto w-full">
              <button
                class="btn btn-primary md:w-auto w-full"
                @click="checkvalidation"
              >
                Send
              </button>
            </div>
          </div>
          <div bg-white small-shadow>
            <div px-6 pt-6>
              <div class="flex justify-start py-6">
                <div class="flex items-center gap-1 md:gap-0 flex-wrap">
                  <div
                    v-for="(tabValue, key) in {
                      email: 'Email',
                      sms: 'SMS',
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
