<script lang="ts" setup>
import Multiselect from '@vueform/multiselect';
import type { Email } from '~~/services/email.service';
import '~~/services/media.service';
import '~~/services/email.service';
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();
const router = useRouter();

interface EmailData {
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

const mediaService = useService('media');

const emailService = useService('email');
const importanceLevel = ref('low');
const successResponse = ref({ id: null });
const errorBody = ref(false);
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

const resetForm = () => {
  body.value = '';
  subject.value = '';
  importanceLevel.value = '';
  recipients.value = [];
  groups.value = [];
  ccRecipients.value = [];
  ccGroups.value = [];
  bccRecipients.value = [];
  bccGroups.value = [];
};

const checkvalidation = () => {
  if (!body.value) {
    errorBody.value = true;
    return false;
  }

  return true;
};

const useTemplate = (template: EmailData) => {
  subject.value = template.title;
  body.value = template.message;
};
const handleAddMedia = async (data: { file: any[] }) => {
  const body = new FormData();

  if (data.file.length) {
    data.file.forEach((fileItem: { file: string | Blob }) => {
      body.append('media', fileItem.file);
    });

    const response = await mediaService.create(body);
    return [{ id: response.id }];
  } else {
    return [];
  }
};

const submitHandler = async (formData: { file: any[] }) => {
  if (checkvalidation()) {
    const media = await handleAddMedia(formData);
    const data = {
      ...formData,
      body: body.value,
      sender: 'test',
      isPredefined: false,
      medias: media,
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
    };

    try {
      const response = await emailService.sendEmail(data);
      if (response) {
        setMessage('Email created successfully.', 'success');
        resetForm();
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
                    :options="['low', 'medium', 'high']"
                  />
                </div>
              </div>
            </div>
            <div grid md:grid-cols-2 grid-cols-1 gap-5 mt-8>
              <button
                class="relative border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex text-[1rem] text-silver items-center p-[1rem] col-span-2"
                @click="toggleModal"
              >
                <span class="mr-3">TO</span>
                <div class="flex flex-wrap items-center gap-2 overflow-x-auto">
                  <span
                    class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] text-primary"
                    v-for="recipient in recipients"
                    :key="recipient.id"
                  >
                    {{ recipient.firstName }} {{ recipient.lastName }}
                  </span>

                  <span
                    class="border border-solid border-primary py-[6px] px-[16px] rounded-[24px] mr-3 text-primary"
                    v-for="group in groups"
                    :key="group.id"
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
                    {{ recipient.firstName }} {{ recipient.lastName }}
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
                    {{ recipient.firstName }} {{ recipient.lastName }}
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
                validation="required"
                placeholder="Subject"
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
              <span v-if="errorBody" class="error">Please Enter Body</span>
            </div>
            <div flex flex-wrap justify-between items-center>
              <FormKit
                type="file"
                name="file"
                accept=".csv,.png,.jpg,.jpeg,.svg,.xml"
                inner-class="file-uploader"
                prefix-icon="link"
                prefix-icon-class="mr-3"
                outer-class="md:min-w-[20em] min-w-full mb-5"
                multiple="true"
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
          <PredefinedTemplates
            type="emails"
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
            ></SelectRecipients>
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
    </FormKit>
  </div>
</template>

<style lang="scss"></style>
