import { describe, expect, it } from "vitest";

import { de_de_app } from "./app";
import { zh_cn_app } from "../zh-CN/app";

// 资源 key 收集按叶子节点展开，确保中德文嵌套结构也能被对齐检查覆盖。
function collect_message_keys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, child]) => {
    const next_prefix = prefix === "" ? key : `${prefix}.${key}`;
    return collect_message_keys(child, next_prefix);
  });
}

describe("de_de_app", () => {
  it("德文文案资源与中文主资源保持相同 key 集合", () => {
    expect(collect_message_keys(de_de_app).sort()).toEqual(collect_message_keys(zh_cn_app).sort());
  });
});
