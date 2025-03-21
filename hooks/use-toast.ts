"use client"; // 声明这是一个客户端组件

// Inspired by react-hot-toast library
import * as React from "react"; // 导入React核心库

import type { ToastActionElement, ToastProps } from "@/components/ui/toast"; // 导入toast组件的类型定义

const TOAST_LIMIT = 1; // 定义最大显示的toast数量
const TOAST_REMOVE_DELAY = 1000000; // 定义toast移除的延迟时间（毫秒）

// 定义Toast的完整类型，继承自ToastProps并添加额外属性
type ToasterToast = ToastProps & {
  id: string; // toast的唯一标识
  title?: React.ReactNode; // 可选的标题
  description?: React.ReactNode; // 可选的描述
  action?: ToastActionElement; // 可选的操作按钮
};

// 定义toast的动作类型
const actionTypes = {
  ADD_TOAST: "ADD_TOAST", // 添加toast
  UPDATE_TOAST: "UPDATE_TOAST", // 更新toast
  DISMISS_TOAST: "DISMISS_TOAST", // 关闭toast
  REMOVE_TOAST: "REMOVE_TOAST", // 移除toast
} as const;

let count = 0; // 用于生成唯一ID的计数器

// 生成唯一ID的函数
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes; // 动作类型的类型定义

// 定义可能的Action联合类型
type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

// 定义状态接口
interface State {
  toasts: ToasterToast[]; // toast列表
}

// 存储toast超时定时器的Map
const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

// 添加toast到移除队列的函数
const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

// reducer函数，处理各种toast动作
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) => (t.id === action.toast.id ? { ...t, ...action.toast } : t)),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

// 存储状态变化监听器的数组
const listeners: Array<(state: State) => void> = [];

// 内存中的状态
let memoryState: State = { toasts: [] };

// 分发动作的函数
function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

// Toast类型定义，排除id属性
type Toast = Omit<ToasterToast, "id">;

// 创建toast的函数
function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

// 自定义Hook，用于管理toast状态
function useToast() {
  const [state, setState] = React.useState<State>(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
