<template>
  <v-card>
    <v-tabs v-model="tab" align-tabs="center" color="secondary">
      <v-tab :value="1" color="green">V</v-tab>
      <v-tab :value="2" color="red">X</v-tab>
      <v-tab :value="3">תמונות לאישור</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item v-for="n in 3" :key="n" :value="n">
        <v-container fluid>
          <v-row>
            <v-col v-for="i in 6" :key="i" cols="12" md="4">
              <v-tooltip origin="overlap" location="center">
                <template v-slot:activator="{ props }">
                     <v-hover v-slot="{ isHovering, props }">
                    <v-card
                        class="mx-auto"
                        max-width="344"
                        v-bind="props"
                    >
                    <v-img
                      :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                      height="205"
                      cover
                    ></v-img>
                    <v-card-text>
          <h2  class="mx-auto" max-width="344">
            User123456
          </h2>
                    </v-card-text>
                        <v-overlay
                            :model-value="isHovering"
                            class="align-center justify-center"
                            scrim="#036358"
                            contained
                            >
                            <v-btn variant="flat" color="primary">דחייה</v-btn>
                            /t
                            <v-btn variant="flat" color="primary">אישור</v-btn>
                            </v-overlay>
                            </v-card>
                        </v-hover>
                  </template>
                   <span class="center">Verify</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-container>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      tab: 1,
          };
  },
  methods: {
    handleImageClick(i, n) {
      console.log(`Image ${i} in tab ${n} clicked`);
    },
  },
};
</script>

<style scoped>
.image-button {
  padding: 0;
  border: none;
  background: none;
  display: block;
  width: 100%;
  height: 205px;
  position: relative;
}


</style>
