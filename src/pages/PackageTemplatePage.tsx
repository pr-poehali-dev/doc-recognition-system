import { useState } from 'react';
import { DocumentHeader } from '@/components/DocumentHeader';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Card } from '@/components/ui/card';

interface PackageTemplate {
  id: string;
  name: string;
  date: string;
  documentType: string;
}

export function PackageTemplatePage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const packageTemplates: PackageTemplate[] = [
    {
      id: 'pkg-1',
      name: 'Пакет по Договору 555-1',
      date: '01.11.2025',
      documentType: 'Справка КС-3'
    },
    {
      id: 'pkg-2',
      name: 'Пакет по Договору 18666-25',
      date: '02.11.2025',
      documentType: 'Справка КС-3'
    },
    {
      id: 'pkg-3',
      name: 'Пакет по Договору 777-3',
      date: '03.11.2025',
      documentType: 'Справка КС-3'
    },
  ];

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DocumentHeader />

      <div className="p-6">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Icon name="Home" size={16} className="text-slate-600" />
          <span className="text-slate-600">Все пакеты</span>
          <Icon name="ChevronRight" size={16} className="text-slate-400" />
          <span className="text-slate-900">Поступление № 251130U0012 от 30.11.2025 на сумму 135011.42</span>
        </div>

        <Card className="mb-6">
          <div className="px-6 py-4 border-b border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="px-3 py-1 bg-slate-100 border border-slate-300 rounded text-sm font-medium">
                Справка КС-3
              </div>
              <h1 className="text-xl font-semibold">
                № 251130U0012 от 30.11.2025 на сумму 135011.42
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-300 rounded">
                <Icon name="AlertCircle" size={18} className="text-red-600" />
                <span className="text-sm text-red-900">Шаблон пакета документов не найден</span>
              </div>
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Выбрать шаблон пакета документов
              </Button>
              <Button variant="outline" size="lg">
                Действия
                <Icon name="ChevronDown" size={16} className="ml-2" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2 border-b border-slate-200 px-6">
            <button className="px-4 py-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
              Общая информация
            </button>
            <button className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900">
              Данные
            </button>
            <button className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900">
              Вложения документа
            </button>
            <button className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900">
              Связанные документы
            </button>
            <button className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900">
              Доступ
            </button>
            <button className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900">
              Ход процесса
            </button>
            <button className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900">
              Данные о контрагенте
            </button>
            <button className="px-4 py-3 text-sm font-medium text-slate-600 hover:text-slate-900">
              Ещё
              <Icon name="ChevronDown" size={14} className="ml-1 inline" />
            </button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Основные данные</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Тип документа</label>
                  <div className="text-sm text-slate-900">
                    Приход (Поступление), Оприходование [Arrival_Receipt_Registration_SBIS]
                    <Icon name="Copy" size={14} className="inline ml-2 text-blue-600 cursor-pointer" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-slate-600 mb-2">Дата регистрации</label>
                  <div className="text-sm text-slate-900">-</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <span>Пакет по Договору №555-1 от 01.12.2025</span>
              </h3>

              <div className="grid grid-cols-3 gap-6">
                {packageTemplates.map((template) => (
                  <Card 
                    key={template.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      selectedTemplate === template.id 
                        ? 'ring-2 ring-blue-500 bg-blue-50' 
                        : 'hover:border-blue-300'
                    }`}
                    onClick={() => handleSelectTemplate(template.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <Icon name="FileText" size={24} className="text-blue-600 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-slate-900 mb-1 truncate">
                            {template.name}
                          </h4>
                          <p className="text-sm text-slate-600">от {template.date}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Тип документа в карточке</p>
                          <p className="text-sm text-slate-900">{template.documentType}</p>
                        </div>
                      </div>

                      {selectedTemplate === template.id && (
                        <div className="mt-3 pt-3 border-t border-slate-200">
                          <div className="flex items-center gap-2 text-sm text-blue-600">
                            <Icon name="CheckCircle2" size={16} />
                            <span className="font-medium">Выбран</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>

              {selectedTemplate && (
                <div className="mt-6 flex gap-3">
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    size="lg"
                  >
                    Применить выбранный шаблон
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    onClick={() => setSelectedTemplate(null)}
                  >
                    Отменить
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
