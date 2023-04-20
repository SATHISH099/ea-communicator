<script lang="ts" setup>
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();
const router = useRouter();

const { $trpc } = useNuxtApp();

definePageMeta({
  middleware: 'permission',
});

interface SmsData {
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

const importanceLevel = ref<ImportanceLevel>(ImportanceLevel.LOW);
const successResponse = ref({ id: null });
const title = ref('');
const message = ref('');
const errorRecipients = ref(false);
const recipients = ref<RecipientData[] | []>([]);
const groups = ref<GroupData[] | []>([]);
const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value;
};

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
      const response = await $trpc.sms.create.mutate({
        title: title.value,
        message: message.value,
        importanceLevel: importanceLevel.value,
        recipients: recipients.value.map(({ id }) => id),
        groups: groups.value.map(({ id }) => id),
      });
      if (response) {
        setMessage('Sms created successfully', 'success');
        router.push('/email-messages/sms');
      } else {
        router.push('/email-messages/sms/add');
        setMessage('Something went wrong unable to create Sms.', 'error');
      }
    } catch (error) {
      console.error(new Error('Whoops, something went wrong.'));
    }
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

const count = ref(0);
const countLimit = computed(() => {
  if (count.value < 160) {
    return count.value > 0 ? 1 : 0;
  }

  return Math.ceil(count.value / 160);
});

const messageCount = () => {
  count.value = message.value.length;
};
</script>

<template>
  <div>
    <FormKit
      id="sendSms"
      v-slot="{ value }"
      type="form"
      :actions="false"
      @submit="submitHandler"
    >
      <div class="flex justify-between items-center mb-10">
        <div>
          <h4 class="mb-4 text-stone">SMS</h4>
          <p class="text-silver">
            <NuxtLink to="/" class="text-silver sub-heading"
              >Communicator</NuxtLink
            >
            <span class="text-silver">/</span>
            <NuxtLink to="/email-messages" class="text-silver sub-heading">
              Email/Messages</NuxtLink
            >
            <span class="text-silver">/</span>
            <span class="text-primary"> Create New SMS</span>
          </p>
        </div>
      </div>
      <div w-full>
        <div v-if="successResponse.id" class="success alert-success">
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
              <div w-full col-span-2>
                <button
                  type="button"
                  class="w-full border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
                  title="Click Me"
                  @click="toggleModal"
                >
                  <div class="flex items-center">
                    <span class="mr-3">TO</span>
                    <div
                      class="flex flex-wrap items-center gap-2 overflow-x-auto"
                    >
                      <span
                        v-for="recipient in recipients"
                        :key="recipient.id"
                        class="p-[0.2rem] border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                      >
                        {{ recipient.name }}
                      </span>
                    </div>
                  </div>

                  <span v-for="group in groups" :key="group.id">
                    {{ group.groupName }}
                  </span>
                  <img src="/plus.png" alt="plus" />
                </button>
                <p v-if="errorRecipients" class="text-primary mt-2">
                  Please Enter Recipient/Group
                </p>
              </div>
              <FormKit
                v-model="title"
                type="text"
                name="title"
                placeholder="Title of the Message*"
                validation="required|length:3,100"
                input-class="form-control"
                outer-class="mb-5 col-span-2"
              />
            </div>
            <div class="w-full mb-5">
              <FormKit
                v-model="message"
                type="textarea"
                name="message"
                validation="required"
                rows="10"
                placeholder="Message*"
                outer-class="w-full"
                input-class="form-control"
                @input="messageCount"
                @paste="messageCount"
              />
              <div class="mt-2">SMS Count: {{ count }}/{{ countLimit }}</div>
            </div>
            <div flex flex-wrap justify-end items-center>
              <div class="flex items-center mt-5 md:w-auto w-full">
                <FormKit
                  type="submit"
                  input-class="btn btn-primary md:w-auto w-full"
                  @click="checkvalidation"
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
