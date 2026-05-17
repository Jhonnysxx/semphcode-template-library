import { BookOpen, Plus } from 'lucide-react';
import { Button } from './ui/Button';

type HeaderProps = {
  onCreate: () => void;
};

export function Header({ onCreate }: HeaderProps) {
  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark"><BookOpen size={20} /></span>
        <div>
          <strong>Content Hub</strong>
          <small>Organize, encontre e mantenha registros atualizados</small>
        </div>
      </div>
      <Button onClick={onCreate}>
        <Plus size={18} />
        Novo registro
      </Button>
    </header>
  );
}
