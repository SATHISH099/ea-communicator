<script lang="ts" setup>
import { useToasterStore } from '~~/store/toaster';
const { setMessage } = useToasterStore();
const router = useRouter();

interface EditData {
  title: string;
}

definePageMeta({
  middleware: 'permission',
});

const { $trpc } = useNuxtApp();
const params = useRoute().params;
const emailId: number = parseInt(params.id as string);
const record = await $trpc.email.show.query(emailId);

const successResponse = ref({ id: null });
const errorBody = ref(false);
const title = ref(record.subject);
const body = ref(record.body);

const setField = (data: string) => {
  errorBody.value = false;
  body.value = data;
};

const checkvalidation = () => {
  if (!body.value) {
    errorBody.value = true;
    return false;
  }

  return true;
};

const submitHandler = async (formData: EditData) => {
  if (checkvalidation()) {
    const response = await $trpc.email.update.mutate({
      id: emailId,
      data: {
        subject: formData.title,
        body: body.value,
      },
    });
    try {
      if (response) {
        setMessage('Template Successfully Updated', 'success');
        router.push('/email-messages/predefined-templates');
      } else {
        setMessage(
          'Something went wrong unable to create update template.',
          'error',
        );
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
      id="updateTemplate"
      type="form"
      :actions="false"
      @submit="submitHandler"
    >
      <div class="flex flex-wrap justify-between items-center mb-0 md:mb-10">
        <div class="md:mb-0 mb-10">
          <h4 class="mb-4 text-stone">Predefined Templates</h4>
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
              to="/email-messages/predefined-templates"
              class="text-silver sub-heading"
            >
              Predefined Templates</NuxtLink
            >
            <span class="text-silver">/</span>

            <span class="text-primary"> Edit Predefined Template</span>
          </p>
        </div>
      </div>
      <DashboardCard title="Edit Predefined Template">
        <div class="p-6">
          <div class="max-w-[50rem]">
            <div class="success alert-success" v-if="successResponse.id">
              Template Successfully Updated
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
