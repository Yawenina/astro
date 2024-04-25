import { Epub } from './epub';

const epub = new Epub({
  title: '行星落点',
  author: '蓝斯诺',
  root: '/Users/yawen.xiao/Codes/github/Yawenina/astro/planets-in-12-houses',
  pubId: '1',
})

epub.generate();