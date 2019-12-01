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

                this.isHaveData = true;
                this.saveData({ datas });
                resolve(true);
            })
        },

        resetData () {
            this.formData = { ...this.cacheFormData }
        }
    }
}
