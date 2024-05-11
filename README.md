<h2 align="center">工具集插件</h2>

## 🧑‍💻简介

**工具集插件** 为 [Adachi-BOT](https://github.com/SilveryStar/Adachi-BOT)
衍生插件，主要提供一些好用的功能。

## 🛠️ 安装方式

在 `Adachi-BOT/src/plugins` 目录执行下面的命令。

```shell
git clone https://mirror.ghproxy.com/https://github.com/BennettChina/awesome-tools.git
```

### 相关项目

- [awesome-api](https://github.com/BennettChina/awesome-api) 提供一些好用的 API，`#ocr` 目前使用该项目的 Demo
  地址，如果无法访问或者速度慢可自行部署后在本项目的配置文件中配置你的地址。

## 配置

```yaml
# OCR 使用的 API 地址
api_domain: http://localhost:8000
```

## 🎁 更新方式

### 💻 命令行更新

在插件目录执行下面的命令即可。

```shell
git pull
```

### 📱 指令更新

可使用 `#upgrade_plugins 工具集` 指令来更新本插件。

## 🧰 指令列表

| 指令名          | 参数 | 描述        | 备注                  | 
|--------------|----|-----------|:--------------------|
| `#ocr`或`#识别` | 图片 | 识别图片中的二维码 | 支持引用图片消息，附加图片仅支持1张图 |