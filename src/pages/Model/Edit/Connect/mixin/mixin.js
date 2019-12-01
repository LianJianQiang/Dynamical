import DropDown from "components/DropDown.vue";
import { CONNECT_ELE_FIELD_DICT } from 'common/constants';
export default {
    components: {
        DropDown
    },
    data () {
        return {
            isHaveData: false
        }
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
    },
    watch: {
        dataSource () {
            if (this.$attrs.eleKey && CONNECT_ELE_FIELD_DICT[this.$attrs.eleKey]) {
                const keyList = CONNECT_ELE_FIELD_DICT[this.$attrs.eleKey];

                for (let i = 0; i < keyList.length; i++) {
                    if (this.dataSource[keyList[i]] === 0 || this.dataSource[keyList[i]]) {
                        this.isHaveData = true;
                        break;
                    }
                }
            }

            this.formData = { ...this.dataSource }
        }
    }
}
