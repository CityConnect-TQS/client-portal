import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { ThemeSwitcher } from "./themeSwitcher";
import { Currency, currencyCodes } from "@/types/currency";
import { useCookies } from "react-cookie";
import { useNavigate } from "@tanstack/react-router";

export function NavbarClient() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cookies, setCookies] = useCookies(["currency"]);
  const currency = (cookies.currency as Currency) ?? "EUR";

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
        <NavbarItem className="hidden lg:flex">
          <Button variant="light">Login</Button>
        </NavbarItem>
        <NavbarItem>
          <Button variant="flat">Sign Up</Button>
        </NavbarItem>
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
      </NavbarContent>
    </Navbar>
  );
}
