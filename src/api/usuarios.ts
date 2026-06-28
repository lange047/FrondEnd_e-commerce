import { apiRequest } from "./client";

export interface Usuario {
  id: number;
  nome: string;
  email: string;
  tipo: "ADMIN" | "CLIENTE";
}

export interface UsuariosListResponse {
  dados: Usuario[];
  total: number;
  pagina: number;
  por_pagina: number;
}

export interface CriarUsuarioPayload {
  nome: string;
  email: string;
  senha: string;
}

export function listarUsuarios(
  page = 1,
  limit = 10
): Promise<UsuariosListResponse> {
  return apiRequest<UsuariosListResponse>(
    `/usuarios?page=${page}&limit=${limit}`
  );
}

export function buscarUsuario(id: number): Promise<Usuario> {
  return apiRequest<Usuario>(`/usuarios/${id}`);
}

export function criarUsuario(payload: CriarUsuarioPayload): Promise<Usuario> {
  return apiRequest<Usuario>("/usuarios", {
    method: "POST",
    body: payload,
  });
}
