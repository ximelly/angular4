====
group: notice,
order: 2,
platform: mobile,
version: v1.0
====

## toastMessage

### 属性

| 属性名        | 描述   | 类型 |  默认值  |
| --------   | :----- | :----:  | :----:  |
| message    | 提示信息 | string | 无  |
| time       | 提示信息展示的时长 | number | 100  |
| show       | 显示提示信息 | boolean| false  |

### 引用文件
```
// 方法一
import { ToastMessageModule } from './components/toastMessage/toastMessage.module';
imports: [ToastMessageModule]

// 方法二
import { ToastMessageComponent } from './components/toastMessage/toastMessage.component';
declarations: [ToastMessageComponent]
```
### 用法
```
// 1 提示信息
<toastMessage message="xxx"></toastMessage>

// 2 提示信息展示的时长
<toastMessage message="xxx"" time=200></toastMessage>

// 3 显示提示信息
方法一：
<toastMessage #toastMessage message="xxx"></toastMessage>
<div (click)="toastMessage.toast()" >dianji</div>

方法二：
<toastMessage></toastMessage>

@ViewChild(ToastMessageComponent) private toast:ToastMessageComponent;
this.toast.message="xxx";
this.toast.toast();


// 4 监听提示信息淡出
<toastMessage message="xxx" (hideToast)="xxx($event)"></toastMessage>

```

### 历史修改和版本迭代

| 版本        | 时间   |  变更  |   包含功能(可简略填写)  |
| --------   | :----- | :----:  | :----:  |
| 1.0.0     | 2017.07.30 | 第一个版本创建  | 显示提示信息 |


### 开发 && 维护

- ximelly liuximei@biostime.com
