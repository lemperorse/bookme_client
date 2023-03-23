<template>
<div class="p-6">
    <v-toolbar color="transparent" flat dense>
        <h2 class="font-semibold text-2xl">{{title}}</h2>
        <v-spacer></v-spacer>
        <v-btn @click="dialog=true" depressed small color="success" dark>
            <v-icon size="18">mdi-plus</v-icon> เพิ่มข้อมูลรถ
        </v-btn>
    </v-toolbar>
    <v-text-field class="mt-4" dense outlined v-model="search" label="ค้นหา"></v-text-field>
    <v-data-table v-if="response" :headers="headers" :items="items" :search="search">
        <template v-slot:item.created_at="{ item, index }">
            <div class="p-2">
                <h2 class="font-normal"> <b>สร้าง: </b> {{item.created_at}}</h2>
                <h2 class="font-normal" v-if="item.created_at != item.updated_at"> <b>แก้ไข: </b> {{item.updated_at}}</h2>
            </div>
        </template>
        <template v-slot:item.action="{ item, index }">
            <div>
                <v-btn @click="openUpdate(item)" depressed small color="orange" dark>
                    <v-icon size="18">mdi-pencil</v-icon> แก้ไข
                </v-btn>
                <v-btn @click="remove(item)" depressed small color="error">
                    <v-icon size="18">mdi-delete</v-icon> ลบ
                </v-btn>
            </div>
        </template>
    </v-data-table>
    <v-skeleton-loader v-if="!response"  type="table"></v-skeleton-loader>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
            <v-card-title primary-title>
                {{ (form.id)?'แก้ไข':'เพิ่ม' }} ข้อมูลรถ <v-spacer></v-spacer>
                <v-btn icon @click="run()">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-card-title>
            <v-card-text>
                <v-form ref="iform">
                    <v-text-field outlined dense label="ชื่อรถ" :rules="[$v.req,]" v-model="form.name"></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="(form.id)?update():store()" depressed color="success">
                    <v-icon>mdi-floppy</v-icon> บันทึกข้อมูล
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    data: () => {
        return ({
            title: 'ข้อมูลรถ',
            items: [],
            search: '',
            headers: [{
                    text: 'No',
                    value: 'no'
                },
                {
                    text: 'ข้อมูลรถ',
                    value: 'name'
                },
                {
                    text: 'วันที่สร้าง/แก้ไข',
                    value: 'created_at'
                },
                {
                    text: 'จัดการ',
                    value: 'action'
                },
            ],
            dialog: false,
            form: {},
            response:false,
        })
    },
    async created() {
        await this.run()
    },
    methods: {
        async run() {
            this.response = false;
            this.dialog = false;
            this.items = await this.$core.getHttp(`/api/car`);
            this.items.forEach((item, index) => {
                item.no = index + 1
                item.created_at = this.$kit.cd(item.created_at)
                item.updated_at = this.$kit.cd(item.updated_at)
            });
            this.response = true;
        },
        async store() {
            if (this.$refs.iform.validate()) {
                let res = await this.$core.postHttp(`/api/car`, this.form)
                if (res.id) {
                    await this.$web.alert('บันทึกข้อมูลสำเร็จ')
                    await this.run()
                } else {
                    await this.$web.alert('บันทึกข้อมูลไม่สำเร็จ', 'error', 'กรุณาตรวจสอบข้อมูล และลองใหม่อีกครั้ง')
                }
            }
        },
        async openUpdate(item) {
            this.form = item
            this.dialog = true
        },
        async update() {
            if (this.$refs.iform.validate()) {
                let res = await this.$core.putHttp(`/api/car/${this.form.id}`, this.form)
                if (res.id) {
                    await this.$web.alert('แก้ไขข้อมูลสำเร็จ')
                    await this.run()
                } else {
                    await this.$web.alert('แก้ไขข้อมูลไม่สำเร็จ', 'error', 'กรุณาตรวจสอบข้อมูล และลองใหม่อีกครั้ง')
                }
            }
        },
        async remove(item) {
            let check = await this.$web.confirm('ยืนยันการลบข้อมูล')
            if (check) {
                let res = await this.$core.deleteHttp(`/api/car/${item.id}`)
                if (res.success) {
                    await this.$web.alert('ลบข้อมูลสำเร็จ')
                    await this.run()
                } else {
                    await this.$web.alert('ลบข้อมูลไม่สำเร็จ', 'error', 'กรุณาลองใหม่อีกครั้ง')
                }
            }
        }
    },

}
</script>

<style>

</style>
