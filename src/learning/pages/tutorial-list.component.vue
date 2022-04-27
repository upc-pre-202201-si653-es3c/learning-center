<template>
  <div></div>
</template>

<script>
import { TutorialsApiService } from "../services/tutorials-api.service";

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
        { label: "Published", value: true },
        { label: "Unpublished", value: false },
      ],
      tutorialsService: null,
    };
  },
  created() {
    this.tutorialsService = new TutorialsApiService();
    this.tutorialsService.getAll().then((response) => {
      this.tutorials = response.data;
      this.tutorials.forEach(
        (tutorial) =>
          (tutorial.published = tutorial.published
            ? "Published"
            : "Unpublished")
      );
      console.log("created");
    });
    // TODO: Init Filters
  },
  methods: {
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
          this.tutorial.published = this.tutorial.published.value
            ? this.tutorial.published.value
            : this.tutorial.published;
          this.tutorialsService
            .update(this.tutorial.id, this.tutorial)
            .then((response) => {
              this.tutorials[this.findIndexById(this.tutorial.id)] =
                this.tutorial;
              this.$toast.add({
                severity: "success",
                summary: "Successful",
                detail: "Tutorial Updated",
                life: 3000,
              });
              console.log(response);
            });
        }
      }
    },
  },
};
</script>

<style scoped></style>
