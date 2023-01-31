<template>
    <div class="input_main">
        <!-- 収入を入力するタグ -->
        <div class="income_form">
            <!-- 収入を入力するinputタグ patternで自然数しか入力できないようにしている-->
            <input v-model="income_form" type="text" pattern="^[1-9][0-9]*$" placeholder="収入">円
            <!-- クリックでadd_incomeが発火する -->
            <button v-on:click="add_income">保存</button>

        </div>


        <div class="category">
            <!--selectタグでドロップタウンを作り、selectedKeyとバインドする-->
            <select v-model="input_info.selectedKey" v-on:change="tst" placeholder="大カテゴリ">
                <option v-for="(value, key) in items">
                    {{ key }}
                </option>
            </select>
            <!--選択した大項目をkeyに取る小項目を選択肢として作成する。-->
            <select v-model="input_info.selectedItem">
                <!-- キーを変数とする場合は角カッコで変数を閉じる　-->
                <option v-for="item in items[input_info.selectedKey]" placeholder="小カテゴリ">
                    {{ item.name }}
                </option>
            </select>
        </div>

        <!-- 各項目を入力するタグ -->
        <div class="money_form">
            <input v-model="input_info.money_form" type="text" pattern="^[1-9][0-9]*$" placeholder="金額">円
        </div>

        <div class="comment">
            <input v-model="input_info.comment" type="text" placeholder="コメント">
        </div>

        <div class="button">
            <button v-on:click="add_info">保存</button>
        </div>

        <!-- 各項目を表示させるタグ -->
        <div class="graph">
            <div>
                <p>収入</p>
                {{ total_income }}
            </div>
            <div>
                <p>支出</p>
                {{ expense }}
            </div>

            <p>収支</p>
            <!-- v-bindでclassを使うことで、{}内の条件がtrueの時にそのクラスに割り当てる事ができる。 -->
            <div v-bind:class="{ red_color: isred }">
                {{ balance }}
            </div>
        </div>
    </div>


</template>

<script>


export default {
    data() {
        return {
            test: "田中",
            input_info: { selectedKey: "", selectedItem: "", money_form: "", comment: "", times: "", year: "", month: "" },
            //各データを保存する為の空の変数
            income_form: "",
            total_income: 0,
            today_year: [],
            today_month: [],
            //trueの時にCSSを適応させてたいので、初期値はfalse
            isred: false,

            //ドロップタウンに適用させるデータ
            items: {
                "食費": [
                    { name: "食費" },
                    { name: "食料品" },
                    { name: "外食" },
                    { name: "その他食費" },
                ],
                "日用品": [
                    { name: "日用品" },
                    { name: "子育て用品" },
                    { name: "ドラックストア" },
                    { name: "お小遣い" },
                    { name: "ペット用品" },
                ],
                "趣味・娯楽": [
                    { name: "映画・音楽・ゲーム" },
                    { name: "本" },
                    { name: "旅行" },
                    { name: "アウトドア" },
                    { name: "その他" },
                ],
                "健康・医療": [
                    { name: "フィットネス" },
                    { name: "ボディケア" },
                    { name: "薬" },
                    { name: "その他衣料品" },
                    { name: "" },
                ],
            }
        }
    },
    //----------------------------------------------------------
    //自分に影響のない挙動では動かない
    computed: {
        test_computed() {
            console.log("computed");
            return this.test + '君';
        },
        // main_dataから当年月のものをフィルターして、filに保存する。破壊せずに連想配列を扱うreduceで全て足してtotalに保存する。
        expense() {
            //storeの値を呼び出すので、$store.state~と記述する。
            let fil = this.$store.state.main_data.filter(x => x.year == this.today_year && x.month == this.today_month)
            const total = fil.reduce((sum, i) => sum + Number(i.money_form), 0)
            return total
        },
        //収入(total_income)　- 支出(expense)をして０以下だったらisredをtrueにする。
        balance() {
            let total = this.total_income - this.expense
            if (total < 0) {
                this.isred = true
            }
            return total
        },


    },
    //----------------------------------------------------------
    methods: {
        test_method() {
            console.log("method");
            return this.test + '様';
        },


        tst() {
            this.input_info.selectedItem = this.items[this.input_info.selectedKey]
        },
        add_info() {
            //インプットボックスのいずれか(||)が空白だったらその後の処理を行わない
            //今回はコメントは自由にしたいので、コメントは空欄でも処理するようにする
            if (this.input_info.selectedKey === "" || this.input_info.selectedItem === "" || this.input_info.money_form === "" || !Number(this.input_info.money_form))
                return
            //timseの中に現在の時間を入れる
            this.input_info.year = new Date().getFullYear();
            this.input_info.month = new Date().getMonth() + 1;
            //input_infoに入力された情報を空欄のdataにunshift(配列の最初に追加）する
            this.main_data.unshift(this.input_info)

            //重要　$store.commitの第一引数にmutationsで定義した関数を指定する。
            //第二引数には受け渡したい値を指定する
            this.$store.commit('save_data', this.input_info)

            //input_infoを初期化する
            this.input_info = { selectedKey: "", selectedItem: "", money_form: "", comment: "", times: "" }
        },
        add_income() {
            // 空白あるいは、数字以外の場合は処理をせず、数字の場合のみ合計にプラスする
            if (this.income_form === "" || !Number(this.income_form)) {
                return
            }
            // ↓数字の場合のみの処理↓
            this.total_income += Number(this.income_form)
        }
    },
    //----------------------------------------------------------
    //moutedはライフサイクル的にページを表示する前に取得されるので、moutedでnew Dateすることで開いた瞬間の年と月を変数に保存することが出来る。
    mounted() {
        this.today_year = new Date().getFullYear();
        this.today_month = new Date().getMonth() + 1;
    }
}

</script>

<style>
.red_color {
    color: red;
}

.black_color {
    color: black;
}
</style>