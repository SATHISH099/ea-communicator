<script lang="ts" setup>
import '~~/services/media.service';
import '~~/services/email.service';
import { useToasterStore } from '~~/store/toaster';
import { ImportanceLevel } from '~~/server/enums/importance-level.enum';
import type { Media } from '~~/types/common';

const { setMessage } = useToasterStore();
const router = useRouter();

definePageMeta({
  middleware: 'permission',
});

interface EmailData {
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

const { $trpc } = useNuxtApp();

const importanceLevel = ref<ImportanceLevel>(ImportanceLevel.LOW);
const errorBody = ref(false);
const errorRecipients = ref(false);
const subject = ref('');
const body = ref('');
const recipients = ref<RecipientData[] | []>([]);
const groups = ref<GroupData[] | []>([]);
const ccRecipients = ref<RecipientData[] | []>([]);
const ccGroups = ref<GroupData[] | []>([]);
const bccRecipients = ref<RecipientData[] | []>([]);
const bccGroups = ref<GroupData[] | []>([]);
const showModal = ref(false);
const showModalCc = ref(false);
const showModalBcc = ref(false);
const selectedAttachments = ref<Media[]>();

const toggleModal = () => {
  showModal.value = !showModal.value;
};

const toggleModalCc = () => {
  showModalCc.value = !showModalCc.value;
};

const toggleModalBcc = () => {
  showModalBcc.value = !showModalBcc.value;
};

const setField = (data: string) => {
  errorBody.value = false;
  body.value = data;
};

const checkvalidation = () => {
  let check = true;
  if (!body.value) {
    errorBody.value = true;
    check = false;
  } else {
    errorBody.value = false;
  }

  if (recipients.value.length < 1 && groups.value.length < 1) {
    errorRecipients.value = true;
    check = false;
  } else {
    errorRecipients.value = false;
  }
  return check;
};

const useTemplate = (template: EmailData) => {
  subject.value = template.title;
  body.value = template.message;
};

const submitHandler = async () => {
  if (checkvalidation()) {
    try {
      const response = await $trpc.email.create.mutate({
        subject: subject.value,
        body: body.value,
        importanceLevel: importanceLevel.value,
        medias: selectedAttachments.value?.map(({ id }) => ({ id })),
        recipients: {
          to: recipients.value.map(({ id }) => id),
          cc: ccRecipients.value.map(({ id }) => id),
          bcc: bccRecipients.value.map(({ id }) => id),
        },
        groups: {
          to: groups.value.map(({ id }) => id),
          cc: ccGroups.value.map(({ id }) => id),
          bcc: bccGroups.value.map(({ id }) => id),
        },
      });
      if (response) {
        setMessage('Email created successfully', 'success');
        router.push('/email-messages/email');
      } else {
        router.push('/email-messages/email/add');
        setMessage('Something went wrong unable to create Email.', 'error');
      }
    } catch (error) {
      console.error(new Error('Whoops, something went wrong.'));
    }
  }
};

const setGroupRecipients = (
  recipientSelected: RecipientData[],
  groupSelected: GroupData[],
) => {
  recipients.value = recipientSelected;
  groups.value = groupSelected;
  showModal.value = false;
};

const setBccGroupRecipients = (
  recipientSelected: RecipientData[],
  groupSelected: GroupData[],
) => {
  bccRecipients.value = recipientSelected;
  bccGroups.value = groupSelected;
  showModalBcc.value = false;
};

const setCcGroupRecipients = (
  recipientSelected: RecipientData[],
  groupSelected: GroupData[],
) => {
  ccRecipients.value = recipientSelected;
  ccGroups.value = groupSelected;
  showModalCc.value = false;
};

const onUploadSizeError = (message: string) => {
  console.log(message);
};
</script>

<template>
  <div>
    <FormKit
      id="sendEmail"
      v-slot="{ value }"
      type="form"
      :actions="false"
      @submit="submitHandler"
    >
      <div class="flex justify-between items-center mb-10">
        <div>
          <h4 class="mb-4 text-carbon">Email</h4>
          <p class="text-silver">
            <NuxtLink to="/" class="text-silver sub-heading"
              >Communicator</NuxtLink
            >
            <span class="text-silver">/</span>
            <NuxtLink to="/email-messages" class="text-silver sub-heading">
              Email/Messages</NuxtLink
            >
            <span class="text-silver">/</span>
            <NuxtLink
              to="/email-messages/email"
              class="text-silver sub-heading"
            >
              Email</NuxtLink
            >
            <span class="text-silver">/</span>
            <span class="text-primary"> Compose New Email</span>
          </p>
        </div>
      </div>
      <div w-full>
        <div grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5>
          <div bg-white small-shadow p-6 md:col-span-2 col-span-1>
            <div md:flex flex-wrap justify-between items-center>
              <h5 text-stone>Compose New Email</h5>
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
              <div class="col-span-2 w-full">
                <button
                  type="button"
                  class="w-full relative border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex text-[1rem] text-silver items-center p-[1rem]"
                  @click="toggleModal"
                >
                  <span class="mr-3">TO</span>
                  <div
                    class="flex flex-wrap items-center gap-2 overflow-x-auto"
                  >
                    <span
                      v-for="recipient in recipients"
                      :key="recipient.id"
                      class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                    >
                      {{ recipient.name }}
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
                <p v-if="errorRecipients" class="text-primary mt-2">
                  Please Enter Recipient/Group
                </p>
              </div>

              <button
                type="button"
                class="relative border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex text-[16px] text-silver items-center p-[1rem]"
                @click="toggleModalCc"
              >
                <span class="mr-3">CC</span>
                <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                  <span
                    v-for="recipient in ccRecipients"
                    :key="recipient.id"
                    class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                  >
                    {{ recipient.name }}
                  </span>

                  <span
                    v-for="group in ccGroups"
                    :key="group.id"
                    class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
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

              <button
                type="button"
                class="relative border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex text-[16px] text-silver items-center p-[1rem]"
                @click="toggleModalBcc"
              >
                <span class="mr-3">BCC</span>
                <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                  <span
                    v-for="recipient in bccRecipients"
                    :key="recipient.id"
                    class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                  >
                    {{ recipient.name }}
                  </span>

                  <span
                    v-for="group in bccGroups"
                    :key="group.id"
                    class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
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
                v-model="subject"
                name="subject"
                type="text"
                validation="required|length:3,100"
                placeholder="Subject*"
                input-class="form-control"
                outer-class="mb-5 md:col-span-2 col-span-1"
              />
            </div>
            <div mb-5>
              <ClientOnly>
                <RichTextEditor
                  v-model="body"
                  :content-value="body"
                  @update:contentValue="
                    (newValue) => {
                      setField(newValue);
                    }
                  "
                />
              </ClientOnly>
              <p v-if="errorBody" class="text-primary mt-2">
                Please Enter Body
              </p>
            </div>
            <div flex flex-wrap justify-between items-center pb-2>
              <MediaModalInput
                v-model="selectedAttachments"
                @error="onUploadSizeError"
              />
              <div class="flex items-center mt-5 md:w-auto w-full">
                <FormKit
                  type="submit"
                  input-class="btn btn-primary md:w-auto w-full"
                  @click="checkvalidation"
                >
                  Send Email
                </FormKit>
              </div>
            </div>
          </div>
          <PredefinedTemplates
            type="email"
            :use="useTemplate"
          ></PredefinedTemplates>
        </div>
      </div>
    </FormKit>
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

    <TheModal
      title="Select Recipient and Groups"
      :show="showModalCc"
      @close="toggleModalCc"
    >
      <div class="mt-10">
        <SelectRecipients
          :recipients="ccRecipients"
          :groups="ccGroups"
          @set-groups-recipients="setCcGroupRecipients"
        >
        </SelectRecipients>
      </div>
    </TheModal>

    <TheModal
      title="Select Recipient and Groups"
      :show="showModalBcc"
      @close="toggleModalBcc"
    >
      <div class="mt-10">
        <SelectRecipients
          :recipients="bccRecipients"
          :groups="bccGroups"
          @set-groups-recipients="setBccGroupRecipients"
        ></SelectRecipients>
      </div>
    </TheModal>
  </div>
</template>

<style lang="scss">
.formkit-file-remove {
  background-color: #b42424;
  border: none;
  padding: 2px;
  cursor: pointer;
  border-radius: 4px;
  color: white;
  margin-left: 20px;
}
</style>
