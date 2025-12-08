import { useState } from 'react';
import { DocumentHeader } from '@/components/DocumentHeader';
import { DocumentCard } from '@/components/DocumentCard';
import { PackageWorkspace, PackageDocument } from '@/components/PackageWorkspace';
import { BaseDocumentModal } from '@/components/BaseDocumentModal';
import Icon from '@/components/ui/icon';

export function DocumentManagementSystem() {
  const [selectedDoc, setSelectedDoc] = useState<string>('doc-1');
  const [baseDocument, setBaseDocument] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const packageDocs: PackageDocument[] = [
    {
      id: 'doc-1',
      type: 'Отчет агента',
      name: 'Отчет агента',
      documentNumber: 'AG-001',
      documentDate: '01.12.2025',
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
      type: 'КС-2',
      name: 'КС-2',
      documentNumber: 'KS2-555',
      documentDate: '02.12.2025',
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
      type: 'Справка КС-3',
      name: 'Справка КС-3',
      documentNumber: 'KS3-777',
      documentDate: '03.12.2025',
      documentAmount: '135011.42',
      pages: 1,
      size: 'pdf',
      confidence: 94.5,
      fields: []
    },
    {
      id: 'doc-4',
      type: 'Товарно-транспортная накладная ТТН',
      name: 'Товарно-транспортная накладная ТТН',
      documentNumber: 'TTN-999',
      documentDate: '04.12.2025',
      pages: 4,
      size: 'pdf',
      confidence: 72.3,
      fields: []
    },
  ];



  const currentDoc = packageDocs.find(d => d.id === selectedDoc);

  const handleSelectContract = (contract: any) => {
    setBaseDocument(contract.title);
    setIsModalOpen(false);
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

        <DocumentCard 
          baseDocument={baseDocument}
          onSelectBaseDocument={() => setIsModalOpen(true)}
          documentType={currentDoc?.type || 'Справка КС-3'}
          documentNumber={currentDoc?.documentNumber || 'KS3-777'}
          documentDate={currentDoc?.documentDate || '03.12.2025'}
          documentAmount={currentDoc?.documentAmount}
        />

        <PackageWorkspace 
          packageDocs={packageDocs}
          selectedDoc={selectedDoc}
          currentDoc={currentDoc}
          onSelectDoc={setSelectedDoc}
        />
      </div>

      <BaseDocumentModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelect={handleSelectContract}
      />
    </div>
  );
}