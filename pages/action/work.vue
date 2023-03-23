<template>
  <div class="p-6">
    <v-toolbar color="transparent" flat>
      <h2 class="font-semibold text-2xl">การจัดการกลุ่มและขอบเขตบริการ</h2>
      <v-spacer></v-spacer> 
  </v-toolbar> 
    <v-tabs>
      <v-tab>
        กลุ่มขอบเขตบริการ
      </v-tab>
      <v-tab-item>
          <div>
            <Action-WorkGroup></Action-WorkGroup>
          </div>
      </v-tab-item>
      <v-tab>
        รายการขอบเขตบริการ
      </v-tab>
      <v-tab-item>
        <div>
            <Action-Work></Action-Work>
          </div>
      </v-tab-item>
    </v-tabs>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>
