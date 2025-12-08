import { useState } from 'react';
import { DocumentHeader } from '@/components/DocumentHeader';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ConfirmationModal } from '@/components/ConfirmationModal';
import Icon from '@/components/ui/icon';

interface Document {
  id: string;
  type: string;
  number: string;
  date: string;
  amount?: string;
}

export function PackageCompleteness() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const documents: Document[] = [
    {
      id: '1',
      type: 'Отчет агента',
      number: 'AG-001',
      date: '01.12.2025',
    },
    {
      id: '2',
      type: 'КС-2',
      number: 'KS2-555',
      date: '02.12.2025',
    },
    {
      id: '3',
      type: 'Справка КС-3',
      number: 'KS3-777',
      date: '03.12.2025',
      amount: '135011.42',
    },
    {
      id: '4',
      type: 'Товарно-транспортная накладная ТТН',
      number: 'TTN-999',
      date: '04.12.2025',
    },
  ];

  const handleConfirm = (comment: string) => {
    console.log('Подтверждено с комментарием:', comment);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DocumentHeader />

      <div className="p-6">
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Icon name="Home" size={16} className="text-slate-600" />
          <span className="text-slate-600">Все пакеты</span>
          <Icon name="ChevronRight" size={16} className="text-slate-400" />
          <span className="text-slate-900">Пакет по Договору № 555-1 от 01.12.2025</span>
        </div>

        <Card className="mb-6 border-2 border-amber-400 bg-amber-50">
          <div className="p-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-amber-400 rounded-full flex items-center justify-center">
                  <Icon name="AlertCircle" size={28} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    Требуется подтверждение комплектности документов
                  </h3>
                  <p className="text-sm text-slate-700">
                    Пожалуйста, проверьте наличие всех необходимых документов в пакете и подтвердите комплектность для продолжения обработки
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsModalOpen(true)}
                className="flex-shrink-0 bg-blue-600 hover:bg-blue-700 text-white px-8 h-12 text-base font-medium"
              >
                Подтвердить
              </Button>
            </div>
          </div>
        </Card>

        <Card>
          <div className="border-b border-slate-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-slate-900">
              Пакет по Договору № 555-1 от 01.12.2025
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Документов в пакете: {documents.length}
            </p>
          </div>

          <div className="p-6">
            <div className="space-y-3">
              {documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-lg hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center flex-shrink-0">
                      <Icon name="FileText" size={20} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">{doc.type}</div>
                      <div className="text-sm text-slate-600">
                        № {doc.number} от {doc.date}
                        {doc.amount && ` на сумму ${doc.amount}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <Icon name="CheckCircle2" size={20} />
                    <span className="text-sm font-medium">Распознан</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>

      <ConfirmationModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onConfirm={handleConfirm}
      />
    </div>
  );
}
