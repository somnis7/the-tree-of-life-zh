# 生命树 · The Tree of Life 简体中文翻译

原作者 **pg132** · 独立汉化 **somnis7**

基于英文原版 2.068 的非官方汉化。游戏玩法和数值保持原版；翻译使用独立文件维护。

**当前为汉化起步版，尚未完整翻译全游戏。** 已加入基础菜单、设置、常用资源名、细胞阶段部分术语和中英文切换。大量升级、挑战说明和后期内容仍待翻译、校对。

## 本地运行

安装 Node.js 后，在本目录执行：

```sh
node tools/serve.cjs
```

打开 http://127.0.0.1:8080/ 。无需安装额外依赖。右下角可切换中英文。

## 参与汉化

编辑 [js/i18n/zh-CN.js](js/i18n/zh-CN.js)。详细步骤和术语约定见 [汉化指南](docs/translation.md)。

购买项使用“中文＋英文原名”，例如“全能 Totipotent”和“多能 Multipotent”，便于与公式及攻略对照。所有数值、公式、内部标识和存档字段保持原文。

## 发布到自己的 GitHub

1. 在自己的账号下新建公开仓库，建议名称 `the-tree-of-life-zh`，不要预先生成 README、许可证或 .gitignore。
2. 将本项目推送到仓库的 `main` 分支。发布用压缩包也可解压后通过 GitHub 的 **Add file → Upload files** 上传；需上传项目根目录的内容，而不是外层文件夹。
3. 仓库 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/ (root)`，保存。
4. 部署成功后，从 Pages 页面打开实际访问地址。

完整操作命令与第一次发布注意事项见 [发布指南](docs/publishing.md)。

## 存档

支持按原游戏方式导入、导出 2.068 存档。网页存档按域名保存；换到自己的站点后需要手动导入。首次测试请导出备份，并使用副本。不要向仓库上传个人存档。

## 来源和许可

- [原游戏分支](https://github.com/pg132/The-Modding-Tree/tree/evolution) · [原版 README](README.upstream.md)
- 上游提交：`a284819510857e1bfd82ab6dd6062a76036541dd`
- 原有许可：[LICENSE](LICENSE)、[Prestige-tree-license](Prestige-tree-license)
- 新增汉化许可：[TRANSLATION-LICENSE](TRANSLATION-LICENSE)
- 完整署名：[NOTICE.md](NOTICE.md)

本项目从英文原版独立翻译，未复制其他汉化项目的词库或翻译引擎。原游戏作者、引擎作者的署名及致谢均保留。
