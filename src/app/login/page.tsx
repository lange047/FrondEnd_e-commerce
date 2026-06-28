"use client";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-sky-100 p-6">
      <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl">
        
        {/* Avatar menor e mais harmônico */}
        <div className="mb-6 flex justify-center">
          <div className="flex size-20 items-center justify-center rounded-full bg-slate-100 p-4 shadow-sm">
            <svg className="h-full w-full text-slate-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
        </div>

        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Perfil</label>
            <select className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm text-slate-700 outline-none focus:border-blue-500">
              <option value="CLIENTE">Cliente</option>
              <option value="ADMIN">Administrador</option>
            </select>
          </div>

          <input
            type="email"
            placeholder="E-mail"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2.5 text-sm outline-none focus:border-blue-500"
          />
          
          <button
            type="submit"
            className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Entrar
          </button>
        </form>

        <div className="mt-5 flex flex-col items-center gap-1.5 text-xs">
          <a href="#" className="text-blue-600 hover:underline">Esqueceu sua senha?</a>
          <p className="text-slate-500">
            Ainda não tem conta?{" "}
            <a href="#" className="font-semibold text-blue-600 hover:underline">Se cadastrar</a>
          </p>
        </div>
      </div>
    </main>
  );
}