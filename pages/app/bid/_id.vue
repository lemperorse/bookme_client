<template>
<div class="p-6">
    <v-toolbar color="transparent" flat>
        <h2 class="font-semibold text-2xl">{{ form.bid_no }}</h2>
        <v-spacer></v-spacer>
    </v-toolbar>
    <div>
        <v-stepper v-model="e1" v-if="response">
            <v-stepper-header>
                <v-stepper-step :complete="e1 > 1" step="1">
                    ข้อมูลการเสนอราคา
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 2" step="2">
                    ข้อมูลลูกค้า & การจ่ายเงิน
                </v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 3" step="3">การดำเนินงาน</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step :complete="e1 > 4"  step="4">การตรวจรับงาน</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-card >
                        <v-card-text>
                            <Bid-Step1 @reload="run" :bid="bid"></Bid-Step1>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer> 
                            <v-btn color="primary" @click="e1 = 2"> ถัดไป </v-btn> 
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-card >
                        <v-card-text>
                            <Bid-Step2Customer @reload="run" :bid="bid"></Bid-Step2Customer>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer> 
                            <v-btn text @click="e1 = 1"> ย้อนกลับ </v-btn> 
                            <v-btn color="primary" @click="e1 = 3"> ถัดไป </v-btn> 
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-card >
                        <v-card-text>
                           
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer> 
                            <v-btn text @click="e1 = 2"> ย้อนกลับ </v-btn> 
                            <v-btn color="primary" @click="e1 = 4"> ถัดไป </v-btn> 
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>
                <v-stepper-content step="4">
                    <v-card >
                        <v-card-text>
                            
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer> 
                            <v-btn text @click="e1 = 3"> ย้อนกลับ </v-btn> 
                            <!-- <v-btn color="primary" @click="e1 = 4"> ถัดไป </v-btn>  -->
                        </v-card-actions>
                    </v-card>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
        <v-skeleton-loader v-if="!response" type="card"></v-skeleton-loader>
    </div>
</div>
</template>

<script>
export default {
    data: () => {
        return {
            response: false,
            e1: 2, 
            env: {}, 
            bid: {},
            form:{},
        };
    },
    async created() {
        await this.run();
    },
    methods: {
        async getEnv() {
            this.env = await this.$core.getHttp("/api/bidenv");
            console.log(this.env);
            this.env.customers = _.map(this.env.customers, (item, index) => {
                item.label = `${item.contect_firstname} (${item.contect_lastname})`;
                return item;
            });
        },
        async defaultForm() {
            let bid = await this.$core.getHttp(`/api/bid/${this.$route.params.id}`);
            this.bid = bid;
            this.form = bid.bid;
        },
        async run() {
            this.response = false;
            await this.getEnv();
            await this.defaultForm();
            this.response = true;
            await this.getEnv();
        },
    },
};
</script>

<style>
</style>
