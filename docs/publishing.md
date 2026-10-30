# 第一次发布

建议仓库名：`somnis7/the-tree-of-life-zh`。这是准备使用的名称，不代表远程仓库已经创建或网站已经上线。

## 建立仓库

打开 https://github.com/new?owner=somnis7&name=the-tree-of-life-zh&visibility=public ，确认账号、名称和公开状态。

不要勾选自动添加 README、.gitignore 或许可证，点击 **Create repository**。本项目已经带有这些文件。

## 上传代码

推荐使用 Git 保留原作者历史。本地项目已经从原版建立 `main` 分支，英文仓库保留为 `upstream`。

在项目目录执行以下命令；如果已经存在 `origin`，先检查地址是否正确，避免重复添加：

```sh
git remote add origin https://github.com/somnis7/the-tree-of-life-zh.git
git push -u origin main
```

GitHub 需要你使用自己的账号登录。不要把密码、访问令牌或个人存档写进项目文件。

如果使用压缩包，在空仓库页面选择 **uploading an existing file**，或通过 **Add file → Upload files** 上传解压后的根目录内容。GitHub 浏览器上传有文件数限制；源码包含较多文件，必要时分批上传。压缩包本身不是可部署的源码，须先解压。网页上传不会保留原仓库 Git 提交历史，`NOTICE.md` 中的来源仍须保留。

## 启用网页游戏

1. 进入仓库 **Settings → Pages**。
2. **Build and deployment → Source** 选择 **Deploy from a branch**。
3. 选择分支 **main** 和目录 **/ (root)**，保存。
4. 等待 GitHub 部署完成，从 Pages 页面打开实际链接。

如果仓库名保持上述名称，预期网址是 `https://somnis7.github.io/the-tree-of-life-zh/`；部署前这个地址可能无法访问。

修改翻译、提交并推送到 `main` 后，Pages 会重新部署。

## 发布前检查

- README 明确说明当前为未完成的汉化起步版。
- 保留 `LICENSE`、`Prestige-tree-license`、`TRANSLATION-LICENSE` 和 `NOTICE.md`。
- 运行 `node --test tests/translation.test.cjs`。
- 浏览器检查新游戏、设置页和存档副本。

参考 GitHub 官方文档：

- https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
