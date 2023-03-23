<template>
  <v-app id="inspire" v-if="response">
    <v-navigation-drawer v-model="drawer" app>
      <div>
        <center>
          <v-img
            width="220"
            height="220"
            v-if="user.img_face"
            :src="user.img_face"
          ></v-img>
          <v-img
            width="220"
            height="220"
            v-else
            src="https://cdn-icons-png.flaticon.com/512/5087/5087579.png"
          ></v-img>
          <h2 class="font-semibold text-2xl">
            {{ user.name }} {{ user.lname }}
          </h2>
          <span>{{ user.email }}</span>
        </center>
      </div>
      <v-divider></v-divider>

      <v-list nav dense class="mt-2">
        <v-list-item-group v-model="selectedItem" color="primary">
          <span class="ml-2 text-gray-500 mb-2 font-semibold">ระบบ</span>
          <div>
            <Core-NavLink
              name="แดชบอร์ด"
              icon="mdi-monitor-dashboard"
            ></Core-NavLink>
          </div>
          <span class="ml-2 text-gray-500 mb-2 font-semibold">CS</span>
          <div>
            <div @click="$router.push('/app/bid/')">
              <Core-NavLink
                name="ข้อมูลงาน"
                icon="mdi-clipboard-text-outline"
              ></Core-NavLink>
            </div>
            <div @click="$router.push('/app/customer')">
              <Core-NavLink
                name="ประวัติลูกค้า"
                icon="mdi-history"
              ></Core-NavLink>
            </div>
          </div>
          <span class="ml-2 text-gray-500 mb-2 font-semibold"
            >หัวหน้าพนักงาน</span
          >
          <div>
            <Core-NavLink
              name="ข้อมูลงาน"
              icon="mdi-clipboard-text-outline"
            ></Core-NavLink>
            <div @click="$router.push('/app/staff/info')">
              <Core-NavLink
                name="ข้อมูลพนักงาน"
                icon="mdi-account"
              ></Core-NavLink>
            </div>
            <Core-NavLink name="ลงตารางงาน" icon="mdi-table"></Core-NavLink>
            <Core-NavLink name="จัดการวันลา" icon="mdi-av-timer"></Core-NavLink>
          </div>
          <span class="ml-2 text-gray-500 mb-2 font-semibold">พนักงาน</span>
          <div>
            <Core-NavLink
              name="ข้อมูลงาน"
              icon="mdi-clipboard-text-outline"
            ></Core-NavLink>

            <Core-NavLink
              name="CheckIn CheckOut"
              icon="mdi-check-circle-outline"
            ></Core-NavLink>
            <Core-NavLink
              name="ติดต่อหัวหน้าพนักงาน"
              icon="mdi-chat-processing-outline"
            ></Core-NavLink>
          </div>
          <span class="ml-2 text-gray-500 mb-2 font-semibold"
            >จัดการข้อมูลระบบ</span
          >
          <div @click="$router.push('/action/work')">
            <Core-NavLink
              name="กลุ่มและขอบเขตบริการ"
              icon="mdi-account-group-outline"
            ></Core-NavLink>
          </div>
          <div @click="$router.push('/action/equip')">
            <Core-NavLink name="อุปกรณ์" icon="mdi-broom"></Core-NavLink>
          </div>
          <div @click="$router.push('/action/skill')">
            <Core-NavLink
              name="ความสามารถพนักงาน"
              icon="mdi-head-lightbulb-outline"
            ></Core-NavLink>
          </div>
          <div @click="$router.push('/action/car')">
            <Core-NavLink name="รถ" icon="mdi-car"></Core-NavLink>
          </div>
          <div @click="$router.push('/action/payment')">
            <Core-NavLink name="ธนาคาร" icon="mdi-bank"></Core-NavLink> `
          </div>
          <span class="ml-2 text-gray-500 mb-2 font-semibold">ผู้ใช้</span>
          <div>
            <Core-NavLink
              name="เปลี่ยนรหัสผ่าน"
              icon="mdi-lock-outline"
            ></Core-NavLink>
          </div>
          <div @click="logout()">
            <Core-NavLink name="ออกจากระบบ" icon="mdi-logout"></Core-NavLink>
          </div>
        </v-list-item-group>
      </v-list>
      <br />
    </v-navigation-drawer>

    <v-app-bar dark color="navbarx" app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Bookme</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {
      drawer: null,
      user: {},
      response: false,
      selectedItem: null,
    };
  },
  async created() {
    await this.run();
  },
  methods: {
    async run() {
      await this.$auth.checkUserLogin();
      try {
        this.user = this.$auth.user;
      } catch (e) {
        console.log(e);
      }
      this.response = true;
    },
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>
