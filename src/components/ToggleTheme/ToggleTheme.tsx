import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { Moon, Sun } from "../../assets/icons";
import classes from "./ToggleTheme.module.scss";

export function ToggleTheme() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", { getInitialValueInEffect: true });

  return (
    <ActionIcon onClick={() => setColorScheme(computedColorScheme === "light" ? "dark" : "light")} variant='default' size='xl' aria-label='Toggle color scheme'>
      {computedColorScheme === "light" ? <Moon /> : <Sun />}
    </ActionIcon>
  );
}
