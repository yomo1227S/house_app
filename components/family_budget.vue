<template>
    <div>
        <!-- クリックでdelete_dataを発火させる　-->
        <button @click="delete_data">削除</button>
        <ul>
            <li v-for="(obj, index) in $store.state.main_data">
                <div>
                    -{{ obj.money_form }}円　 {{ obj.year }}年{{ obj.month }}月　{{ obj.selectedKey }} {{ obj.selectedItem }}
                    {{ obj.comment }}
                    <!-- 複数チェックボックスに必須のvalueの値にobjまたはindex番号を指定したいが、記述方法がわからない -->
                    <!-- やりたいことはvalueの値にulタグ内で回しているv-forで取得しているobj,index番号をinputタグのvalueに指定することで
                        チェックが入っているobj.indexをchecked_IDsに格納する。
                        その後、delete_dataを発火させ、mutationsの関数を呼び出してmain_data内を更新することで削除機能を実装したい-->

                    <!-- わからないこと
                        ・inputタグのvalueに任意の変数を記述する方法
                        ・mutataionでfliter関数を使用する際、chekedIDsとmain_dataの2つの連想配列をfilterすることで新しい配列を作成し、それをmain_dataに置き換えようとしているが、
                        inputタグのvalueに指定するのがobj自体かindex番号かどちらが最適がわからない -->

                    <!--解決　v-bindはHTML要素に使用すると属性を動的に設定できる。なので今回動的に変化するindexをvalueに適用させたいので使用する。 -->
                    <!-- チェックが入った要素をchecked_IDsにv-modelでバインド（保存）する -->
                    <input type="checkbox" v-model="checked_IDs" v-bind:value="index">

                </div>

            </li>
        </ul>

    </div>

</template>

<script>


export default {
    data() {
        return {
            // チェックされた（削除したい）要素のインデックスが入る変数
            checked_IDs: []
        }

    },
    methods: {
        // mutationsに定義してあるdelete_dataを発火させる関数。第二引数にチェックされた要素のindexを渡す
        delete_data() {
            this.$store.commit('delete_data', this.checked_IDs)
        },
    }
}
</script>