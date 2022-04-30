<template>
  <div>
    <div class="card">
      <pv-toolbar class="mb-4">
        <template #start>
          <pv-button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew"/>
          <pv-button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected"
                     :disabled="!selectedTutorials || !selectedTutorials.length"/>
        </template>
        <template #end>
          <pv-button label="Export" icon="pi pi-download" class="p-button-help" @click="exportToCSV($event)"/>
        </template>
      </pv-toolbar>

      <pv-data-table
        ref="dt"
        :value="tutorials"
        v-model:selection="selectedTutorials"
        datakey="id"
        :paginator="true"
        :rows="10"
        :filters="filters"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        :rowsPerPageOptions="[5, 10, 15]"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} tutorials"
        responsiveLayout="scroll"
      >
        <template #header>
          <div class="table-header flex flex-column md:flex-row md:justify-content-between">
            <h5 class="mb-2 md:m-0 p-as-md-center text-xl">Manage Tutorials</h5>
            <span class="p-input-icon-left">
              <i class="pi pi-search"/>
              <pv-input-text v-model="filters['global'].value" placeholder="Search..."/>
            </span>
          </div>
        </template>

        <pv-column selectionMode="multiple" style="width: 3rem" :exportable="false"></pv-column>
        <pv-column field="id" header="id" :sortable="true" style="min-width: 12rem"></pv-column>
        <pv-column field="title" header="Title" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="description" header="Description" :sortable="true" style="min-width: 16rem"></pv-column>
        <pv-column field="status" header="Status" :sortable="true" style="min-width: 12rem">
          <template #body="slotProps">
            <pv-tag v-if="slotProps.data.status === 'Published'" severity="success">{{ slotProps.data.status}}</pv-tag>
            <pv-tag v-else severity="info">{{ slotProps.data.status}}</pv-tag>
          </template>
        </pv-column>
        <pv-column :exportable="falase" style="min-width: 8rem">
          <template #body="slotProps">
            <pv-button icon="pi pi-pencil" class="p-button-text p-button-rounded" @click="editTutorial(slotProps.data)"/>
            <pv-button icon="pi pi-trash" class="p-button-text p-button-rounded" @click="confirmDeleteTutorial(slotProps.data)"/>
          </template>
        </pv-column>

      </pv-data-table>

    </div>
  </div>
</template>

<script>
import { TutorialsApiService } from "../services/tutorials-api.service";
import { FilterMatchMode } from "primevue/api";

export default {
  name: "tutorial-list",
  data() {
    return {
      tutorials: [],
      tutorialDialog: false,
      deleteTutorialDialog: false,
      deleteTutorialsDialog: false,
      tutorial: {},
      selectedTutorials: null,
      filters: {},
      submitted: false,
      statuses: [
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],
      tutorialsService: null,
    };
  },
  created() {
    this.tutorialsService = new TutorialsApiService();
    this.tutorialsService.getAll().then((response) => {
      this.tutorials = response.data;
      this.tutorials.forEach(
        (tutorial) => this.getDisplayableTutorial(tutorial)
      );
      console.log("created");
    });
    this.initFilters();
  },
  methods: {
    getDisplayableTutorial(tutorial) {
      tutorial.status = tutorial.published
        ? this.statuses[0].label
        : this.statuses[1].label;
      return tutorial;
    },
    getStorableTutorial(displayableTutorial) {
      return {
        id: displayableTutorial.id,
        title: displayableTutorial.title,
        description: displayableTutorial.description,
        published: displayableTutorial.status.label === "Published",
      };
    },
    openNew() {
      this.tutorial = {};
      this.submitted = false;
      this.tutorialDialog = true;
    },
    hideDialog() {
      this.tutorialDialog = false;
      this.submitted = false;
    },
    findIndexById(id) {
      return this.tutorials.findIndex((tutorial) => tutorial.id === id);
    },
    saveTutorial() {
      this.submitted = true;
      if (this.tutorial.title.trim()) {
        if (this.tutorial.id) {
          this.tutorial = this.getStorableTutorial(this.tutorial);
          this.tutorialsService
            .update(this.tutorial.id, this.tutorial)
            .then((response) => {
              this.tutorials[this.findIndexById(response.data.id)] =
                this.getDisplayableTutorial(response.data);
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Tutorial Updated",
                life: 3000,
              });
              console.log(response);
            });
        } else {
          this.tutorial.id = 0;
          console.log(this.tutorial);
          this.tutorial = this.getStorableTutorial(this.tutorial);
          this.tutorialsService.create(this.tutorial).then((response) => {
            this.tutorial = this.getDisplayableTutorial(response.data);
            this.tutorials.push(this.tutorial);
            this.$toast.add({
              severity: "success",
              summary: "Successful",
              detail: "Tutorial Created",
              life: 3000,
            });
            console.log(response);
          });
        }
        this.tutorialDialog = false;
        this.tutorial = {};
      }
    },
    editTutorial(tutorial) {
      console.log(tutorial);
      this.tutorial = {...tutorial};
      console.log(this.tutorial);
      this.deleteTutorialDialog = true;
    },
    confirmDeleteTutorial(tutorial) {
      this.tutorial = tutorial;
      this.deleteTutorialDialog = true;
    },
    deleteTutorial() {
      this.tutorialsService.delete(this.tutorial.id).then((response) => {
        this.tutorials = this.tutorials.filter(
          (t) => t.id !== this.tutorial.id
        );
        this.deleteTutorialDialog = false;
        this.tutorial = {};
        this.$toast.add({
          severity: "success",
          summary: "Successful",
          detail: "Tutorial Deleted",
          life: 3000,
        });
        console.log(response);
      });
    },
    exportToCSV() {
      this.$refs.dt.exportCSV();
    },
    confirmDeleteSelected() {
      this.deleteTutorialsDialog = true;
    },
    deleteSelectedTutorials() {
      this.selectedTutorials.forEach((tutorial) => {
        this.tutorialsService.delete(tutorial.id).then((response) => {
          this.tutorials = this.tutorials.filter(
            (t) => t.id !== this.tutorial.id
          );
          console.log(response);
        });
      });
      this.deleteTutorialsDialog = false;
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      }
    }
  },
};
</script>

<style scoped></style>
