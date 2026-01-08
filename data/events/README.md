# 龙芯爱好者社区公开活动日历

此处存放的 iCalendar 文件是用于页面展示各种社区活动信息的数据源。目前接入的社区活动有：

* 龙架构双周会

目前社区运营人员没有适合的地方部署后端服务，因此该日历无法以常规的 CalDAV 服务器形式存在，只能由
[@xen0n][@xen0n] 在自己的 CalDAV 服务器上编辑好了导出到这里。

[@xen0n]: https://github.com/xen0n

## 何时需要维护此数据？

至少有以下几种可能，导致我们不得不更新此处的 iCalendar 数据：

* 需要为新的社区活动新增信息；
* 出于调休、突发状况等，需要修改定期活动以添加例外；
* 需要配合代码重构调整数据。

## 如何维护此数据？

您可以遵循 [RFC 5545][rfc5545]、[RFC 6868][rfc6868]、[RFC 7529][rfc7529]、[RFC 7986][rfc7986]
的规范，手工编辑 iCalendar 数据，但大概率吃力不讨好。以下是一些变通的方法：

[rfc5545]: https://www.rfc-editor.org/rfc/rfc5545
[rfc6868]: https://www.rfc-editor.org/rfc/rfc6868
[rfc7529]: https://www.rfc-editor.org/rfc/rfc7529
[rfc7986]: https://www.rfc-editor.org/rfc/rfc7986

1. 将 ics 文件导入编辑器，如 [iCal Event Maker](https://ical.marudot.com) 之类，保存后替换回来。
2. 自建一个 CalDAV 实例，将 ics 文件导入其中，再将此服务器添加至您电脑或手机操作系统的日历。用您熟悉的工具软件编辑后，从服务器端或客户端导出，再替换回来。

因为 iCalendar 格式的供应商特定扩展众多，所以无论您采取何种方式编辑，都存在数据格式不兼容的风险。请您确保：

* 在更新本仓库内容之后，在本地验证功能正常；
* 在 `git commit` 之前，仔细观察 diff，确保没有引入无关内容。
