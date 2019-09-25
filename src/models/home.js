import { post_user_info } from '@/services/api';
import React from 'react';

export const home = {
  state: {
    columns: [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            render: (text) => {
                const hide = (text)=>{
                    return text+'岁'
                }
                return (<a>{hide(text)}</a>)
            }
        }
    ],
    userinfo: [{
        "name": "赵明",
        "id": "122",
        "age": 18
    }]
  },

  subscriptions: {

  },

  effects: (dispatch) => ({
    async post_user_info(params){
        console.log(params)
        try{
            let res = await post_user_info("");
            this.ADD_USER(res);
        }catch(e){
        }
    }
  }),

  reducers: {
    ADD_USER(state, data) {
      return { ...state,
        userinfo: data };
    }
  }
};
