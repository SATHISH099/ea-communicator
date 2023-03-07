<script lang="ts" setup>
import Multiselect from '@vueform/multiselect';
import type { Email } from '~~/services/email.service';

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

const submitHandler = async (formData: []) => {
  if (checkvalidation()) {
    const data = {
      ...formData,
      body: body.value,
      sender: 'test',
      isPredefined: false,
      recipients: recipients.value.map(({ id }) => ({
        recipientId: id,
      })),
      groups: groups.value.map(({ id }) => ({
        groupId: id,
      })),
      cc_recipients: ccRecipients.value.map(({ id }) => ({
        recipientId: id,
      })),
      cc_groups: ccGroups.value.map(({ id }) => ({
        groupId: id,
      })),
      bcc_recipients: bccRecipients.value.map(({ id }) => ({
        recipientId: id,
      })),
      bcc_groups: bccGroups.value.map(({ id }) => ({
        groupId: id,
      })),
    };
    const response = await emailService.sendEmail(data);

    successResponse.value = response;
    resetForm();
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
                <span v-for="recipient in recipients" :key="recipient.id">
                  {{ recipient.firstName }} {{ recipient.lastName }}
                </span>

                <span v-for="group in groups" :key="group.id">
                  {{ group.groupName }}
                </span>

                <img src="/plus.png" alt="plus" />
              </button>
              <button
                class="border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
                @click="toggleModalCc"
              >
                <span>CC</span>
                <span v-for="recipient in ccRecipients" :key="recipient.id">
                  {{ recipient.firstName }} {{ recipient.lastName }}
                </span>

                <span v-for="group in ccGroups" :key="group.id">
                  {{ group.groupName }}
                </span>

                <img src="/plus.png" alt="plus" />
              </button>
              <button
                class="border border-solid border-[#dce1eb] outline-none bg-white rounded-[4px] cursor-pointer flex justify-between text-[16px] text-silver items-center p-[1rem]"
                @click="toggleModalBcc"
              >
                <span>BCC</span>
                <span v-for="recipient in bccRecipients" :key="recipient.id">
                  {{ recipient.firstName }} {{ recipient.lastName }}
                </span>

                <span v-for="group in bccGroups" :key="group.id">
                  {{ group.groupName }}
                </span>
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
            ></SelectRecipients>
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
