export default {
    data() {
        return {
            formData: { ...this.dataSource }
        };
    },

    methods: {
        // 保存数据
        save() {
            let data = {
                ...this.formData
            };

            if (!this.field) return;
            this.saveData({ data, field: this.field });
        }
    }
}
