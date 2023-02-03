import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  SizeProp,
  IconPrefix,
  IconName,
} from "@fortawesome/fontawesome-svg-core";
import logo from "../../public/logo.png";

interface IconProps {
  icon: IconName | "rocket";
  size?: SizeProp;
  style?: IconPrefix | "local";
  className?: string;
}

export const Icon = ({
  icon,
  size = "sm",
  className = "",
  style = "fas",
}: IconProps) => {
  switch (style) {
    case "local": {
      switch (icon) {
        case "rocket":
        default: {
          return (
            <img
              src={logo.src}
              className="lg:h-9 md:h-8 h-7 lg:w-9 md:w-8 w-7 ml-2"
            />
          );
        }
      }
    }
    case "fas":
    default: {
      return <FontAwesomeIcon icon={icon} size={size} className={className} />;
    }
  }
};

export default Icon;
