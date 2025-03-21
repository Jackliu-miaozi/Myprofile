// 导入React库的所有功能
import * as React from "react";

// 定义移动设备的断点宽度为768像素
const MOBILE_BREAKPOINT = 768;

// 导出一个自定义Hook，用于检测当前设备是否为移动设备
export function useIsMobile() {
  // 使用useState创建状态，初始值为undefined
  // isMobile用于存储是否为移动设备的状态
  // setIsMobile是用于更新状态的函数
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined);

  // 使用useEffect在组件挂载时设置事件监听
  React.useEffect(() => {
    // 创建媒体查询对象，检测屏幕宽度是否小于768px
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // 定义onChange函数，当窗口大小改变时更新isMobile状态
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // 添加媒体查询事件监听器
    mql.addEventListener("change", onChange);

    // 初始化isMobile状态
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // 清理函数：组件卸载时移除事件监听器
    return () => mql.removeEventListener("change", onChange);
  }, []); // 空依赖数组表示仅在组件挂载时执行

  // 返回isMobile的布尔值（使用!!将undefined转换为false）
  return !!isMobile;
}
