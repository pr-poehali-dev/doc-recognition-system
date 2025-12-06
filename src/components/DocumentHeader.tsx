import Icon from '@/components/ui/icon';

export function DocumentHeader() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Home" size={18} className="text-blue-600" />
            <span className="text-sm text-slate-600">Все документы</span>
          </div>
          <Icon name="ChevronRight" size={16} className="text-slate-400" />
          <span className="text-sm text-slate-900">
            Поступление № 251130U0012 от 30.11.2025 на сумму 135011.42
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Icon name="Search" size={20} className="text-slate-600" />
          <Icon name="Bell" size={20} className="text-slate-600" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center font-medium text-sm">
              АА
            </div>
            <span className="text-sm font-medium">Админов Админ</span>
          </div>
        </div>
      </div>
    </header>
  );
}
