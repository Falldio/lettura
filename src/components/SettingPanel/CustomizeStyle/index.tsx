import React, { useEffect, useState } from "react";
import { Slider } from "@arco-design/web-react";
import { useBearStore } from "../../../hooks/useBearStore";

export interface CustomizeStyleProps {
  styleConfig: CustomizeStyle | undefined;
}

export const CustomizeStyle = (props: CustomizeStyleProps) => {
  const store = useBearStore((state) => ({
    userConfig: state.userConfig,
    updateUserConfig: state.updateUserConfig,
  }));
  const { styleConfig } = props;
  console.log("%c Line:15 🍿 styleConfig", "color:#3f7cff", styleConfig);
  const [cfg, setCfg] = useState({
    typeface: "",
    font_size: 12,
    line_height: 28,
    line_width: 1,
  });

  useEffect(() => {
    styleConfig && setCfg({ ...styleConfig });
  }, [styleConfig]);

  function handleCustomizeStyleChange(
    key: keyof CustomizeStyle,
    value: number | string | number[]
  ) {
    setCfg({
      ...cfg,
      [key]: value,
    });

    store.updateUserConfig({
      ...store.userConfig,
      customize_style: {
        ...cfg,
        [key]: value,
      },
    });

    document.documentElement.style.setProperty(
      `--reading-editable-${key.replace(/_/gi, "-")}`,
      value as string
    );
  }

  return (
    <div className="w-full max-w-xs bg-detail-bg px-1 grid gap-2">
      <div className="grid gap-2 grid-flow-col grid-cols-[74px_auto_42px] items-center">
        <div className="text-sm">Font Size</div>
        <div>
          <Slider
            value={cfg.font_size}
            max={20}
            min={12}
            step={1}
            onChange={(value: number | number[]) =>
              handleCustomizeStyleChange("font_size", value)
            }
          />
        </div>
        <div className="bg-button text-button-text rounded text-center text-xs py-[2px]">
          {cfg.font_size}
        </div>
      </div>
      <div className="grid gap-2 grid-flow-col grid-cols-[74px_auto_42px] items-center">
        <div className="text-sm">Line Height</div>
        <div>
          <Slider
            value={cfg.line_height}
            max={36}
            min={20}
            step={2}
            onChange={(value: number | number[]) =>
              handleCustomizeStyleChange("line_height", value)
            }
          />
        </div>
        <div className="bg-button text-button-text rounded text-center">
          {cfg.line_height}
        </div>
      </div>
      <div className="grid gap-2 grid-flow-col grid-cols-[74px_auto_42px] items-center">
        <div className="text-sm">Line Width</div>
        <div>
          <Slider
            value={cfg.line_width}
            max={2}
            min={1.2}
            step={0.1}
            onChange={(value: number | number[]) =>
              handleCustomizeStyleChange("line_width", Math.round(value as number * 100) / 100)
            }
          />
        </div>
        <div className="bg-button text-button-text rounded text-center">
          {cfg.line_width}
        </div>
      </div>
    </div>
  );
};
