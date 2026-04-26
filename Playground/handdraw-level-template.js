const HANDDRAW_LEVEL_TEMPLATE = {
  id: 999,
  title: "自定义关卡：手绘复杂迷宫",
  goal: "先拿到钥匙，再前往出口门。",
  teaching: "这一关是手绘模板，请按自己的设计修改坐标、道具和墙体。",

  // 起点、钥匙、门都用格子坐标。
  // 例如 x: 0, y: 0 表示左上角第一格。
  start: { x: 0, y: 0 },
  key: { x: 10, y: 8 },
  door: { x: 11, y: 0 },

  // pickups 用来放道具。
  // 可选 type:
  // - "phase"  : 幻越符
  // - "chisel" : 裂隙钉
  // - "hammer" : 破城锤
  pickups: [
    { type: "phase", x: 2, y: 1 },
    { type: "chisel", x: 5, y: 5 },
    { type: "hammer", x: 8, y: 7 }
  ],

  // walls 是手绘迷宫最核心的部分。
  // 每一条墙都贴着格子边画，不要画斜线。
  //
  // 字段说明：
  // - x, y:
  //   墙起点坐标
  // - orientation:
  //   "h" = 横墙
  //   "v" = 竖墙
  // - length:
  //   连续多少个最小单位墙段
  // - group:
  //   可选。建议给重要长墙命名，方便破城锤整段打碎
  //
  // 例子：
  // { x: 3, y: 2, orientation: "h", length: 4 }
  // 表示从 (3, 2) 开始向右的一条长度为 4 的横墙
  //
  // { x: 6, y: 1, orientation: "v", length: 5, group: "center-spine" }
  // 表示从 (6, 1) 开始向下的一条长度为 5 的竖墙
  walls: [
    // 1. 先用长墙搭大骨架
    { x: 2, y: 0, orientation: "v", length: 9, group: "west-spine" },
    { x: 6, y: 1, orientation: "v", length: 8, group: "center-spine" },
    { x: 9, y: 0, orientation: "v", length: 7, group: "east-spine" },
    { x: 0, y: 2, orientation: "h", length: 5, group: "north-cut" },
    { x: 3, y: 5, orientation: "h", length: 6, group: "mid-cut" },
    { x: 1, y: 8, orientation: "h", length: 8, group: "south-cut" },

    // 2. 再用中短墙做分区和拐点
    { x: 4, y: 2, orientation: "v", length: 2 },
    { x: 8, y: 2, orientation: "v", length: 3 },
    { x: 10, y: 4, orientation: "v", length: 4 },
    { x: 5, y: 7, orientation: "h", length: 3 },
    { x: 7, y: 3, orientation: "h", length: 2 },
    { x: 1, y: 6, orientation: "h", length: 3 },

    // 3. 最后加少量细墙修路线
    { x: 3, y: 3, orientation: "h", length: 1 },
    { x: 11, y: 1, orientation: "v", length: 1 },
    { x: 9, y: 7, orientation: "h", length: 1 }
  ]
};

/*
使用建议：

1. 先只改 start / key / door / pickups
   先把起点、钥匙、门、道具位置摆出来，再开始画墙。

2. 先画“大墙”
   先写 length >= 4 的长墙，搭出主区域。

3. 再补“中墙”
   用长度 2-3 的墙做拐点、岔路、房间边界。

4. 最后才加“细墙”
   用 length = 1 的小墙修路线，不要一开始就全是碎墙。

5. 关键长墙尽量写 group
   以后你想让破城锤打碎整段墙时，会特别方便。

6. 推荐你按区域设计
   - 起点区
   - 钥匙区
   - 道具区
   - 门前区
   - 干扰区

7. 推荐你自己加关时的流程
   - 复制这个对象
   - 改 id / title
   - 改 start / key / door
   - 改 pickups
   - 改 walls
   - 再把它贴进 index.html 里的 LEVELS 数组
*/

