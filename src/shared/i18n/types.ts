export type Locale = "zh-CN" | "en-US" | "de-DE";

export type LocaleMessageSchema<tree> = {
  [key in keyof tree]: tree[key] extends string
    ? string
    : tree[key] extends object
      ? LocaleMessageSchema<tree[key]>
      : never;
};
