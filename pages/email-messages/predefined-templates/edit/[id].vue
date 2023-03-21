<script lang="ts" setup>
import '~~/services/email.service';
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();
const router = useRouter();

interface AddData {
  title: string;
  body: string;
  message: string;
}

const { $trpc } = useNuxtApp();
const type = ref<'email' | 'sms'>('email');
const successResponse = ref({ id: null });
const errorBody = ref(false);
const title = ref('');
const message = ref('');
const body = ref('');
const { id } = useRoute().params;
const entityId = parseInt(id as string);
const data: any = await $trpc[type.value].show.query(entityId);

if (type.value === 'sms') {
  title.value = data.title;
  body.value = data.message;
}

if (type.value === 'email') {
  title.value = data.subject;
  body.value = data.body;
}

const setField = (data: string) => {
  errorBody.value = false;
  body.value = data;
};

const checkvalidation = () => {
  if (!body.value && type.value === 'email') {
    errorBody.value = true;
    return false;
  }

  return true;
};

const saveEmail = (formData: AddData) => {
  const data = {
    subject: formData.title,
    body: body.value,
  };

  return $trpc.email.update.mutate({ id: entityId, data });
};

const saveSms = (formData: AddData) => {
  const data = {
    title: formData.title,
    message: message.value,
  };

  return $trpc.sms.update.mutate({ id: entityId, data });
};
const submitHandler = async (formData: any) => {
  if (checkvalidation()) {
    try {
      const response =
        type.value === 'email'
          ? await saveEmail(formData)
          : await saveSms(formData);
      if (response) {
        setMessage('Template created successfully', 'success');
        router.push('/email-messages/predefined-templates');
      } else {
        router.push('/email-messages/predefined-templates/add');
        setMessage('Something went wrong unable to create Email.', 'error');
      }
    } catch (error) {
      console.error(new Error('Whoops, something went wrong.'));
    }
  }
};
</script>

<template>
  <div>
    <FormKit
      type="form"
      id="sendTemplate"
      @submit="submitHandler"
      :actions="false"
    >
      <div class="flex flex-wrap justify-between items-center mb-0 md:mb-10">
        <div class="md:mb-0 mb-10">
          <h4 class="mb-4 text-stone">Predefined Templates</h4>
          <p class="text-silver">
            Communicator / Email/Messages / Predefined Templates /
            <span class="text-primary"> Add New Predefined Template</span>
          </p>
        </div>
      </div>
      <DashboardCard title="Add New Predefined Template">
        <div class="p-6">
          <div class="max-w-[50rem]">
            <div class="success alert-success" v-if="successResponse.id">
              Template Successfully Saved
            </div>
            <FormKit
              type="text"
              name="title"
              v-model="title"
              validation="required"
              placeholder="Title of the message"
              input-class="form-control"
              outer-class="mb-5"
            />

            <div mb-5 v-if="type === 'email'">
              <ClientOnly>
                <RichTextEditor
                  placeholder="abc"
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

            <div v-if="type === 'sms'" mb-5>
              <FormKit
                type="textarea"
                name="message"
                v-model="message"
                rows="10"
                placeholder="Message"
                validation="required"
                outer-class="w-full"
                input-class="form-control"
              />
            </div>
            <div class="flex justify-end">
              <FormKit
                type="submit"
                input-class="btn btn-primary md:w-auto w-full"
              >
                Save
              </FormKit>
            </div>
          </div>
        </div>
      </DashboardCard>
    </FormKit>
  </div>
</template>
