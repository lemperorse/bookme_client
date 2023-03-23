<template>
  <div class="p-6">
    <v-toolbar color="transparent" flat>
      <h2 class="font-semibold text-2xl">การจัดการข้อมูล</h2>
      <v-spacer></v-spacer>
      <v-btn @click="openDialogUser()" depressed color="primary" dark>
        <v-icon>mdi-plus</v-icon> เพิ่มข้อมูลผู้ใช้
      </v-btn>
      <v-btn
        class="ml-2"
        @click="openDialogStaff()"
        depressed
        text-color="white"
        color="info"
        dark
      >
        <v-icon>mdi-plus</v-icon> เพิ่มข้อมูลพนักงาน
      </v-btn>
    </v-toolbar>

    <v-data-table
      v-if="response"
      :search="search"
      :headers="headers"
      :items="items"
    >
      <template v-slot:top>
        <v-text-field
          outlined
          dense
          v-model="search"
          label="ค้นหา"
          class="mx-4 pt-2"
        ></v-text-field>
      </template>
      <template v-slot:item.img_face="{ item, index }">
        <img :src="item.img_face" alt="" style="width: 250px; height: 200px" />
      </template>
      <template v-slot:item.roles="{ item, index }">
        <v-chip class="ma-2" color="success">
          <v-icon left> mdi-label </v-icon>
          {{ item.roles_name }}
        </v-chip>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          class="mr-2"
          dense
          color="warning"
          @click="
            item.roles_name == 'พนักงาน'
              ? openUpdateDialogStaff()
              : openUpdateDialogUser()
          "
          >แก้ไข</v-btn
        >
        <v-btn @click="openResetDialog(item)" class="mr-2" dense color="info"
          >รีเซ็ตรหัสผ่าน</v-btn
        >
        <v-btn class="mr-2" dense color="error" @click="remove(item.id)"
          >ลบ</v-btn
        >
      </template>
    </v-data-table>
    <v-skeleton-loader v-if="!response" type="date-picker"></v-skeleton-loader>

    <v-dialog
      v-model="dialogUser"
      scrollable
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          เพิ่มข้อมูลผู้ใช้ <v-spacer></v-spacer>
          <v-btn text @click="run()" color="error">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="mt-2">
            <v-form ref="form">
              <v-text-field
                outlined
                dense
                type="text"
                label="ชื่อ *"
                v-model="form.name"
                :rules="[]"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                type="text"
                label="นามสกุล *"
                v-model="form.lname"
                :rules="[]"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                type="text"
                label="ชื่อผู้ใช้ *"
                v-model="form.username"
                :rules="[]"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                type="text"
                label="อีเมล"
                v-model="form.email"
                :rules="[]"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                type="text"
                label="รหัสผ่าน *"
                v-model="form.password"
                :rules="[]"
              ></v-text-field>
              <v-radio-group class="mt-0" v-model="form.role_id">
                <template v-slot:label>
                  <div>สิทธิผู้ใช้งาน *</div>
                </template>
                <v-radio
                  v-for="(data, n) in roles"
                  v-if="data.name != 'พนักงาน'"
                  :key="n"
                  :label="data.name"
                  :value="data.id"
                ></v-radio>
              </v-radio-group>
              <div class="flex">
                <v-spacer></v-spacer>
                <v-btn
                  @click="form.id ? update() : store()"
                  :color="form.id ? 'warning' : 'success'"
                  >บันทึกข้อมูล</v-btn
                >
              </div>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="dialogStaff"
      scrollable
      persistent
      max-width="500px"
      transition="dialog-transition"
    >
      <v-card>
        <v-card-title primary-title>
          เพิ่มข้อมูลพนักงาน <v-spacer></v-spacer>
          <v-btn text @click="run()" color="error">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="mt-2">
            <v-form ref="form">
              <v-text-field
                outlined
                dense
                type="text"
                label="ชื่อ *"
                v-model="form.name"
                :rules="[]"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                type="text"
                label="นามสกุล *"
                v-model="form.lname"
                :rules="[]"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                type="text"
                label="ชื่อผู้ใช้ *"
                v-model="form.username"
                :rules="[]"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                type="text"
                label="อีเมล"
                v-model="form.email"
                :rules="[]"
              ></v-text-field>
              <v-text-field
                outlined
                dense
                type="text"
                label="รหัสผ่าน *"
                v-model="form.password"
                :rules="[]"
              ></v-text-field>
              <v-radio-group class="mt-0" v-model="form.role_id">
                <template v-slot:label>
                  <div>สิทธิผู้ใช้งาน *</div>
                </template>
                <v-radio
                  v-for="(data, n) in roles"
                  v-if="data.name == 'พนักงาน'"
                  :key="n"
                  :label="data.name"
                  :value="data.id"
                ></v-radio>
              </v-radio-group>
              <v-file-input
                v-model="form.imgf"
                label="Upload รูปภาพหน้าตรง"
                outlined
                dense
              >
                <template v-slot:label>
                  <div>Upload รูปภาพหน้าตรง</div>
                </template></v-file-input
              >
              <v-file-input
                v-model="form.imgx"
                label="Upload รูปภาพบัตรประชาชน"
                outlined
                dense
              >
                <template v-slot:label>
                  <div>Upload รูปภาพบัตรประชาชน</div>
                </template></v-file-input
              >
              <p>ความสามารถ *</p>
              <v-checkbox
                class="mt-0 mb-0"
                v-model="form.ability_employee"
                v-for="(data, n) in skill"
                :key="n"
                :label="data.name"
                :value="data.name"
              >
                <template v-slot:label>
                  <div>
                    {{ data.name }}
                  </div>
                </template>
              </v-checkbox>
              <div class="flex">
                <v-spacer></v-spacer>
                <v-btn
                  @click="form.id ? update() : store()"
                  :color="form.id ? 'warning' : 'success'"
                  >บันทึกข้อมูล</v-btn
                >
              </div>
            </v-form>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import _ from "lodash";
import moment from "moment";
export default {
  data: () => {
    return {
      req: (v) => !!v || "ฟิลล์นี้ต้องระบุข้อมูล",
      items: [],
      headers: [
        {
          text: "No",
          value: "no",
        },
        {
          text: "รูปภาพ",
          value: "img_face",
        },
        {
          text: "ชื่อ",
          value: "name",
        },
        {
          text: "นามสกุล",
          value: "lname",
        },
        {
          text: "ชื่อผู้ใช้",
          value: "username",
        },
        {
          text: "สิทธิผู้ใช้งาน",
          value: "roles",
        },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
        },
      ],
      page: 1,
      maxPage: 3,
      search: "",
      form: {
        ability_employee: [],
      },

      lists: [],
      roles: [],
      skill: [],
      response: false,
      dialogUser: false,
      dialogStaff: false,
    };
  },
  async created() {
    await this.run();
  },
  methods: {
    async run() {
      console.log(this.form);
      this.response = false;
      this.lists = await this.$core.getHttp(`/api/staff`);
      this.items = _.map(this.lists, (items, index) => {
        items.no = index + 1;
        items.role;
        return items;
      });
      await this.closeDialog();
      this.response = true;
      console.log(this.items);
    },
    async openDialogUser() {
      this.form = {};
      (this.dialogUser = true),
        (this.roles = await this.$core.getHttp(`/api/roles`));
      this.skill = await this.$core.getHttp(`/api/skill`);
    },
    async openDialogStaff() {
      this.form = {};
      (this.form.role_id = 4),
        (this.form.ability_employee = []),
        (this.dialogStaff = true),
        (this.roles = await this.$core.getHttp(`/api/roles`));
      this.skill = await this.$core.getHttp(`/api/skill`);
    },
    async closeDialog() {
      this.form = {};
      this.dialogUser = false;
      this.dialogStaff = false;
    },
    async openUpdateDialogUser(item) {
      this.form = item;
      this.dialogUser = true;
    },
    async openUpdateDialogStaff(item) {
      this.form = item;
      this.dialogStaff = true;
    },
    async update() {
      this.dialogStaff = false;
      this.dialogUser = false;
      let check = await this.$web.confirm("คุณแน่ใจใช่ไหมที่จะแก้ไขข้อมูลนี้");
      if (check && this.$refs.form.validate()) {
        let data = await this.$core.putHttp(
          "/api/customer/" + this.form.id,
          this.form
        );
        if (data.id) {
          await this.$web.alertAuto("บันทึกข้อมูลสำเร็จ");
          await this.closeDialog();
          await this.run();
        } else {
          await this.$web.alertAuto("ลบข้อมูลไม่สำเร็จ", "1000", "error");
        }
      } else {
        this.dialog = true;
      }
    },
    async remove(item) {
      let check = await this.$web.confirm("คุณแน่ใจใช่ไหมที่จะลบข้อมูลนี้");
      if (check) {
        let data = await this.$core.deleteHttp("/api/customer/" + item.id);
        if (data) {
          await this.$web.alertAuto("ลบข้อมูลสำเร็จ");
        }
        await this.closeDialog();
        await this.run();
      }
    },

    async store() {
      if (this.$refs.form.validate()) {
        let data = await this.$core.postHttp(`/api/users`, this.form);
        if (data.id) {
          await this.$web.alertAuto(`บันทึกข้อมูลสำเร็จ`);
          await this.run();
        } else {
          this.dialog = false;
          await this.$web.alertAuto("บันทึกข้อมูลไม่สำเร็จ", 2000, "error");
          await this.run();
        }
      }
    },
  },
};
</script>
