export default {
    data() {
        return {
            formData: { ...this.dataSource }
        };
    },

    methods: {
        // 保存数据
        save() {
            let datas = {
                ...this.formData
            };

            this.saveData({ datas });
        }
    }
}
