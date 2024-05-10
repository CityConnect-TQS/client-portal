import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Link,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { ThemeSwitcher } from "./themeSwitcher";
import { Currency, currencyCodes } from "@/types/currency";
import { useCookies } from "react-cookie";

export function NavbarClient() {
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
          <Link href="/">
            <img
              src="/logo.svg"
              alt="CityConnect"
              className="h-8 mr-4 w-auto rounded"
            />
            <p className="font-bold text-inherit">CityConnect</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">
        <ThemeSwitcher />
        <NavbarItem className="hidden lg:flex">
          <Link href="#" className="text-primary">
            Login
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        <NavbarItem className="w-28">
          <Select
            label="Currency"
            size="sm"
            placeholder="Select a currency"
            defaultSelectedKeys={[currency]}
            className="max-w-xs"
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
