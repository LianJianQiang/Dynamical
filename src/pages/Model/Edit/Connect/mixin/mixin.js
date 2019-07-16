import DropDown from "components/DropDown.vue";

export default {
    components: {
        DropDown
    },
    props: {
        size: {
            type: String,
            default: ""
        },
        field: {
            type: String,
            required: true
        },
        dataSource: {
            type: Object,
            default: () => {
                return {};
            }
        },
        saveData: {
            type: Function,
            default: () => { }
        },
        placeholder: {
            type: String,
            default: "参数设置"
        }
    }
}
