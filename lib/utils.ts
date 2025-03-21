// 从clsx包中导入clsx函数和ClassValue类型
// clsx是一个用于构建className字符串的工具
import { clsx, type ClassValue } from "clsx";
// 导入tailwind-merge中的twMerge函数
// twMerge用于合并Tailwind CSS类名，避免冲突
import { twMerge } from "tailwind-merge";

// 导出formatDate函数，接收Date类型参数，返回格式化的日期字符串
export function formatDate(date: Date): string {
  // 使用toLocaleDateString将日期转换为指定格式的字符串
  // 配置为显示完整月份名称、日期数字和年份
  return new Date(date).toLocaleDateString("en-US", {
    month: "long", // 月份格式：完整名称（如 "January"）
    day: "numeric", // 日期格式：数字（如 "1"）
    year: "numeric", // 年份格式：数字（如 "2024"）
  });
}

// 导出cn函数，接收任意数量的ClassValue类型参数
// 用于组合和合并CSS类名
export function cn(...inputs: ClassValue[]) {
  // 使用twMerge和clsx组合处理类名
  // clsx将输入转换为类名字符串
  // twMerge合并Tailwind类名并解决冲突
  return twMerge(clsx(inputs));
}
