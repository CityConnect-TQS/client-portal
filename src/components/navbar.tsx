import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { ThemeSwitcher } from "./themeSwitcher";
import { Currency, currencyCodes } from "@/types/currency";
import { useCookies } from "react-cookie";
import { useNavigate } from "@tanstack/react-router";
import { User } from "@/types/user.ts";
import { MaterialSymbol } from "react-material-symbols";

export function NavbarClient() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookies, setCookies] = useCookies(["currency", "user"]);
  const currency = (cookies.currency as Currency) ?? "EUR";
  const user =
    cookies.user !== undefined
      ? (JSON.parse(cookies.user as string) as User)
      : undefined;

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Button
            onClick={() => void navigate({ to: "/" })}
            size="lg"
            className="px-4"
            variant="light"
          >
            <img
              src="/logo.svg"
              alt="CityConnect"
              className="h-8 w-auto rounded"
            />
            <p className="font-bold text-inherit">CityConnect</p>
          </Button>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>

      <NavbarContent justify="end">
        <ThemeSwitcher />
        <NavbarItem>
          <Select
            placeholder="Select a currency"
            defaultSelectedKeys={[currency]}
            className="w-24"
            onChange={(event) => {
              setCookies("currency", event.target.value, { path: "/" });
            }}
          >
            {currencyCodes.map((code) => (
              <SelectItem key={code} value={code}>
                {code}
              </SelectItem>
            ))}
          </Select>
        </NavbarItem>

        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color={user ? "primary" : "default"}
                fallback={
                  <MaterialSymbol
                    icon={"account_circle_off"}
                    size={24}
                    className={"text-default-500"}
                  />
                }
                name={user?.name}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold">zoey@example.com</p>
              </DropdownItem>
              <DropdownItem key="settings">My Settings</DropdownItem>
              <DropdownItem key="team_settings">Team Settings</DropdownItem>
              <DropdownItem key="analytics">Analytics</DropdownItem>
              <DropdownItem key="system">System</DropdownItem>
              <DropdownItem key="configurations">Configurations</DropdownItem>
              <DropdownItem key="help_and_feedback">
                Help & Feedback
              </DropdownItem>
              <DropdownItem key="logout" color="danger">
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
