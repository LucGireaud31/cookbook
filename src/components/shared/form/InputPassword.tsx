import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "../../icons/icons";
import { IconButton } from "../IconButton";
import { Input, InputProps } from "./Input";

export function InputPassword(props: InputProps) {
  const { ...rest } = props;

  const [visible, setVisible] = useState(false);
  console.log(!visible);
  return (
    <Input
      autoCapitalize="none"
      rightAddon={
        <IconButton
          icon={visible ? <EyeIcon /> : <EyeSlashIcon />}
          onPress={() => setVisible(!visible)}
        />
      }
      {...rest}
      secureTextEntry={!visible}
    />
  );
}
