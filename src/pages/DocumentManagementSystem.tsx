import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface Document {
  id: string;
  type: string;
  number: string;
  date: string;
  recognized: boolean;
  verified: boolean;
  confidence: number;
  fields: {
    contractNumber?: string;
    contractDate?: string;
    counterparty?: string;
    amount?: string;
    [key: string]: string | undefined;
  };
}

export function DocumentManagementSystem() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  const mockDocuments: Document[] = [
    {
      id: 'DOC-2024-001',
      type: 'Договор поставки',
      number: 'ДП-45/2024',
      date: '15.03.2024',
      recognized: true,
      verified: false,
      confidence: 96,
      fields: {
        contractNumber: 'ДП-45/2024',
        contractDate: '15.03.2024',
        counterparty: 'ООО "Поставщик Про"',
        amount: '1 250 000 ₽'
      }
    },
    {
      id: 'DOC-2024-002',
      type: 'Счет-фактура',
      number: 'СФ-128',
      date: '16.03.2024',
      recognized: true,
      verified: true,
      confidence: 98,
      fields: {
        contractNumber: 'ДП-45/2024',
        counterparty: 'ООО "Поставщик Про"',
        amount: '1 250 000 ₽'
      }
    },
    {
      id: 'DOC-2024-003',
      type: 'Акт приема-передачи',
      number: 'АПП-089',
      date: '20.03.2024',
      recognized: true,
      verified: false,
      confidence: 92,
      fields: {
        contractNumber: 'ДП-45/2024',
        counterparty: 'ООО "Поставщик Про"'
      }
    }
  ];

  const packageTemplates = [
    { id: 'template-1', name: 'Договор + Счет-фактура + Акт', required: ['Договор поставки', 'Счет-фактура', 'Акт приема-передачи'] },
    { id: 'template-2', name: 'Договор + Счет-фактура', required: ['Договор поставки', 'Счет-фактура'] },
    { id: 'template-3', name: 'Полный комплект документов', required: ['Договор поставки', 'Счет-фактура', 'Акт приема-передачи', 'Товарная накладная'] }
  ];

  const checkPackageCompleteness = () => {
    const template = packageTemplates.find(t => t.id === selectedPackage);
    if (!template) return { complete: false, missing: [] };

    const docTypes = mockDocuments.map(d => d.type);
    const missing = template.required.filter(req => !docTypes.includes(req));

    return { complete: missing.length === 0, missing };
  };

  const { complete, missing } = checkPackageCompleteness();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-slate-900 text-white p-4 shadow-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon name="FileText" size={28} />
            <div>
              <h1 className="text-xl font-semibold">Система документооборота</h1>
              <p className="text-sm text-slate-300">Распознавание и верификация документов</p>
            </div>
          </div>
          <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-400">
            <Icon name="CheckCircle2" size={14} className="mr-1" />
            Режим интеграции
          </Badge>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Поиск документа-основания
              </label>
              <div className="relative">
                <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Введите номер договора или дату..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-80">
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Шаблон пакета документов
              </label>
              <Select value={selectedPackage} onValueChange={setSelectedPackage}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите шаблон" />
                </SelectTrigger>
                <SelectContent>
                  {packageTemplates.map(template => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedPackage && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-slate-900 flex items-center gap-2">
                  <Icon name="Package" size={18} />
                  Комплектность пакета
                </h3>
                {complete ? (
                  <Badge className="bg-green-100 text-green-800">
                    <Icon name="CheckCircle" size={14} className="mr-1" />
                    Комплект полный
                  </Badge>
                ) : (
                  <Badge variant="destructive">
                    <Icon name="AlertCircle" size={14} className="mr-1" />
                    Не хватает {missing.length} док.
                  </Badge>
                )}
              </div>
              {!complete && missing.length > 0 && (
                <div className="text-sm text-slate-600">
                  Отсутствуют: {missing.join(', ')}
                </div>
              )}
            </div>
          )}
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Icon name="FileStack" size={20} />
            Реестр документов
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">ID документа</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Тип документа</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Номер</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Дата</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Распознано</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Достоверность</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Статус</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Действия</th>
                </tr>
              </thead>
              <tbody>
                {mockDocuments.map((doc) => (
                  <tr key={doc.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm font-mono text-slate-600">{doc.id}</td>
                    <td className="py-3 px-4 text-sm text-slate-900">{doc.type}</td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">{doc.number}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{doc.date}</td>
                    <td className="py-3 px-4">
                      {doc.recognized ? (
                        <Badge className="bg-blue-100 text-blue-800">
                          <Icon name="CheckCircle2" size={12} className="mr-1" />
                          Да
                        </Badge>
                      ) : (
                        <Badge variant="outline">Нет</Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${doc.confidence >= 95 ? 'bg-green-500' : doc.confidence >= 90 ? 'bg-yellow-500' : 'bg-orange-500'}`}
                            style={{ width: `${doc.confidence}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-700">{doc.confidence}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {doc.verified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <Icon name="ShieldCheck" size={12} className="mr-1" />
                          Проверен
                        </Badge>
                      ) : (
                        <Badge className="bg-amber-100 text-amber-800">
                          <Icon name="Clock" size={12} className="mr-1" />
                          Ожидает проверки
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            <Icon name="Eye" size={14} className="mr-1" />
                            Открыть
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <Icon name="FileText" size={20} />
                              Карточка документа: {doc.id}
                            </DialogTitle>
                          </DialogHeader>
                          
                          <Tabs defaultValue="data" className="mt-4">
                            <TabsList className="grid w-full grid-cols-3">
                              <TabsTrigger value="data">Данные распознавания</TabsTrigger>
                              <TabsTrigger value="verification">Верификация</TabsTrigger>
                              <TabsTrigger value="comparison">Сверка</TabsTrigger>
                            </TabsList>

                            <TabsContent value="data" className="space-y-4 mt-4">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Тип документа
                                  </label>
                                  <Input value={doc.type} readOnly className="bg-slate-50" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Номер документа
                                  </label>
                                  <Input value={doc.number} readOnly className="bg-slate-50" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Дата документа
                                  </label>
                                  <Input value={doc.date} readOnly className="bg-slate-50" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Номер договора-основания
                                  </label>
                                  <Input value={doc.fields.contractNumber || '-'} readOnly className="bg-slate-50" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Контрагент
                                  </label>
                                  <Input value={doc.fields.counterparty || '-'} readOnly className="bg-slate-50" />
                                </div>
                                <div>
                                  <label className="block text-sm font-medium text-slate-700 mb-1">
                                    Сумма
                                  </label>
                                  <Input value={doc.fields.amount || '-'} readOnly className="bg-slate-50" />
                                </div>
                              </div>

                              <Separator />

                              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-medium text-slate-900">Качество распознавания</div>
                                    <div className="text-sm text-slate-600 mt-1">
                                      Достоверность данных: {doc.confidence}%
                                    </div>
                                  </div>
                                  <Badge className={doc.confidence >= 95 ? 'bg-green-500' : 'bg-yellow-500'}>
                                    {doc.confidence >= 95 ? 'Отличное' : 'Хорошее'}
                                  </Badge>
                                </div>
                              </div>
                            </TabsContent>

                            <TabsContent value="verification" className="space-y-4 mt-4">
                              <div className="space-y-3">
                                <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                                  <Checkbox id="verify-number" />
                                  <label htmlFor="verify-number" className="flex-1 text-sm cursor-pointer">
                                    Номер документа распознан корректно
                                  </label>
                                  <Icon name="Check" size={16} className="text-green-600" />
                                </div>

                                <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                                  <Checkbox id="verify-date" />
                                  <label htmlFor="verify-date" className="flex-1 text-sm cursor-pointer">
                                    Дата документа распознана корректно
                                  </label>
                                  <Icon name="Check" size={16} className="text-green-600" />
                                </div>

                                <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                                  <Checkbox id="verify-contract" />
                                  <label htmlFor="verify-contract" className="flex-1 text-sm cursor-pointer">
                                    Привязка к договору-основанию верна
                                  </label>
                                  <Icon name="Check" size={16} className="text-green-600" />
                                </div>

                                <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                                  <Checkbox id="verify-counterparty" />
                                  <label htmlFor="verify-counterparty" className="flex-1 text-sm cursor-pointer">
                                    Контрагент определен правильно
                                  </label>
                                  <Icon name="Check" size={16} className="text-green-600" />
                                </div>

                                <div className="flex items-center space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50">
                                  <Checkbox id="verify-amount" />
                                  <label htmlFor="verify-amount" className="flex-1 text-sm cursor-pointer">
                                    Сумма распознана точно
                                  </label>
                                  <Icon name="Check" size={16} className="text-green-600" />
                                </div>
                              </div>

                              <Separator />

                              <div className="flex gap-3">
                                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                                  <Icon name="CheckCircle" size={16} className="mr-2" />
                                  Подтвердить верификацию
                                </Button>
                                <Button variant="outline" className="flex-1">
                                  <Icon name="XCircle" size={16} className="mr-2" />
                                  Отклонить
                                </Button>
                              </div>
                            </TabsContent>

                            <TabsContent value="comparison" className="space-y-4 mt-4">
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                  Выбор документа для сверки
                                </label>
                                <Select>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Выберите документ из реестра" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {mockDocuments
                                      .filter(d => d.id !== doc.id)
                                      .map(d => (
                                        <SelectItem key={d.id} value={d.id}>
                                          {d.type} - {d.number} от {d.date}
                                        </SelectItem>
                                      ))}
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                                  <Icon name="GitCompare" size={18} />
                                  Результаты сверки
                                </h4>
                                
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center p-2 bg-white rounded border border-slate-200">
                                    <span className="text-sm text-slate-600">Номер договора</span>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">Совпадает</Badge>
                                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center p-2 bg-white rounded border border-slate-200">
                                    <span className="text-sm text-slate-600">Контрагент</span>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">Совпадает</Badge>
                                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                                    </div>
                                  </div>

                                  <div className="flex justify-between items-center p-2 bg-white rounded border border-slate-200">
                                    <span className="text-sm text-slate-600">Сумма</span>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline">Совпадает</Badge>
                                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <Button className="w-full">
                                <Icon name="FileCheck" size={16} className="mr-2" />
                                Создать карточку в ЕСМ
                              </Button>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
