import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface DocumentField {
  label: string;
  value: string;
  confidence: number;
  verified: boolean;
}

interface PackageDocument {
  id: string;
  type: string;
  name: string;
  pages: number;
  size: string;
  confidence: number;
  fields: DocumentField[];
}

interface BaseDocument {
  id: string;
  type: string;
  title: string;
  registrationNumber: string;
  registrationDate: string;
  status: string;
}

export function DocumentManagementSystem() {
  const [selectedDoc, setSelectedDoc] = useState<string>('doc-1');
  const [baseDocument, setBaseDocument] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBaseDoc, setSelectedBaseDoc] = useState<string>('');

  const packageDocs: PackageDocument[] = [
    {
      id: 'doc-1',
      type: 'Разделительный лист',
      name: 'Разделительный лист (1)',
      pages: 4,
      size: 'pdf',
      confidence: 98.8,
      fields: [
        { label: 'Комплект (сканированные)', value: 'Да/"Грузы.да"', confidence: 98, verified: true },
        { label: 'Договор (дата)', value: '21.03.2007', confidence: 99, verified: true },
        { label: 'Договор (номер)', value: '020*134*24*009', confidence: 97, verified: false },
        { label: 'Объект вид', value: '-', confidence: 0, verified: false },
        { label: 'Объект наименование', value: '021.2023.18881.0009', confidence: 95, verified: false },
      ]
    },
    {
      id: 'doc-2',
      type: 'Титульный лист',
      name: 'Титульный лист (1)',
      pages: 4,
      size: 'pdf',
      confidence: 96.2,
      fields: [
        { label: 'Номер акта (если есть)', value: 'М2"Грузы.да"', confidence: 92, verified: false },
        { label: 'Дата номер архивная (вход.)', value: '18.2 от 31.10.2006?', confidence: 88, verified: false },
      ]
    },
    {
      id: 'doc-3',
      type: 'Справка',
      name: 'Справка 1',
      pages: 1,
      size: 'pdf',
      confidence: 94.5,
      fields: []
    },
    {
      id: 'doc-4',
      type: 'Неопределенный документ',
      name: 'Неопределенный документ (3)',
      pages: 4,
      size: 'pdf',
      confidence: 72.3,
      fields: []
    },
  ];

  const baseDocuments: BaseDocument[] = [
    {
      id: 'base-1',
      type: 'Договор',
      title: 'Договор № 555-1 от 01.12.2025',
      registrationNumber: '',
      registrationDate: '-',
      status: 'Подписание'
    },
    {
      id: 'base-2',
      type: 'Договор',
      title: 'Договор № 58666-25 от 02.12.2025',
      registrationNumber: '',
      registrationDate: '-',
      status: 'Создан'
    },
    {
      id: 'base-3',
      type: 'Договор',
      title: 'Договор № 789-3 от 28.11.2025',
      registrationNumber: '',
      registrationDate: '-',
      status: 'Создан'
    },
  ];

  const filteredDocs = baseDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentDoc = packageDocs.find(d => d.id === selectedDoc);

  return (
    <div className="min-h-screen bg-slate-50">
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

      <div className="p-6">
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
              onClick={() => setIsDialogOpen(true)}
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
                    Приход (Поступление), Оприходование [Arrival_Receipt_Registration_SBIS]
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

        <Card>
          <div className="border-2 border-red-500 rounded-t-lg px-4 py-3">
            <h2 className="text-base font-semibold text-slate-900">
              Пакет по Договору №555-1 от 01.12.2025
            </h2>
          </div>

          <Tabs defaultValue="attributes" className="w-full">
            <div className="border-b border-slate-200 px-4">
              <TabsList className="bg-transparent border-0 h-auto p-0">
                <TabsTrigger 
                  value="attributes"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2"
                >
                  Работа с атрибутами
                </TabsTrigger>
                <TabsTrigger 
                  value="files"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent px-4 py-2"
                >
                  Загруженные файлы
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="attributes" className="m-0 p-0">
              <div className="flex">
                <div className="w-80 border-r border-slate-200 bg-slate-50">
                  <div className="p-3 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      <Icon name="HelpCircle" size={16} className="text-blue-600" />
                      Содержимое пакета
                    </span>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Icon name="Settings2" size={14} />
                    </Button>
                  </div>

                  <ScrollArea className="h-[500px]">
                    {packageDocs.map((doc) => (
                      <button
                        key={doc.id}
                        onClick={() => setSelectedDoc(doc.id)}
                        className={`w-full text-left p-3 border-b border-slate-200 hover:bg-slate-100 transition-colors ${
                          selectedDoc === doc.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <Icon 
                            name={doc.confidence > 90 ? "CheckCircle2" : "AlertCircle"} 
                            size={16} 
                            className={doc.confidence > 90 ? "text-green-600 mt-0.5" : "text-orange-600 mt-0.5"} 
                          />
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-slate-900 mb-0.5">
                              {doc.type}
                            </div>
                            <div className="text-xs text-slate-600">
                              {doc.name} • Пакет {doc.pages} {doc.size}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </ScrollArea>
                </div>

                <div className="flex-1 flex">
                  <div className="flex-1 p-4 bg-white">
                    <div className="mb-4">
                      <h3 className="text-base font-semibold text-slate-900 mb-2">
                        {currentDoc?.type}
                      </h3>
                      <div className="bg-slate-100 rounded-lg h-96 flex items-center justify-center border border-slate-300">
                        <div className="text-center">
                          <Icon name="FileText" size={64} className="text-slate-400 mx-auto mb-2" />
                          <div className="text-sm text-slate-600">Превью документа</div>
                          <div className="text-xs text-slate-500 mt-1">
                            {currentDoc?.name} • {currentDoc?.pages} стр.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium text-slate-700 mb-2">Распознанные данные:</div>
                      {currentDoc?.fields.slice(0, 3).map((field, idx) => (
                        <div key={idx} className="text-xs p-2 bg-slate-50 rounded border border-slate-200">
                          <span className="font-medium text-slate-700">{field.label}:</span>
                          <span className="ml-2 text-slate-900">{field.value}</span>
                          {field.value.includes('Грузы.да') && (
                            <span className="ml-2 text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded text-xs">
                              Титульник удален, документ осложнен
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="w-80 border-l border-slate-200 bg-slate-50">
                    <div className="p-3 bg-slate-100 border-b border-slate-200">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-700">Извлеченные данные</span>
                        <Icon name="HelpCircle" size={16} className="text-blue-600" />
                      </div>
                      <Button variant="outline" size="sm" className="w-full text-xs">
                        <Icon name="RotateCw" size={12} className="mr-1" />
                        Параметры
                      </Button>
                    </div>

                    <ScrollArea className="h-[500px]">
                      <div className="p-3 space-y-3">
                        {currentDoc?.fields.map((field, idx) => (
                          <div key={idx} className="bg-white rounded-lg border border-slate-200 p-3">
                            <div className="flex items-start justify-between mb-2">
                              <div className="text-xs font-medium text-slate-900">
                                {field.label}
                              </div>
                              <div className="flex items-center gap-1">
                                {field.verified ? (
                                  <>
                                    <Icon name="Lock" size={12} className="text-slate-400" />
                                    <Icon name="Check" size={12} className="text-green-600" />
                                  </>
                                ) : (
                                  <Icon name="AlertCircle" size={12} className="text-orange-500" />
                                )}
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div>
                                <div className="text-xs text-slate-600 mb-1">Страница 1</div>
                                <Input 
                                  value={field.value}
                                  readOnly
                                  className="text-xs h-8"
                                />
                              </div>

                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1">
                                  <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${
                                        field.confidence >= 95 ? 'bg-green-500' : 
                                        field.confidence >= 90 ? 'bg-yellow-500' : 
                                        field.confidence >= 80 ? 'bg-orange-500' : 
                                        'bg-red-500'
                                      }`}
                                      style={{ width: `${field.confidence}%` }}
                                    />
                                  </div>
                                  <span className="text-xs font-medium text-slate-700">
                                    {field.confidence}%
                                  </span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                                  <Icon name="Eye" size={12} />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}

                        {currentDoc && currentDoc.fields.length === 0 && (
                          <div className="text-center py-8 text-sm text-slate-500">
                            Нет извлеченных данных
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="files" className="p-6">
              <div className="text-center py-12 text-slate-500">
                Загруженные файлы отображаются здесь
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-5xl max-h-[85vh] p-0">
          <DialogHeader className="px-6 pt-6 pb-4">
            <div className="border-2 border-red-500 rounded px-3 py-2 mb-3">
              <DialogTitle className="text-lg font-semibold text-slate-900">
                Добавить документ-основание
              </DialogTitle>
            </div>
            <p className="text-sm text-slate-600">Заполните обязательные поля</p>
          </DialogHeader>

          <div className="px-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Вид связи <span className="text-red-600">*</span>
              </label>
              <div className="relative">
                <Input 
                  value="Документ основание" 
                  readOnly 
                  className="bg-slate-50 pr-10"
                />
                <Icon name="ChevronDown" size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-900 mb-2">
                Документ-основание
              </label>
              <p className="text-xs text-slate-600 mb-2">Выберите документ из списка</p>
              
              <div className="flex items-center gap-3 mb-3">
                <div className="relative flex-1">
                  <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <Input 
                    placeholder="Поиск"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline" size="sm">
                  Сбросить
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Показать результаты
                </Button>
                <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                  <Icon name="SlidersHorizontal" size={18} />
                </Button>
                <Button variant="outline" size="sm" className="w-10 h-10 p-0">
                  <Icon name="Settings2" size={18} />
                </Button>
              </div>

              <div className="text-xs text-slate-600 mb-2">
                Показано {filteredDocs.length} из {baseDocuments.length} записи
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-200">
                  <div className="flex items-center text-xs font-medium text-slate-700">
                    <div className="w-12 p-3 border-r border-slate-200">
                      <Checkbox />
                    </div>
                    <div className="flex-1 p-3 border-r border-slate-200">Тип документа</div>
                    <div className="flex-[2] p-3 border-r border-slate-200">Заголовок документа</div>
                    <div className="flex-1 p-3 border-r border-slate-200">Регистрационный номер</div>
                    <div className="flex-1 p-3 border-r border-slate-200">Дата регистрации</div>
                    <div className="flex-1 p-3">Статус</div>
                  </div>
                </div>

                <ScrollArea className="h-64">
                  {filteredDocs.map((doc) => (
                    <div 
                      key={doc.id}
                      className={`flex items-center text-sm border-b border-slate-100 hover:bg-slate-50 transition-colors ${
                        selectedBaseDoc === doc.id ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="w-12 p-3 border-r border-slate-200">
                        <Checkbox 
                          checked={selectedBaseDoc === doc.id}
                          onCheckedChange={(checked) => {
                            setSelectedBaseDoc(checked ? doc.id : '');
                          }}
                        />
                      </div>
                      <div className="flex-1 p-3 border-r border-slate-200 text-slate-900 font-medium">
                        {doc.type}
                      </div>
                      <div className="flex-[2] p-3 border-r border-slate-200">
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {doc.title}
                        </span>
                      </div>
                      <div className="flex-1 p-3 border-r border-slate-200 text-slate-600 text-center">
                        {doc.registrationNumber || '-'}
                      </div>
                      <div className="flex-1 p-3 border-r border-slate-200 text-slate-600 text-center">
                        {doc.registrationDate}
                      </div>
                      <div className="flex-1 p-3">
                        <Badge 
                          variant="outline"
                          className={doc.status === 'Создан' ? 'bg-green-50 text-green-700 border-green-300' : 'bg-blue-50 text-blue-700 border-blue-300'}
                        >
                          {doc.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-200 mt-4">
            <Button 
              variant="ghost"
              onClick={() => setIsDialogOpen(false)}
            >
              Отменить
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!selectedBaseDoc}
              onClick={() => {
                const selected = baseDocuments.find(d => d.id === selectedBaseDoc);
                if (selected) {
                  setBaseDocument(selected.title);
                  setIsDialogOpen(false);
                }
              }}
            >
              Сохранить
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}