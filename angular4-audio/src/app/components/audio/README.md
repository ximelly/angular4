====
group: notice,
order: 2,
platform: mobile,
version: v1.0
====

## audio

### audioSimple   audioControl

#### 属性

| 属性名        | 描述 | 类型 |  默认值  |
| --------   | :----- | :----:| :----:  |
| audiosrc   | 音频路径 | string | 无  |
| autoplay   | 是否自动播放 | boolean| false  |
| preload    | 是否预加载 | string | none  |
| loop       | 是否循环播放 | boolean| false  |
#### 引用文件
```
// 方法一
import { AudioModule } from './components/audio/audio.module';
imports: [ToastMessageModule]

// 方法二(使用哪个就引入哪个)
import { AudioSimpleComponent } from './components/audio/audioSimple.component';
import { AudioMessageComponent } from './components/audio/audioMessage.component';
import { AudioControlComponent } from './components/audio/audioControl.component';
declarations: [AudioSimpleComponent,AudioMessageComponent,AudioControlComponent]
```
#### 用法
```
// 1 添加音频路径
<audioSimple audiosrc="xxx.mp3"></audioSimple>

// 2 自动播放
<audioSimple audiosrc="xxx.mp3" autoplay=true></audioSimple>

// 3 预加载
<audioSimple audiosrc="xxx.mp3" preload="auto"></audioSimple>

// 4 循环播放
<audioSimple audiosrc="xxx.mp3" loop=true></audioSimple>

// 6 监听音频播放
<audioSimple audiosrc="xxx.mp3" (onPlayAudio)="xxx($event)"></audioSimple>

// 7 监听音频暂停
<audioSimple audiosrc="xxx.mp3" (onPauseAudio)="xxx($event)"></audioSimple>

// 8 监听音频播放结束
<audioSimple audiosrc="xxx.mp3" (onEndAudio)="xxx($event)"></audioSimple>

// 9 点击播放时，暂停其他同类音频，以AudioControl为例
<audioControl (onPlayAudio)="payseAllAudio()"  audiosrc="xxx">

import { Component,QueryList,ViewChildren} from '@angular/core';
import { AudioControlComponent } from './components/audio/audioControl.component';

@ViewChildren(AudioControlComponent) private audioControls:QueryList<AudioControlComponent>;
private payseAllAudio(){
  this.audioControls.forEach(audio=>{if(audio.audioStatus=="playing"){audio.pauseAudio();}})
}
```


### audioMessage

#### 属性

| 属性名        | 描述 | 类型 |  默认值  |
| --------   | :----- | :----:| :----:  |
| audiosrc   | 音频路径 | string | 无  |
| autoplay   | 是否自动播放 | boolean| false  |
| preload    | 是否预加载 | string | none  |
| loop       | 是否循环播放 | boolean | false  |
| bgColor    | 音频背景色 | string | #79c03a  |
| message    | 音频上的文字信息 | string | 立即播放  |
| disabled   | 音频不可播放  | boolean | false  |
#### 引用文件
```
同上
```
#### 用法
```
// 1 添加音频路径、自动播放、预加载、循环播放、监听音频播放、监听音频暂停、音频结束等同上

// 2 音频背景色
<audioSimple audiosrc="xxx.mp3" bgColor="#000"></audioSimple>

// 3  音频上的文字信息
<audioMessage audiosrc="xxx.mp3" message="xxx"></audioMessage>

// 4 音频不可播放
<audioMessage audiosrc="xxx.mp3" disabled=true></audioMessage>

```

### 历史修改和版本迭代

| 版本        | 时间   |  变更  |   包含功能(可简略填写)  |
| --------   | :----- | :----:  | :----:  |
| 1.0.0     | 2017.07.30 | 第一个版本创建  | 音频自定义样式 |


### 开发 && 维护

- ximelly liuximei@biostime.com
