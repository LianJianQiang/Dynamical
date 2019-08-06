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
