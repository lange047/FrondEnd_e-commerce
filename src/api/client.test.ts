import { describe, it, expect, vi, beforeEach } from "vitest";
import { apiRequest } from "./client";

const mockFetch = vi.fn();
vi.stubGlobal("fetch", mockFetch);

beforeEach(() => {
  mockFetch.mockReset();
  localStorage.clear();
});

describe("apiRequest", () => {
  it("sends JSON body and returns parsed response", async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ token: "abc" }),
    });

    const result = await apiRequest("/login", {
      method: "POST",
      body: { email: "a@b.com", senha: "123" },
    });

    expect(result).toEqual({ token: "abc" });
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it("attaches Authorization header when token is in localStorage", async () => {
    localStorage.setItem("token", "my-token");
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    });

    await apiRequest("/usuarios");

    const [, init] = mockFetch.mock.calls[0];
    expect((init.headers as Record<string, string>)["Authorization"]).toBe(
      "Bearer my-token"
    );
  });

  it("throws with the 'erro' message on non-ok responses", async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ erro: "não autorizado" }),
    });

    await expect(apiRequest("/usuarios")).rejects.toThrow("não autorizado");
  });

  it("returns undefined for 204 responses", async () => {
    mockFetch.mockResolvedValue({ ok: true, status: 204 });

    const result = await apiRequest("/categorias/1", { method: "DELETE" });
    expect(result).toBeUndefined();
  });
});
