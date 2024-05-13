import {
  Button,
  Chip,
  CircularProgress,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { MaterialSymbol } from "react-material-symbols";
import { useForm } from "@tanstack/react-form";
import { loginUser } from "@/service/userService.ts";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";
import { useCookies } from "react-cookie";
import { useMutation } from "@tanstack/react-query";

interface UserModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function LoginModal({
  isOpen,
  onOpenChange,
}: Readonly<UserModalProps>) {
  const [, setCookies] = useCookies(["user"]);

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) =>
      setCookies("user", JSON.stringify(user), {
        path: "/",
        expires: new Date(user.expires),
      }),
  });

  const { Field, handleSubmit, Subscribe } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validatorAdapter: zodValidator,
    validators: {
      onSubmit: z.object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least six characters"),
      }),
    },
    onSubmit: async ({ value }) => {
      await mutation.mutateAsync(value);
      mutation.reset();
    },
  });

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={(isOpen) => {
        onOpenChange(isOpen);
        mutation.reset();
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Hi! Let&apos;s get signed in.
            </ModalHeader>

            <ModalBody>
              <form>
                <Field
                  name="email"
                  validatorAdapter={zodValidator}
                  validators={{
                    onChange: z.string().email("Invalid email address"),
                  }}
                >
                  {({ state, handleChange, handleBlur }) => (
                    <Input
                      onChange={(e) => handleChange(e.target.value)}
                      endContent={<MaterialSymbol icon="email" size={20} />}
                      label="Email"
                      onBlur={handleBlur}
                      placeholder="Enter your email"
                      isInvalid={state.meta.errors.length > 0}
                      errorMessage={state.meta.errors}
                    />
                  )}
                </Field>
                <Field
                  name="password"
                  validatorAdapter={zodValidator}
                  validators={{
                    onChange: z
                      .string()
                      .min(6, "Password must be at least six characters"),
                  }}
                >
                  {({ state, handleChange, handleBlur }) => (
                    <Input
                      onChange={(e) => handleChange(e.target.value)}
                      endContent={<MaterialSymbol icon="password" size={20} />}
                      label="Password"
                      onBlur={handleBlur}
                      placeholder="Enter your password"
                      type="password"
                      isInvalid={state.meta.errors.length > 0}
                      errorMessage={state.meta.errors}
                    />
                  )}
                </Field>
              </form>
            </ModalBody>

            <ModalFooter className={"justify-between items-center"}>
              {mutation.isError ? (
                <Chip
                  color="danger"
                  variant={"flat"}
                  startContent={<MaterialSymbol icon="error" size={20} />}
                >
                  {mutation.error.message}
                </Chip>
              ) : (
                <div />
              )}
              <Subscribe>
                {({ canSubmit, isSubmitting }) => (
                  <Button
                    color={isSubmitting ? "default" : "primary"}
                    variant={isSubmitting ? "flat" : "solid"}
                    isDisabled={!canSubmit}
                    onPress={() => {
                      handleSubmit()
                        .then(onClose)
                        .catch(() => {
                          console.log("Error", "Failed to log in");
                        });
                    }}
                  >
                    {isSubmitting ? (
                      <CircularProgress
                        size={"sm"}
                        strokeWidth={3}
                        color={"primary"}
                        aria-label="Loading..."
                      />
                    ) : (
                      "Login"
                    )}
                  </Button>
                )}
              </Subscribe>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
