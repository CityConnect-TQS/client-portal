import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect } from "react";
import { ThemeSwitcher } from "./themeSwitcher";
import { Currency, currencyCodes } from "@/types/currency";
import { useCookies } from "react-cookie";
import { useNavigate } from "@tanstack/react-router";
import { User } from "@/types/user.ts";
import { MaterialSymbol } from "react-material-symbols";
import LoginModal from "@/components/loginModal.tsx";
import RegisterModal from "@/components/registerModal.tsx";
import { SafeArea } from "capacitor-plugin-safe-area";

export function NavbarClient() {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["currency", "user"]);
  const currency = (cookies.currency as Currency) ?? "EUR";
  const user = cookies.user !== undefined ? (cookies.user as User) : undefined;

  useEffect(() => {
    void (async () => {
      const safeAreaData = await SafeArea.getSafeAreaInsets();
      const { insets } = safeAreaData;
      for (const [key, value] of Object.entries(insets)) {
        document.documentElement.style.setProperty(
          `--safe-area-inset-${key}`,
          `${value}px`,
        );
      }
    })();
  }, []);

  const {
    isOpen: isOpenLogin,
    onOpen: onOpenLogin,
    onOpenChange: onOpenChangeLogin,
  } = useDisclosure();
  const {
    isOpen: isOpenRegister,
    onOpen: onOpenRegister,
    onOpenChange: onOpenChangeRegister,
  } = useDisclosure();

  return (
    <Navbar
      style={{
        marginTop: "var(--safe-area-inset-top)",
      }}
    >
      <NavbarContent justify={"start"}>
        <NavbarBrand>
          <Button
            onClick={() => void navigate({ to: "/" })}
            onPress={() => void navigate({ to: "/" })}
            size="lg"
            className="md:px-4"
            variant="light"
          >
            <img
              src="/logo.svg"
              alt="CityConnect"
              className="h-8 w-auto rounded"
            />
            <p className="font-bold text-inherit hidden md:block">
              CityConnect
            </p>
          </Button>
        </NavbarBrand>
      </NavbarContent>

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
                id="avatarBtn"
                color={user ? "primary" : "default"}
                fallback={
                  user ? (
                    <p className={"text-xl"}>{user.name.charAt(0)}</p>
                  ) : (
                    <MaterialSymbol
                      icon={"account_circle_off"}
                      size={24}
                      className={"text-default-500"}
                    />
                  )
                }
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownSection showDivider>
                {user ? (
                  <DropdownItem
                    key="profile"
                    id={"userText"}
                    className="h-14 gap-2"
                  >
                    <p>Signed in as</p>
                    <p className="font-semibold">{user.name}</p>
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    key="login"
                    id={"loginBtn"}
                    onClick={onOpenLogin}
                    onPress={onOpenLogin}
                    startContent={<MaterialSymbol icon="login" size={20} />}
                  >
                    Login
                  </DropdownItem>
                )}
                {user ? (
                  <DropdownItem
                    key="logout"
                    color="danger"
                    id={"logoutBtn"}
                    startContent={<MaterialSymbol icon="logout" size={20} />}
                    onClick={() => removeCookies("user")}
                    onPress={() => removeCookies("user")}
                  >
                    Log Out
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    key="register"
                    id={"signUpBtn"}
                    onClick={onOpenRegister}
                    onPress={onOpenRegister}
                    startContent={
                      <MaterialSymbol icon="app_registration" size={20} />
                    }
                  >
                    Sign up
                  </DropdownItem>
                )}
                {user ? (
                  <DropdownItem
                    key="reservations"
                    id={"reservationsBtn"}
                    startContent={<MaterialSymbol icon="book" size={20} />}
                    onClick={() =>
                      void navigate({ to: "/reservation/myreservations" })
                    }
                    onPress={() =>
                      void navigate({ to: "/reservation/myreservations" })
                    }
                  >
                    My Reservations
                  </DropdownItem>
                ) : (
                  <DropdownItem
                    key="reservations"
                    id={"reservationsBtn"}
                    startContent={<MaterialSymbol icon="book" size={20} />}
                    onClick={() =>
                      void navigate({ to: "/reservation/myreservations" })
                    }
                    onPress={() =>
                      void navigate({ to: "/reservation/myreservations" })
                    }
                  >
                    Reservations
                  </DropdownItem>
                )}
              </DropdownSection>
              <DropdownItem
                key="settings"
                startContent={<MaterialSymbol icon="settings" size={20} />}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="help_and_feedback"
                startContent={<MaterialSymbol icon="help" size={20} />}
              >
                Help & Feedback
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <LoginModal isOpen={isOpenLogin} onOpenChange={onOpenChangeLogin} />
          <RegisterModal
            isOpen={isOpenRegister}
            onOpenChange={onOpenChangeRegister}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
