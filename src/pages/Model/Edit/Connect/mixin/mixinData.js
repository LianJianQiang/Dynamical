export default {
    data() {
        return {
            formData: { ...this.dataSource }
        };
    },

    watch: {
        dataSource() {
            this.formData = { ...this.dataSource }
        }
    },
    methods: {
        // 保存数据
        save() {
            return new Promise((resolve) => {
                let datas = {
                    ...this.formData
                };

                this.saveData({ datas });
                resolve(true);
            })
        }
    }
}
