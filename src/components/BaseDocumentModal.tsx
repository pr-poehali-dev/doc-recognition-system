import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface Contract {
  id: number;
  type: string;
  title: string;
  registrationNumber: string;
  registrationDate: string;
  status: string;
}

interface BaseDocumentModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (contract: Contract) => void;
}

const mockContracts: Contract[] = [
  { id: 1, type: 'Договор', title: 'Договор № 555-1 от 01.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
  { id: 2, type: 'Договор', title: 'Договор № 18666-25 от 02.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
  { id: 3, type: 'Договор', title: 'Договор № 777-3 от 03.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
  { id: 4, type: 'Договор', title: 'Договор № 888-4 от 04.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
  { id: 5, type: 'Договор', title: 'Договор № 999-5 от 05.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
  { id: 6, type: 'Договор', title: 'Договор № 111-6 от 06.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
  { id: 7, type: 'Договор', title: 'Договор № 222-7 от 07.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
  { id: 8, type: 'Договор', title: 'Договор № 333-8 от 08.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
  { id: 9, type: 'Договор', title: 'Договор № 444-9 от 09.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
  { id: 10, type: 'Договор', title: 'Договор № 555-10 от 10.12.2025', registrationNumber: '', registrationDate: '-', status: 'Создан' },
];

export function BaseDocumentModal({ open, onClose, onSelect }: BaseDocumentModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContract, setSelectedContract] = useState<number | null>(null);

  const filteredContracts = mockContracts.filter(contract =>
    contract.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = () => {
    const contract = mockContracts.find(c => c.id === selectedContract);
    if (contract) {
      onSelect(contract);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[1400px] max-h-[90vh] p-0">
        <DialogHeader className="border-b border-slate-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg font-semibold">
              Добавить документ-основание
            </DialogTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8"
            >
              <Icon name="X" size={18} />
            </Button>
          </div>
          <p className="text-sm text-red-600 mt-2">Заполните обязательные поля</p>
        </DialogHeader>

        <div className="px-6 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Вид связи <span className="text-red-600">*</span>
            </label>
            <div className="border border-slate-300 rounded-md px-3 py-2 bg-slate-50">
              Документ основание
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Документ-основание
            </label>
            <p className="text-sm text-slate-600 mb-3">Выберите документ из списка</p>
            
            <div className="mb-4 flex items-center gap-2">
              <div className="relative flex-1">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" 
                />
                <Input
                  placeholder="Поиск"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline">Сбросить</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Показать результаты
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="SlidersHorizontal" size={18} />
              </Button>
              <Button variant="outline" size="icon">
                <Icon name="Settings" size={18} />
              </Button>
            </div>

            <div className="text-sm text-slate-600 mb-3">
              Показано 50 из {filteredContracts.length} записи
            </div>

            <div className="border border-slate-300 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-300">
                  <tr>
                    <th className="w-10 p-3"></th>
                    <th className="text-left p-3 text-sm font-medium text-slate-700">Тип документа</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-700">Заголовок документа</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-700">Регистрационный номер</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-700">Дата регистрации</th>
                    <th className="text-left p-3 text-sm font-medium text-slate-700">Статус</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredContracts.map((contract) => (
                    <tr 
                      key={contract.id}
                      className={`hover:bg-slate-50 cursor-pointer ${
                        selectedContract === contract.id ? 'bg-blue-50' : ''
                      }`}
                      onClick={() => setSelectedContract(contract.id)}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          checked={selectedContract === contract.id}
                          onChange={() => setSelectedContract(contract.id)}
                          className="rounded border-slate-300"
                        />
                      </td>
                      <td className="p-3 text-sm">{contract.type}</td>
                      <td className="p-3 text-sm">
                        <a href="#" className="text-blue-600 hover:underline">
                          {contract.title}
                        </a>
                      </td>
                      <td className="p-3 text-sm text-slate-600">{contract.registrationNumber || '-'}</td>
                      <td className="p-3 text-sm text-slate-600">{contract.registrationDate}</td>
                      <td className="p-3">
                        <span className="inline-flex px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                          {contract.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 px-6 py-4 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Отменить
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={handleSelect}
            disabled={!selectedContract}
          >
            Сохранить
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
