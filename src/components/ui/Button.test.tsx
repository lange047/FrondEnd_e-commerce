import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders children", () => {
    render(<Button>Salvar</Button>);
    expect(screen.getByRole("button", { name: "Salvar" })).toBeInTheDocument();
  });

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Salvar</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("calls onClick when clicked", async () => {
    const handler = vi.fn();
    render(<Button onClick={handler}>Clique</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handler).toHaveBeenCalledOnce();
  });

  it("does not call onClick when disabled", async () => {
    const handler = vi.fn();
    render(<Button disabled onClick={handler}>Clique</Button>);
    await userEvent.click(screen.getByRole("button"));
    expect(handler).not.toHaveBeenCalled();
  });

  it("applies destructive variant class", () => {
    render(<Button variant="destructive">Deletar</Button>);
    expect(screen.getByRole("button")).toHaveClass("text-destructive");
  });

  it("applies outline variant class", () => {
    render(<Button variant="outline">Cancelar</Button>);
    expect(screen.getByRole("button")).toHaveClass("border-border");
  });
});
