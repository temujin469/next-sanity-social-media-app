export default {
  name: 'post',
  title: 'Нийтлэл',
  type: 'document',
  fields: [
    {
      name: 'text',
      title: 'Нийтлэл',
      type: 'string',
    },
    {
      name: 'blockPost',
      title: 'Нийтлэлийг блоклох',
      type: 'boolean',
      description:"Toggle if post is deemed "
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
      name: 'image',
      title: 'Нийтлэлийн зураг',
      type: 'string',
    },]
};
