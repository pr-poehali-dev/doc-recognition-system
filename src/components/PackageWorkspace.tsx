import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

export interface DocumentField {
  label: string;
  value: string;
  confidence: number;
  verified: boolean;
}

export interface PackageDocument {
  id: string;
  type: string;
  name: string;
  pages: number;
  size: string;
  confidence: number;
  fields: DocumentField[];
}

interface PackageWorkspaceProps {
  packageDocs: PackageDocument[];
  selectedDoc: string;
  currentDoc: PackageDocument | undefined;
  onSelectDoc: (id: string) => void;
}

export function PackageWorkspace({ 
  packageDocs, 
  selectedDoc, 
  currentDoc, 
  onSelectDoc 
}: PackageWorkspaceProps) {
  return (
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
                    onClick={() => onSelectDoc(doc.id)}
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
  );
}
