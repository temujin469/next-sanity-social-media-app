export default {
  name: 'comment',
  title: "Сэтгэгдэл",
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Сэтгэгдэл',
      type: 'string',
    },
    {
      name: 'username',
      title: 'Нэр',
      type: 'string',
    },
    {
      name: 'profileImage',
      title: 'Нүүр зураг',
      type: 'string',
    },
    {
      name:"post",
      title:"Нийтлэл",
      type:"reference",
      to:{
        type:"post"
      }
    }
  ],
}
