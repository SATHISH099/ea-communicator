<script lang="ts" setup>
import '~~/services/email.service';

const { $trpc } = useNuxtApp();
const { type: entity, id } = useRoute().params;

if (!['email', 'sms'].includes(entity as string)) {
  navigateTo('/email-messages/predefined-templates');
}

const type = ref<'email' | 'sms'>(entity as 'email' | 'sms');
const title = ref('');
const body = ref('');
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
</script>

<template>
  <div>
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
          <span class="text-primary"> View Predefined Template</span>
        </p>
      </div>
    </div>
    <DashboardCard title="Add New Predefined Template">
      <div class="p-6">
        <div class="max-w-[50rem]">
          <div class="mb-10 grid gap-y-2">
            <h6 class="text-stone">
              {{ type === 'email' ? 'Subject' : 'Title' }}
            </h6>
            <p class="text-carbon">{{ title }}</p>
          </div>

          <div class="mb-10 grid gap-y-2">
            <h6 class="text-stone">
              {{ type === 'email' ? 'Body' : 'Message' }}
            </h6>
            <div v-html="body"></div>
          </div>
        </div>
      </div>
    </DashboardCard>
  </div>
</template>
