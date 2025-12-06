import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DocumentCardProps {
  baseDocument: string;
  onSelectBaseDocument: () => void;
}

export function DocumentCard({ baseDocument, onSelectBaseDocument }: DocumentCardProps) {
  return (
    <Card className="mb-4">
      <div className="border-2 border-red-500 rounded-t-lg bg-yellow-50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name="AlertTriangle" size={20} className="text-orange-600" />
          <span className="text-sm font-medium text-slate-900">
            {baseDocument ? `Документ-основание: ${baseDocument}` : 'Документ-основание не найден'}
          </span>
        </div>
        <Button 
          className="bg-blue-600 hover:bg-blue-700"
          onClick={onSelectBaseDocument}
        >
          Выбрать документ-основание
        </Button>
      </div>

      <div className="px-6 py-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="px-3 py-1 bg-slate-100 border border-slate-300 rounded text-sm font-medium">
            Справка КС-3
          </div>
          <h1 className="text-xl font-semibold">
            № 251130U0012 от 30.11.2025 на сумму 135011.42
          </h1>
          <Button variant="outline" size="sm" className="ml-auto">
            Действия
            <Icon name="ChevronDown" size={16} className="ml-1" />
          </Button>
        </div>

        <div className="flex gap-2 border-b border-slate-200">
          <button className="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
            Общая информация
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            Данные
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            Вложения документа
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            Связанные документы
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            Доступ
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            Ход процесса
          </button>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900">
            Данные о контрагенте
          </button>
        </div>

        <div className="py-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-600 mb-1">Тип документа</label>
              <div className="text-sm text-slate-900">
                Справка КС-3
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs text-slate-600 mb-1">Дата регистрации</label>
            <div className="text-sm text-slate-900">-</div>
          </div>
        </div>
      </div>
    </Card>
  );
}