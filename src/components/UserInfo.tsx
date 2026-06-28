'use client';

import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';

export function UserInfo() {
  const { user, isAdmin, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex items-center gap-4 p-4 bg-blue-50 border border-blue-200 rounded">
      <div>
        <p className="font-semibold">{user?.email || 'Usuário'}</p>
        <p className="text-sm text-gray-600">
          {isAdmin ? '👤 Administrador' : '👥 Cliente'}
        </p>
      </div>
      <Button onClick={logout} variant="outline" size="sm">
        Sair
      </Button>
    </div>
  );
}
