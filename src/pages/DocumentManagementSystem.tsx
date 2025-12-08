import { useState } from 'react';
import { DocumentHeader } from '@/components/DocumentHeader';
import { DocumentCard } from '@/components/DocumentCard';
import { PackageWorkspace, PackageDocument } from '@/components/PackageWorkspace';
import { BaseDocumentModal } from '@/components/BaseDocumentModal';

export function DocumentManagementSystem() {
  const [selectedDoc, setSelectedDoc] = useState<string>('doc-1');
  const [baseDocument, setBaseDocument] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

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



  const currentDoc = packageDocs.find(d => d.id === selectedDoc);

  const handleSelectContract = (contract: any) => {
    setBaseDocument(contract.title);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <DocumentHeader />

      <div className="p-6">
        <DocumentCard 
          baseDocument={baseDocument}
          onSelectBaseDocument={() => setIsModalOpen(true)}
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