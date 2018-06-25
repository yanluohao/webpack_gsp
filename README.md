# webpack_gsp


## 目录结构

```bash
├── grails-app  # main folder
│   ├── assets  # common assets folder
│   │   ├── img
│   │   │   └── logo.png
│   │   ├── js
│   │   └── css
│   └── views  # pages
│       └── ci
│           └── vueSrc
│               ├── common # common content folder
│               ├── components # common components folder
│               ├── pages # pages
│               │   └── test
│               │       └── edit
│               │           ├── index.js
│               │           └── index.vue
│               ├── webpack.config.js # webpack conf
│               ├── package.json
│               └── README.md
├── LICENSE
├── .babelrc         
├── package.json
└── README.md
```

## 主要内容

添加了babel，支持import和es6+，css方面可以根据自己喜好来安装对应的loader；

因为gsp页面的一些特性和个人的懒惰性，没有使用htmlWebpackPlugin来植入模板，所以不存在html模板和script标签的自动添加；

以及module部分没有做任何的chunk；

图片使用的是绝对路径，避开webpack对图片进行打包操作；
