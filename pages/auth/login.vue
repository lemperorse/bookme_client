<template>
<div class="w-full container mx-auto px-4  h-full flex flex-col justify-center items-center  llbg justify-center item-center">
    <center>
        <!-- <img class="w-60" src="@/assets/images/007-jobs.png" alt="" /> -->
        <h2 class="font-semibold text-2xl mt-4">Book Me</h2>
        <span class="font-semibold">ยินดีต้อนรับ ระบบการจัดการ Book Me </span>
    </center>
    <div class="p-4" :class="($vuetify.breakpoint.width > 700 )?`w-6/12`:` w-full`">
        <v-card outlined>
            <v-card-text>
                <v-form ref="vform">
                    <v-text-field v-model="form.username" :rules="[$v.req]" outlined label="ชื่อผู้ใช้"></v-text-field>
                    <v-text-field v-model="form.password" :rules="[$v.req]" type="password" outlined label="รหัสผ่าน"></v-text-field>
                    <v-toolbar color="transparent" flat>
                        <v-btn text small color="primary" @click="onDialogFogot">ลืมรหัสผ่าน</v-btn>
                        <App-ForgotPassword v-if="this.openDialog == true" :dialog="true" @backward="offDialogFogot"></App-ForgotPassword>

                        <v-spacer></v-spacer>
                        <v-btn @click="login" color="primary">เข้าสู่ระบบ</v-btn>
                    </v-toolbar>
                </v-form>
            </v-card-text>
        </v-card><br />
        <v-divider></v-divider><br />  

    </div>
</div>
</template>

  
  
<script>
export default {
    layout: "auth",
    data: () => ({
        form: {},
        openDialog: false,
    }),
    methods: {
        offDialogFogot() {
            this.openDialog = false;
        },
        async onDialogFogot() {
            this.openDialog = true;
        },
        async login() {
            let vform = this.$refs.vform;
            if (vform.validate()) {
                await this.$auth.login(this.form);
            }
        },
        async aacat() {
            let dd = this.$_.map(this.$categories, 'name')
            dd.forEach(async (r) => {
                let cat = await this.$core.postHttp(`/api/job/category/`, {
                    name: r
                })
                if (cat.id) {
                    let aa = await this.$core.postHttp(`/api/job/sub-category/`, {
                        name: r,
                        "category": cat.id
                    })
                }
            })
        }
    },
};
</script>
  
  
<style>
.llbg {
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.com/svgjs' width='800' height='1000' preserveAspectRatio='none' viewBox='0 0 800 1000'%3e%3cg mask='url(%26quot%3b%23SvgjsMask10087%26quot%3b)' fill='none'%3e%3ccircle r='127.65830958555057' cx='621.24' cy='427.2' fill='rgba(231%2c 54%2c 53%2c 0.38)'%3e%3c/circle%3e%3ccircle r='114.01461420861659' cx='326.45' cy='694.68' stroke='rgba(172%2c 179%2c 255%2c 0.47)' stroke-width='2.98' stroke-dasharray='4%2c 4'%3e%3c/circle%3e%3crect width='269.64' height='269.64' clip-path='url(%26quot%3b%23SvgjsClipPath10088%26quot%3b)' x='81.38' y='701.15' fill='url(%23SvgjsPattern10089)' transform='rotate(287.41%2c 216.2%2c 835.97)'%3e%3c/rect%3e%3cpath d='M305.29 81.08L294.81 73.71 299.71 61.88 289.23 54.51 294.13 42.67 283.65 35.3 288.55 23.47M312.97 78.85L302.5 71.48 307.39 59.65 296.92 52.28 301.81 40.44 291.34 33.07 296.23 21.23M320.65 76.62L310.18 69.25 315.07 57.41 304.6 50.04 309.49 38.21 299.02 30.84 303.91 19' stroke='rgba(170%2c 174%2c 224%2c 1)' stroke-width='1.57' stroke-dasharray='4%2c 4'%3e%3c/path%3e%3cpath d='M745.16 428.66L746.75 415.95 759.5 414.72 761.09 402.01 773.84 400.78 775.43 388.07 788.18 386.84M750.74 434.4L752.33 421.69 765.08 420.46 766.67 407.75 779.42 406.51 781.01 393.81 793.76 392.57M756.31 440.13L757.91 427.43 770.65 426.19 772.25 413.48 784.99 412.25 786.59 399.54 799.33 398.31' stroke='rgba(255%2c 255%2c 255%2c 1)' stroke-width='2.65'%3e%3c/path%3e%3crect width='84' height='84' clip-path='url(%26quot%3b%23SvgjsClipPath10090%26quot%3b)' x='527.29' y='676.07' fill='url(%23SvgjsPattern10091)' transform='rotate(327.13%2c 569.29%2c 718.07)'%3e%3c/rect%3e%3c/g%3e%3cdefs%3e%3cmask id='SvgjsMask10087'%3e%3crect width='800' height='1000' fill='white'%3e%3c/rect%3e%3c/mask%3e%3cpattern x='0' y='0' width='269.64' height='6.42' patternUnits='userSpaceOnUse' id='SvgjsPattern10089'%3e%3crect width='269.64' height='3.21' x='0' y='0' fill='rgba(170%2c 174%2c 224%2c 1)'%3e%3c/rect%3e%3crect width='269.64' height='3.21' x='0' y='3.21' fill='rgba(0%2c 0%2c 0%2c 0)'%3e%3c/rect%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath10088'%3e%3ccircle r='67.41' cx='216.2' cy='835.97'%3e%3c/circle%3e%3c/clipPath%3e%3cpattern x='0' y='0' width='6' height='6' patternUnits='userSpaceOnUse' id='SvgjsPattern10091'%3e%3cpath d='M0 6L3 0L6 6' stroke='rgba(211%2c 183%2c 20%2c 0.42)' fill='none'%3e%3c/path%3e%3c/pattern%3e%3cclipPath id='SvgjsClipPath10090'%3e%3ccircle r='21' cx='569.29' cy='718.07'%3e%3c/circle%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e");
}
</style>
