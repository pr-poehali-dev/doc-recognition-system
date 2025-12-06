import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

export interface BaseDocument {
  id: string;
  type: string;
  title: string;
  registrationNumber: string;
  registrationDate: string;
  status: string;
}

interface BaseDocumentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  baseDocuments: BaseDocument[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedBaseDoc: string;
  onSelectBaseDoc: (id: string) => void;
  onSave: () => void;
}

export function BaseDocumentDialog({
  isOpen,
  onClose,
  baseDocuments,
  searchQuery,
  onSearchChange,
  selectedBaseDoc,
  onSelectBaseDoc,
  onSave
}: BaseDocumentDialogProps) {
  const filteredDocs = baseDocuments.filter(doc => 
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
                  onChange={(e) => onSearchChange(e.target.value)}
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
                          onSelectBaseDoc(checked ? doc.id : '');
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
            onClick={onClose}
          >
            Отменить
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!selectedBaseDoc}
            onClick={onSave}
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
