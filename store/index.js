//Vuexをインポートし、使えるようにする。
import Vuex from 'vuex'

//ストア関数を定義し、Vuex.Storeオブジェクトを作成する
const createStore = () => {
    return new Vuex.Store({
        //stateに値を保管出来るようにする。
        state: function () {
            return {
                //空の変数をオブジェクトにしてreturnで返す。
                main_data: []
            }
        },
        //mutationsはstateの値を変更できる唯一の存在であり、stateの値を書き換える（追加する）ときは
        //mutationsに定義してある関数を使って行う。

        mutations: {
            //関数を定義して第一引数にstate、第２引数に受け渡したいものを指定する。
            //第２引数以降に複数受け渡しする場合は(state,{~,~,...})のように記述する。

            // 入力されたデータをstateに定義されている変数に保存する
            save_data: function (state, input_info) {
                //save_data関数の第２引数でinput_infoをコンポーネントから持ってきて、state内のmain_dataに追加する。
                state.main_data.unshift(input_info)
            },
            //チェックされた要素のインデックスをmain_dataからフィルター（削除）して新しい変数に格納し、その値をmain_dataに上書きする。
            delete_data: function (state, checked_IDs) {
                let inc = state.main_data.filter((x, index) => !checked_IDs.includes(index))
                state.main_data = inc
            },

        }
    })
}
//定義した関数を使えるようにする
export default createStore