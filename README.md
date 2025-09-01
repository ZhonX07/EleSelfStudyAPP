# selfstu-vue

An Electron application with Vue

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

## Project Setup

### Install

```bash
$ pnpm install
```

### Development

```bash
$ pnpm dev
```

### Build

```bash
# For windows
$ pnpm build:win

# For macOS
$ pnpm build:mac

# For Linux
$ pnpm build:linux
```

# 版本发布流程

发布新版本时，按照以下步骤操作：

1. 首先修改 package.json 中的版本号
   ```json
   {
     "name": "selfstu-vue",
     "version": "1.0.1", // 更新为新版本号
     // ...
   }
   ```

2. 更新代码并提交到本地仓库
   ```bash
   git add .
   git commit -m "更新内容描述"
   ```

3. 推送代码更新到远程仓库的主分支
   ```bash
   git push origin main
   ```
   - 这一步将您的代码变更推送到GitHub
   - 但不会触发自动构建和发布

4. 创建本地标签（**重要：必须先创建标签再推送**）
   ```bash
   git tag v1.0.1
   ```
   - 确保标签名与 package.json 中的版本一致，并以 'v' 开头

5. 推送标签到远程仓库
   ```bash
   git push origin v1.0.1
   ```
   - 这一步会触发GitHub Actions工作流
   - 自动构建并发布新版本

注意：如果您收到 `error: src refspec v1.0.1 does not match any` 错误，说明您尝试推送一个尚未创建的标签。请确保先执行步骤4创建标签。
