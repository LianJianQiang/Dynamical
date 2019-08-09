export default {
    data() {
        return {
            curveId: ""
        };
    },

    watch: {
        dataSource() {
            this.formData = { ...this.dataSource }
        }
    },

    methods: {
        // 获取editTable生成的tcsdID
        onSaveCb(id) {
            // id 存在，表示对已打开对数据进行编辑，否则，为新增
            this.curveId = id;
        },

        tableDataChange(data) {
            this.tableData = data;

            // 数据编辑以后，将id清空，后续提示用户保存数据
            this.curveId = "";
        },

        // 保存数据
        save() {
            return new Promise((resolve, reject) => {
                // 调用editTable组件自动保存，生成tcsdID，并通过onSaveCb回调返回
                if (!this.curveId && this.tableData) {
                    this.$message({
                        message: "请先点击保存，保存数据"
                    });
                    resolve(false);
                } else {
                    this.onSaveData();
                    resolve(true);
                }
            });
        }
    }
}
