<template lang="pug">
.flex.gap-5
  .flex.flex-col(class="w-1/6")
    .flex.flex-col.py-4.font-bold
      button(@click="downloadContacts()") Download Contacts
    .flex.flex-col.py-4.font-bold
      strong Tags
      Multiselect(
        v-model="filters.tag",
        :options="tags",
        :close-on-select="false",
        placeholder="Select tags",
        multiple,
      )

    .flex.flex-col.py-4.font-bold
      strong Date
      select.mt-2.rounded-lg.p-5.bg-white(v-model="selectedDateRange")
        option(value="lastMonth") Last Month
        option(value="last2Weeks") Last 2 Weeks
        option(value="lastWeek") Last Week
        option(value="custom") Custom
        option(value="allcontacts") All Contacts
        div(v-if="selectedDateRange === 'custom'")
          //VueDatePicker(v-model="filters.startDate" :max-date="new Date()" enable-time-picker="false")
          //VueDatePicker(v-model="filters.endDate" :max-date="new Date()")
  .rounded-lg.p-8.bg-zinc-400.w-full.shadow-inner.flex.flex-col.gap-5
    .flex.gap-5.items-center
      input.grow.p-4.border-0.rounded-md.shadow-lg(class="w-7/8" type='text' placeholder='Search...' v-model='searchQuery')
      button.bg-theme-primary.text-white.rounded-md.text-md.p-4(@click='fetchContacts') Search
    table.w-full.flex.flex-col.gap-2(v-if="searchResults.length")
      thead
        tr.grid.grid-cols-5.bg-white.rounded-lg.py-2
          th Name
          th Email
          th Phone
          th Company
          th Actions
      tbody.flex.flex-col.gap-2
        tr.grid.grid-cols-5.bg-white.rounded-lg.py-4(v-for='contact in searchResults' :key='contact.id')
          p.text-center.align-center  {{ (contact.firstName && contact.lastName) ? (contact.firstName + ' ' + contact.lastName) : (contact.firstName || contact.lastName || '') }}
          p.text-center.align-center  {{ contact.emailAddress ? contact.emailAddress : '' }}
          p.text-center.align-center {{ contact.mainPhone ? contact.mainPhone : (contact.directPhone ? contact.directPhone : (contact.mobilePhone ? contact.mobilePhone : 'N/A')) }}
          p.text-center.align-center {{ contact.company ? contact.company : '' }}
          .flex.gap-5.justify-center
            img.cursor-pointer.w-6.h-6(src='~/assets/edit-icon.png' alt='Edit Contact' @click="editContact(contact)")
            img.cursor-pointer.w-6.h-6(src='~/assets/remove.png' alt='Remove' @click="confirmAction(contact, 'delete')")
    .flex.flex-col.gap-2.items-center.mt-10.select-none
      .flex.gap-3.justify-center.mt-10
        button.cursor-pointer.bg-zinc-100.p-2.rounded-md(class="disabled:bg-gray-300" @click="prevPage()" :disabled="currentPage === 0") Prev
        span.bg-zinc-100.p-2.rounded-md Page {{currentPage + 1}} of {{totalPages}}
        button.cursor-pointer.bg-zinc-100.p-2.rounded-md(class="disabled:bg-gray-300" @click="nextPage()" :disabled="currentPage + 1 === totalPages") Next
      span.h-min.w-min.whitespace-nowrap Contacts {{currentPage*pageSize+1}}-{{count < pageSize ? searchResults.length : (currentPage+1)*pageSize > count ? count : (currentPage+1)*pageSize}} of {{ count }}
</template>

<script lang='ts' setup>
import type { User } from '@/types.d';
import Multiselect from 'vue-multiselect';
//import VueDatePicker from '@vuepic/vue-datepicker';

const selectedDateRange = ref('allcontacts');
const searchQuery = ref('');

const filters = ref({
  startDate: new Date(0),
  endDate: new Date(),
  tag: []
});

const router = useRouter();
const user = useCookie<User>('cvuser');
const id_info = computed(() => user.value?.id);
const id = id_info.value as number;

const isViewer = computed(() => user.value?.permission == "VIEWER");
const isEditor = computed(() => user.value?.permission == "EDITOR");
const isAdmin = computed(() => user.value?.permission == "ADMIN");
const searchResults = ref([]);
const cursors = ref([0]);
const cursor = ref(0);
const count = ref(0);
const currentPage = ref(0);
const pageSize = ref(10);
const totalPages = computed(() => {
  return searchResults.value ? Math.ceil(count.value / pageSize.value) : 0;
});

const confirmAction = async (contact: any, action: string) => {
  let confirmMessage;

  confirmMessage = `Are you sure you want to remove ${contact.firstName} ${contact.lastName}?`;

  const confirmActionDialog = confirm(confirmMessage);

  if (confirmActionDialog) {

    const response = await $fetch(`/api/contactStatusChanger?contactId=${contact.id}&action=${action}`, {
      method: 'PUT',
    });
    window.location.reload();
  }

};


const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
  }
};

// Function to navigate to the next page
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value += 1;
  }
};

watch(currentPage, () => {
  fetchContacts(); // Re-fetch contacts whenever page or filters change
}, { deep: true });


// Have a watcher (watch selected date) for the selectedDateRange
// Watcher executes function when event changes (replace the const function of onDateRangeChange)
watch(selectedDateRange, (value: string) => {
  const now = new Date();
  filters.value.endDate = new Date(now);
  console.log("enddate: ", filters.value.endDate);
  switch (value) {
    case 'lastWeek':
      now.setMinutes(now.getMinutes() - 1);
      filters.value.startDate = new Date(now);
      break;
    case 'last2Weeks':
      now.setMinutes(now.getMinutes() - 2);
      filters.value.startDate = new Date(now);
      break;
    case 'lastMonth':
      now.setMinutes(now.getMinutes() - 30);
      filters.value.startDate = new Date(now);
      break;
    case 'allcontacts':
      filters.value.startDate = new Date(0);
      break;
  }
  console.log("startdate: ", filters.value.startDate);
});

watch(filters, () => {
  console.log("inside watch");
  currentPage.value = 0;
  cursors.value = [0];
  fetchContacts();
}, { deep: true });

// Ensure that date and tag filters are managed cohesively
// fetchContacts(); // Called when watcher executes; Watcher essentially replaces filterContactbyDates and onTagsChange

const constructQueryParams = () => {
  console.log("construct");
  const tagsQueryParam = Array.isArray(filters.value.tag) ? filters.value.tag.join(',') : filters.value.tag;

  const params = new URLSearchParams({
    startDate: filters.value.startDate.toISOString(),
    endDate: filters.value.endDate.toISOString(),
    searchQuery: searchQuery.value,
    tag: tagsQueryParam,
    cursor: cursors.value[currentPage.value] + '',
    pageSize: pageSize.value + ''
  });
  console.log("startdate with isostring", filters.value.startDate);
  console.log("enddate with iostring", filters.value.endDate);
  console.log(params.entries());
  return params.toString();
};

// Function to fetch contacts
const fetchContacts = async () => {
  console.log("fetch");
  const queryParams = constructQueryParams();
  try {
    const response = await fetch(`/api/contacts?${queryParams}`);
    const { data, count: c } = await response.json();
    searchResults.value = data;
    count.value = c;
    cursor.value = data[data.length - 1]?.id || 0;
    if (!cursors.value.includes(cursor.value))
      cursors.value.push(cursor.value);
  } catch (error) {
    console.error("Error fetching contacts:", error);
  }
};
// NOTE FOR TAZ: this should ideally be computed coming off a useFetch 
onMounted(() => fetchContacts());
const downloadContacts = async () => {
  const queryParams = constructQueryParams();
  // Using the `query` in the fetch URL
  const response = await fetch(`/api/contacts?${queryParams}`, {
    method: 'GET',
  });

  if (!response.ok) {
    console.error('Failed to fetch contacts');
    return;
  }

  const contacts = await response.json();
  const headers = Object.keys(contacts[0]);

  const reduced = contacts.reduce(
    (acc: string, curr: any) => {
      const newValues = headers.map(h => {
        if (h == "tag") {
          return `"${curr[h].map(({ name }: { name: string; }) => name).join(",")}"`;
        }
        else
          return curr[h];
      }).join(",") + "\n";
      return acc + newValues;
    }, ""
  );

  /*
for every tag in tags (tag array), lastName, 
firstName, middleName, prefix, suffix, company, professionalTitle, 
address1, city1, state1, zipCode1, address1Type, 
address2, city2, state2, zipCode2, address2Type, 
mainPhone, directPhone, mobilePhone, narrative */


  const hMap: Record<string, string> = {
    id: "ID",
    tag: "Tags",
    lastName: "Last Name",
    firstName: "First Name",
    middleName: "Middle Name/Initial",
    prefix: "Prefix",
    suffix: "Suffix",
    company: "Organization",
    professionalTitle: "Title",
    address1: "Address 1",
    city1: "City 1",
    state1: "State 1",
    zipCode1: "Zipcode 1",
    address1Type: "Address 1 Type",
    address2: "Address 2",
    city2: "City 2",
    state2: "State 2",
    zipCode2: "Zipcode 2",
    address2Type: "Address 2 Type",
    emailAddress: "Email",
    mainPhone: "Main Phone",
    directPhone: "Direct Phone",
    mobilePhone: "Mobile Phone",
    narrative: "Notes",
  };

  const prettyHeaders = headers.map((h: string) => hMap[h]).join(",") + "\n";

  // Trigger the download of the CSV file
  const encodedUri = URL.createObjectURL(
    new Blob([prettyHeaders + reduced], {
      type: "text/csv"
    })
  );
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "contacts.csv");

  link.click(); // This will download the file
  document.body.removeChild(link); // Clean up
};

const { data: tags } = await useFetch('/api/tag', {
  method: 'GET',
});

const editContact = (contact: any) => {
  router.push({ path: `/editContact/`, query: { id: contact.id } });
};
</script>

<style scoped></style>
