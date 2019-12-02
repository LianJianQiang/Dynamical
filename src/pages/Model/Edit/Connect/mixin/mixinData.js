export default {
    data () {
        return {
            formData: { ...this.dataSource },
            isHaveData: false
        };
    },

    mounted () {
        this.cacheFormData = { ...this.dataSource };
    },

    watch: {
        dataSource () {
            this.formData = { ...this.dataSource };
            this.cacheFormData = { ...this.dataSource };
        }
    },
    methods: {
        // 保存数据
        save () {
            return new Promise((resolve) => {
                let datas = {
                    ...this.formData
                };

                let params = {};
                for (let i in datas) {
                    if (datas[i] === 0 || datas[i]) {
                        params[i] = datas[i];
                    }
                }

                this.isHaveData = true;
                this.saveData({ datas: params });
                resolve(true);
            })
        },

        resetData () {
            this.formData = { ...this.cacheFormData }
        }
    }
}
